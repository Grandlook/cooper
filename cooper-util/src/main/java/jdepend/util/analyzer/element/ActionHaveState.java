package jdepend.util.analyzer.element;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import jdepend.framework.exception.JDependException;
import jdepend.model.JavaClass;
import jdepend.model.JavaClassType;
import jdepend.model.result.AnalysisResult;
import jdepend.util.analyzer.framework.AbstractAnalyzer;
import jdepend.util.analyzer.framework.Analyzer;

public class ActionHaveState extends AbstractAnalyzer {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3255663101350530353L;

	private String endWith;

	private String ActionSuperClassName;

	public ActionHaveState() {
		super("Action中存在属性", Analyzer.AntiPattern, "Action中存在属性");
		this.setType(AntiPattern);
	}

	protected void doSearch(AnalysisResult result) throws JDependException {

		List<String> supers = new ArrayList<String>();
		supers.add(ActionSuperClassName);
		JavaClassType actionClassType = new JavaClassType("Action", supers, this.endWith);

		Collection<JavaClass> javaClasses = result.getClasses();
		actionClassType.setJavaClasses(javaClasses);

		int totalAction = 0;
		int printAction = 0;
		for (JavaClass javaClass : javaClasses) {
			if (actionClassType.isMember(javaClass)) {
				totalAction++;
				if (javaClass.haveState()) {
					this.print(javaClass.getName() + "\n");
					printAction++;
				}
			}
		}
		this.print("\n");
		this.print("TotalActions : " + totalAction);
		this.print("PrintActions: " + printAction);
		this.print("\n");

	}

	public String getEndWith() {
		return endWith;
	}

	public void setEndWith(String endWith) {
		this.endWith = endWith;
	}

	public String getActionSuperClassName() {
		return ActionSuperClassName;
	}

	public void setActionSuperClassName(String actionSuperClassName) {
		ActionSuperClassName = actionSuperClassName;
	}

}
