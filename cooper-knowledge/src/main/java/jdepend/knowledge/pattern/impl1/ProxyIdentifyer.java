package jdepend.knowledge.pattern.impl1;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

import jdepend.knowledge.pattern.PatternInfo;
import jdepend.model.InvokeItem;
import jdepend.model.JavaClass;
import jdepend.model.Method;

public class ProxyIdentifyer extends AbstractPatternIdentifyer {

	@Override
	public String getExplain() {
		StringBuilder explain = new StringBuilder();
		explain.append("&nbsp;&nbsp;&nbsp;&nbsp;<strong>代理模式</strong><br>");
		explain.append("&nbsp;&nbsp;&nbsp;&nbsp;1、存在父类；2、父类存在其他子类；3、存在覆盖了父类的方法；4、方法使用了其他子类的相同方法。<br><br>");
		return explain.toString();
	}

	@Override
	public Collection<PatternInfo> identify(Collection<JavaClass> javaClasses) {
		Collection<JavaClass> superClasses;
		Collection<JavaClass> otherSubClasses;
		Collection<PatternInfo> rtn = new ArrayList<PatternInfo>();
		PatternInfo rtnItem;
		for (JavaClass javaClass : javaClasses) {
			// 计算存在父类的JavaClasses
			superClasses = javaClass.getSupers();
			if (superClasses != null && superClasses.size() > 0) {
				otherSubClasses = new HashSet<JavaClass>();
				M: for (JavaClass superClass : superClasses) {
					for (JavaClass subClass : superClass.getSubClasses()) {
						if (!subClass.equals(javaClass) && !otherSubClasses.contains(subClass)) {
							otherSubClasses.add(subClass);
						}
					}
				}
				if (otherSubClasses.size() > 0) {
					// 搜索代理方法
					L: for (Method method : javaClass.getOverrideMethods().keySet()) {
						for (InvokeItem item : method.getInvokeItems()) {
							if (otherSubClasses.contains(item.getMethod().getJavaClass())
									&& item.math2(javaClass.getOverrideMethods().get(method))) {
								rtnItem = new PatternInfo(javaClass, javaClass.getName() + "."
										+ item.getMethod().getName());
								if (!rtn.contains(rtnItem)) {
									rtn.add(rtnItem);
								}
								break L;
							}
						}

					}
				}
			}
		}
		return rtn;
	}

}
