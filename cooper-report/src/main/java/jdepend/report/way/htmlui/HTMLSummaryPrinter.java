package jdepend.report.way.htmlui;

import jdepend.framework.util.MetricsFormat;
import jdepend.model.JDependUnit;
import jdepend.model.MetricsMgr;
import jdepend.model.result.AnalysisResult;
import jdepend.report.util.ReportConstant;

public final class HTMLSummaryPrinter extends HTMLSortTablePrinter {

	public void printUnits(AnalysisResult inputData) {
		getWriter().println("<table  id=\"SummaryTable\" class=\"sortable\">");
		getWriter().println("<tr>");
		this.printTableHeadElement(ReportConstant.Name);
		this.printTableHeadElement(ReportConstant.LC);
		this.printTableHeadElement(ReportConstant.CN);
		this.printTableHeadElement(ReportConstant.CC);
		this.printTableHeadElement(ReportConstant.AC);
		this.printTableHeadElement(ReportConstant.Ca);
		this.printTableHeadElement(ReportConstant.Ce);
		this.printTableHeadElement(ReportConstant.A);
		this.printTableHeadElement(ReportConstant.I);
		this.printTableHeadElement(ReportConstant.D);
		this.printTableHeadElement(ReportConstant.Coupling);
		this.printTableHeadElement(ReportConstant.Cohesion);
		this.printTableHeadElement(ReportConstant.Balance);
		this.printTableHeadElement(ReportConstant.OO);
		this.printTableHeadElement(ReportConstant.Cycle);
		getWriter().println("\n</tr>");

		for (JDependUnit unit : inputData.getComponents()) {
			getWriter().println("<tr>");
			this.printTableRowElement(unit.getName());
			this.printTableRowElement(unit.getLineCount());
			this.printTableRowElement(unit.getClassCount());
			this.printTableRowElement(unit.getAbstractClassCount());
			this.printTableRowElement(unit.getConcreteClassCount());
			this.printTableRowElement(unit.afferentCoupling());
			this.printTableRowElement(unit.efferentCoupling());
			this.printTableRowElement(MetricsFormat.toFormattedMetrics(unit.abstractness()));
			this.printTableRowElement(MetricsFormat.toFormattedMetrics(unit.stability()));
			this.printTableRowElement(MetricsFormat.toFormattedMetrics(unit.distance()));
			this.printTableRowElement(MetricsFormat.toFormattedMetrics(unit.coupling()));
			this.printTableRowElement(MetricsFormat.toFormattedMetrics(unit.cohesion()));
			this.printTableRowElement(MetricsFormat.toFormattedMetrics(unit.balance()));
			this.printTableRowElement(MetricsFormat.toFormattedMetrics(unit.objectOriented()));
			if (unit.containsCycle()) {
				this.printTableRowElement(MetricsMgr.Cyclic);
			} else {
				this.printTableRowElement(MetricsMgr.NoCyclic);
			}
			getWriter().println("\n</tr>");
		}
		getWriter().println("<tr>");
		this.printTableRowElement(inputData.getSummary().getName());
		this.printTableRowElement(inputData.getSummary().getLineCount());
		this.printTableRowElement(inputData.getSummary().getClassCount());
		this.printTableRowElement(inputData.getSummary().getConcreteClassCount());
		this.printTableRowElement(inputData.getSummary().getAbstractClassCount());
		this.printTableRowElement(inputData.getSummary().getAfferentCoupling());
		this.printTableRowElement(inputData.getSummary().getEfferentCoupling());
		this.printTableRowElement(MetricsFormat.toFormattedMetrics(inputData.getSummary().getAbstractness()));
		this.printTableRowElement(MetricsFormat.toFormattedMetrics(inputData.getSummary().getInstability()));
		this.printTableRowElement(MetricsFormat.toFormattedMetrics(inputData.getSummary().getDistance()));
		this.printTableRowElement(MetricsFormat.toFormattedMetrics(inputData.getSummary().getCoupling()));
		this.printTableRowElement(MetricsFormat.toFormattedMetrics(inputData.getSummary().getCohesion()));
		this.printTableRowElement(MetricsFormat.toFormattedMetrics(inputData.getSummary().getBalance()));
		this.printTableRowElement(MetricsFormat.toFormattedMetrics(inputData.getSummary().getObjectOriented()));
		getWriter().println("\n</tr>");
		getWriter().println("</table>");

		getWriter().flush();
	}

}
