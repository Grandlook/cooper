package jdepend.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import jdepend.framework.exception.JDependException;
import jdepend.framework.log.LogUtil;
import jdepend.model.result.AnalysisResult;
import jdepend.model.result.AnalysisResultListener;

/**
 * 执行结果内存管理器
 * 
 * 当命令执行完成后，其内存结果将存于本管理器中。
 * 
 * 该管理器为单例
 * 
 * @author <b>Abner</b>
 * 
 */
public final class JDependUnitMgr {

	private AnalysisResult result;

	private static JDependUnitMgr mgr = new JDependUnitMgr();

	private List<AnalysisResultListener> listeners = new ArrayList<AnalysisResultListener>();

	private JDependUnitMgr() {
	}

	public static JDependUnitMgr getInstance() {
		return mgr;
	}

	public List<Component> getComponents() {
		if (result == null) {
			return new ArrayList<Component>();
		} else {
			return result.getComponents();
		}
	}

	public Collection<JavaClass> getClasses() {
		return this.result.getClasses();
	}

	public JavaClass getTheClass(String name) {
		return this.result.getTheClass(name);
	}

	public Component getTheComponent(String name) {
		return this.result.getTheComponent(name);
	}

	public JDependUnit getUnit(String unitID) {
		if (result == null) {
			return null;
		} else {
			Component component = this.result.getTheComponent(unitID);
			if (component != null) {
				return component;
			} else {
				return this.result.getTheClass(unitID);
			}
		}
	}

	public void clear() {
		this.result = null;
	}

	public void setComponents(List<Component> components) {
		this.result.setComponents(components);
	}

	public void setExecuteResult(AnalysisResult result) {
		this.setResult(result);
		result.setExecuteResult(true);

		for (AnalysisResultListener listener : this.listeners) {
			try {
				listener.onExecuted(result);
			} catch (JDependException e) {
				e.printStackTrace();
				LogUtil.getInstance(JDependUnitMgr.class).systemError(e.getMessage());
			}
		}
	}

	public void setResult(AnalysisResult result) {
		this.result = result;
	}

	public AnalysisResult getResult() {
		return result;
	}

	public Collection<Relation> getRelations() {
		if (result == null) {
			return null;
		} else {
			return this.result.getRelations();
		}
	}

	public void addAnalysisResultListener(AnalysisResultListener listener) {
		if (!this.listeners.contains(listener)) {
			this.listeners.add(listener);
		}
	}

	public void deleteAnalysisResultListener(AnalysisResultListener listener) {
		this.listeners.remove(listener);
	}

	public void clearAnalysisResultListener() {
		this.listeners = new ArrayList<AnalysisResultListener>();
	}
}
