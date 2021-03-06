package jdepend.parse;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jdepend.framework.exception.JDependException;
import jdepend.framework.log.LogUtil;
import jdepend.framework.util.FileType;
import jdepend.framework.util.TargetFileManager;
import jdepend.model.JavaClass;
import jdepend.model.JavaPackage;
import jdepend.model.Metrics;
import jdepend.model.MetricsMgr;
import jdepend.parse.impl.AbstractClassBuilder;
import jdepend.parse.impl.ParseData;
import jdepend.parse.impl.CSharpClassBuilder;
import jdepend.parse.impl.JavaClassBuilder;
import jdepend.parse.impl.ParseConfigurator;

/**
 * 解析器
 * 
 * @author user
 * 
 */
public class Parse {

	private Map<String, JavaPackage> packages;

	private TargetFileManager fileManager;

	private AbstractClassBuilder builder;

	private ParseConfigurator conf;

	private ParseData data;

	public Parse() {
		init(new ParseConfigurator());
	}

	public Parse(ParseConfigurator conf) {
		init(conf);
	}

	public void setBuildClassRelation(boolean isBuildClassRelation) {
		this.getClassBuilder().setBuildClassRelation(isBuildClassRelation);
	}

	/**
	 * 解析目标对象
	 * 
	 * @return
	 * @throws JDependException
	 */
	public Collection<JavaPackage> execute() throws JDependException {

		this.beforeAnalyze();

		Collection<JavaClass> javaClasses;
		try {
			javaClasses = getClassBuilder().build(getAnalyseData());
		} catch (IOException e) {
			throw new JDependException(e);
		}

		LogUtil.getInstance(Parse.class).systemLog("开始建立Package");
		for (JavaClass javaClass : javaClasses) {
			analyzeClass(javaClass);
		}

		return packages.values();
	}
	
	/**
	 * 增加分析目标地址
	 * @param names 以“;”分割可以添加多个
	 * @throws IOException
	 */
	public void addDirectorys(String names) throws IOException {
		for (String name : names.split(TargetFileManager.FilePathSplit)) {
			if (fileManager.addDirectory(name)) {
				LogUtil.getInstance(Parse.class).systemLog("增加分析路径[" + name + "]");
			}
		}
	}

	/**
	 * 得到分析目标的地址
	 * @return
	 */
	public String getDirectorys() {
		StringBuilder dir = new StringBuilder();
		for (File file : fileManager.getDirectories()) {
			try {
				dir.append(file.getCanonicalPath());
				dir.append(TargetFileManager.FilePathSplit);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return dir.toString();
	}

	/**
	 * 设置分析数据
	 * 
	 * @param data
	 */
	public void setAnalyseData(ParseData data) {
		this.data = data;
	}

	/**
	 * 设置是否分析内部类
	 * @param b
	 */
	public void analyzeInnerClasses(boolean b) {
		fileManager.acceptInnerClasses(b);
	}

	/**
	 * 计算类个数
	 * @return
	 */
	public int countClasses() {
		return this.fileManager.countClasses();
	}

	/**
	 * 增加解析监听器
	 * @param listener
	 */
	public void addParseListener(ParseListener listener) {
		getClassBuilder().addParseListener(listener);
	}

	/**
	 * 增加构建监听器
	 * @param listener
	 */
	public void addBuildListener(BuildListener listener) {
		getClassBuilder().addBuildListener(listener);
	}
	/**
	 * 设置日志输出器
	 * @param writer
	 */
	public void setLogWriter(PrintWriter writer) {
		this.getClassBuilder().setWriter(writer);
	}

	/**
	 * 增加不分析的包
	 * @param filteredPackages
	 */
	public void addFilteredPackages(List<String> filteredPackages) {
		this.getClassBuilder().getFilter().addFilters(filteredPackages);
	}

	/**
	 * 返回每个分析目录中包含的文件名集合
	 * 
	 * @return
	 */
	public Map<String, Collection<String>> getTargetFileGroupInfo() {
		return this.fileManager.getTargetFileGroupInfo();
	}

	/**
	 * 设置每个分析目录中包含的文件名集合
	 * 
	 * @param targetFileGroupInfo
	 */
	public void setTargetFileGroupInfo(Map<String, Collection<String>> targetFileGroupInfo) {
		this.fileManager.setTargetFileGroupInfo(targetFileGroupInfo);
	}

	private void init(ParseConfigurator conf) {

		this.conf = conf;
		this.packages = new HashMap<String, JavaPackage>();
		this.fileManager = new TargetFileManager();

		analyzeInnerClasses(conf.getAnalyzeInnerClasses());
	}

	private AbstractClassBuilder getClassBuilder() {
		if (this.builder == null) {
			String dir = this.getDirectorys();
			if (dir == null || dir.length() == 0) {
				LogUtil.getInstance(Parse.class).systemWarning("分析路径没有初始化，应用JavaClassBuilder作为默认ClassBuilder");
				this.builder = new JavaClassBuilder(conf);
			}
			if (dir.indexOf(".DLL") != -1 || dir.indexOf(".dll") != -1) {
				this.builder = new CSharpClassBuilder(conf);
			} else {
				this.builder = new JavaClassBuilder(conf);
			}
		}
		return this.builder;
	}

	private ParseData getAnalyseData() throws IOException {
		if (this.data == null) {
			data = new ParseData();
			Map<FileType, List<byte[]>> fileData = this.fileManager.getFileData();
			data.setClasses(fileData.get(FileType.classType));
			data.setConfigs(fileData.get(FileType.xmlType));
		}
		return data;
	}

	/**
	 * 分析前的操作
	 */
	private void beforeAnalyze() {

		Collection<Metrics> metricses = MetricsMgr.getInstance().getMetricses().values();
		// 设置定制指标分析之前的操作
		for (Metrics metricse : metricses) {
			metricse.beforeAnalyze();
		}
		// 清空之前的结果
		this.packages.clear();
	}

	/**
	 * Adds the specified Java package name to the collection of analyzed
	 * packages.
	 * 
	 * @param name
	 *            Java package name.
	 * @return Added Java package.
	 */
	private JavaPackage addPackage(String name) {

		JavaPackage pkg = packages.get(name);
		if (pkg == null) {
			pkg = new JavaPackage(name);
			packages.put(pkg.getName(), pkg);
			LogUtil.getInstance(Parse.class).systemLog("创建JavaPackage[" + pkg.getName() + "]");
		}

		return pkg;
	}

	private void analyzeClass(JavaClass clazz) {

		String packageName = clazz.getPackageName();

		if (!this.getClassBuilder().getFilter().accept(packageName)) {
			return;
		}

		JavaPackage clazzPackage = addPackage(packageName);
		clazzPackage.addClass(clazz);
		clazz.setJavaPackage(clazzPackage);
	}

}
