package jdepend.report;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.swing.JComponent;

import jdepend.framework.exception.JDependException;
import jdepend.model.result.AnalysisResult;

/**
 * 报告适配器
 * 
 * 将Command输出的信息转化成ui可识别的信息。
 * 
 * @author <b>Abner</b>
 * 
 */
public abstract class ReportCreator {

	private List<ReportListener> listeners = new ArrayList<ReportListener>();

	/**
	 * 增加报告监听器
	 * 
	 * @param listener
	 */
	public void addReportListener(ReportListener listener) {
		listeners.add(listener);
	}

	/**
	 * 保存报告历史时触发的事件
	 * 
	 * @param command
	 */
	public void onReportHistorySave(String group, String command) {
		for (ReportListener listener : listeners) {
			listener.onSaveReport(group, command);
		}
	}

	/**
	 * 点击表格时出发的事件
	 * 
	 * @param unitID
	 */
	public void onClickedSummary(String unitID) {
		for (ReportListener listener : listeners) {
			listener.onClickedSummary(unitID);
		}
	}

	/**
	 * 增加忽略列表时触发的事件
	 * 
	 * @param ignoreList
	 */
	public void onAddIgnoreList(List<String> ignoreList) {
		for (ReportListener listener : listeners) {
			listener.onAddIgnoreList(ignoreList);
		}
	}

	public void onViewIgnoreList(String group) {
		for (ReportListener listener : listeners) {
			listener.onViewIgnoreList(group);
		}

	}

	/**
	 * 将分析结果转化成swing格式
	 * 
	 * @param result
	 *            分析结果
	 * @return
	 */
	public abstract Map<String, JComponent> createReport(AnalysisResult result);

	/**
	 * 内存重构
	 * 
	 * @throws JDependException
	 */
	public void onRefactoring() throws JDependException {

		for (ReportListener listener : listeners) {
			listener.onRefactoring();
		}

	}

}
