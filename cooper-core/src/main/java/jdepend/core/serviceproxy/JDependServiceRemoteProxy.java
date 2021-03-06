package jdepend.core.serviceproxy;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.rmi.ConnectException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.util.List;

import jdepend.core.serverconf.ServerConfigurator;
import jdepend.core.session.RemoteSessionProxy;
import jdepend.framework.exception.JDependException;
import jdepend.framework.log.LogUtil;
import jdepend.framework.util.TargetFileManager;
import jdepend.model.Component;
import jdepend.model.JavaClassRelationType;
import jdepend.model.Metrics;
import jdepend.model.result.AnalysisResult;
import jdepend.parse.ParseListener;
import jdepend.parse.impl.ParseData;
import jdepend.service.AnalyseDataDTO;
import jdepend.service.local.AnalyseData;
import jdepend.service.remote.JDependRemoteService;
import jdepend.service.remote.JDependRequest;

/**
 * 远程服务代理
 * 
 * @author wangdg
 * 
 */
public class JDependServiceRemoteProxy extends AbstractJDependServiceProxy {

	private String groupName;

	private String commandName;

	private JDependRemoteService remoteService;

	private JDependRequest request;

	private AnalyseDataDTO data;

	private ParseListener listener;

	public static final String DEFAULT_PROPERTY_FILE = "remote.properties";

	private static final String DEFAULT_REMOTE_SERVICE = "rmi://localhost/JDependRemoteService";

	private static final long WATCH_TIME = 300;// 进度监控间隔时间

	private static final int TIMEOUT = 20;// 超时次数

	public JDependServiceRemoteProxy(String groupName, String commandName) {
		this.groupName = groupName;
		this.commandName = commandName;
		this.data = new AnalyseDataDTO();
	}

	/**
	 * 得到远程服务 多线程（startListenAnalyseService mainThread）共享函数 需要同步
	 * 
	 * @return
	 * @throws JDependException
	 */
	private synchronized JDependRemoteService getRemoteService() throws JDependException {
		try {
			// 获得SessionId
			Long sessionId;
			if (!RemoteSessionProxy.getInstance().isValid()) {
				sessionId = RemoteSessionProxy.getInstance().loginAnonymousUser();
			} else {
				sessionId = RemoteSessionProxy.getInstance().getSessionId();
			}
			// 创建请求对象
			if (request == null || request.getSessionId() != sessionId) {
				request = new JDependRequest(sessionId, groupName, commandName);
			}
			// 获得远程服务
			if (this.remoteService == null) {
				remoteService = (JDependRemoteService) Naming.lookup(getRemoteServiceURL());
			}
			return this.remoteService;
		} catch (ConnectException e) {
			e.printStackTrace();
			throw new JDependException("连接服务器失败！", e);
		} catch (MalformedURLException e) {
			e.printStackTrace();
			throw new JDependException("URL地址错误！", e);
		} catch (RemoteException e) {
			e.printStackTrace();
			throw new JDependException("远程服务失败！", e);
		} catch (NotBoundException e) {
			e.printStackTrace();
			throw new JDependException("没有查询到绑定服务！", e);
		}

	}

	public void addDirectory(String names) throws JDependException {
		for (String name : names.split(TargetFileManager.FilePathSplit)) {
			this.data.addDirectory(name);
		}
	}

	protected AnalysisResult doAnalyze() throws JDependException {
		try {
			// 启动监控进度服务
			startMonitorAnalyseService();
			// 本地计算分析数据
			data.calTargets();
			// 执行分析服务
			AnalysisResult result = getRemoteService().analyze(request, data);
			result.unSequence();

			return result;
		} catch (RemoteException e) {
			e.printStackTrace();
			throw new JDependException("服务器分析出现问题:" + e.getMessage(), e);
		} catch (IOException e) {
			e.printStackTrace();
			throw new JDependException("服务器分析出现问题:" + e.getMessage(), e);
		}
	}

	private void startMonitorAnalyseService() {
		new Thread() {
			@Override
			public void run() {
				int schedule = 0;
				int count = 0;// 超时计数
				try {
					do {
						Thread.sleep(WATCH_TIME);
						schedule = getRemoteService().getAnalyzeSchedule(request);
						listener.onParsedJavaClass(null, schedule);
						count++;
					} while (schedule < data.getClasses().size() && count < TIMEOUT);
					LogUtil.getInstance(JDependServiceRemoteProxy.class).systemLog(
							"监控远程服务执行进度线程结束，结束参数为 schedule:" + schedule + " count:" + count);
				} catch (RemoteException e) {
					e.printStackTrace();
				} catch (JDependException e) {
					e.printStackTrace();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}.start();
	}

	public int countClasses() {
		try {
			data.calTargets();
			return data.getClasses().size();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return 0;
	}

	public void setComponent(Component component) {
		this.data.setComponent(component);
	}

	public void addFilteredPackages(List<String> filteredPackages) {
		this.data.setFilteredPackages(filteredPackages);
	}

	public void setLogWriter(PrintWriter printWriter) {
	}

	public void registMetrics(String key, Metrics metrics) {
		this.data.getMetricses().put(key, metrics);

	}

	public void registRelationType(JavaClassRelationType type) {
		this.data.getJavaClassRelationTypes().put(type.getName(), type);

	}

	public void addParseListener(ParseListener listener) {
		this.listener = listener;
	}

	private static String getRemoteServiceURL() {

		String remoteService = (new ServerConfigurator()).getRemoteServiceURL();
		if (remoteService == null) {
			remoteService = DEFAULT_REMOTE_SERVICE;
		}
		return remoteService;
	}

	@Override
	public void setAnalyseData(AnalyseData data) {
		this.data.setClasses(data.getClasses());
		this.data.setConfigs(data.getConfigs());
		this.data.setTargetFiles(data.getTargetFiles());
	}
}
