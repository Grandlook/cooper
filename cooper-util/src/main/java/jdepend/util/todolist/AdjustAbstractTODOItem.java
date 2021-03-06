package jdepend.util.todolist;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import jdepend.framework.exception.JDependException;
import jdepend.model.JDependUnit;
import jdepend.model.JavaClass;
import jdepend.model.Method;
import jdepend.model.MetricsMgr;
import jdepend.model.util.JDependUnitByMetricsComparator;

public final class AdjustAbstractTODOItem extends TODOItem {

	private JDependUnit unit;

	public AdjustAbstractTODOItem(JDependUnit unit) {
		super();
		this.unit = unit;
	}

	public JDependUnit getUnit() {
		return unit;
	}

	@Override
	public StringBuilder execute() throws JDependException {
		StringBuilder info = new StringBuilder();
		if (unit.stability() < 0.5) {
			Collection<JavaClass> abstractnessClasses = new ArrayList<JavaClass>();
			// 抽象程度不够
			List<JavaClass> javaClasses = new ArrayList<JavaClass>(unit.getClasses());
			// 按传入耦合倒序排序
			Collections.sort(javaClasses, new JDependUnitByMetricsComparator(MetricsMgr.CaCoupling, false));
			// 搜索代码行数超过500，方法超过200的JavaClass
			L: for (JavaClass javaClass : javaClasses) {
				if (!javaClass.isAbstract() && javaClass.getLineCount() > 500) {
					for (Method method : javaClass.getSelfMethods()) {
						if (method.getSelfLineCount() > 200 && !method.isStatic()) {
							if (!abstractnessClasses.contains(javaClass)) {
								abstractnessClasses.add(javaClass);
								if (abstractnessClasses.size() >= 5) {
									break L;
								}
							}
						}
					}
				}
			}

			if (abstractnessClasses.size() > 0) {
				for (JavaClass javaClass : abstractnessClasses) {
					info.append("建议将[" + javaClass.getName() + "]设计成接口或抽象类，并采用多个子类分散其逻辑\n");
				}
			} else {
				info.append("未识别出需要设计成接口或抽象类的Class\n");
			}
		} else {
			info.append("不必设计过多的接口或抽象类\n");
		}
		return info;

	}

	@Override
	public StringBuilder getInfo() {
		try {
			return this.execute();
		} catch (JDependException e) {
			e.printStackTrace();
			return null;
		}
	}

}
