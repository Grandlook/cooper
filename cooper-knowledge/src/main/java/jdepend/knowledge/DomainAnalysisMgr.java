package jdepend.knowledge;

import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

import jdepend.framework.exception.JDependException;
import jdepend.model.util.ClassSearchUtil;

public final class DomainAnalysisMgr {

	private static DomainAnalysisMgr mgr = new DomainAnalysisMgr();

	private List<DomainAnalysis> domainAnalysises;

	public static DomainAnalysisMgr getIntance() {
		return mgr;
	}

	private DomainAnalysisMgr() {
		this.init();
	}

	public List<DomainAnalysis> getDomainAnalysises() {
		return this.domainAnalysises;
	}

	public DomainAnalysis getTheDomainAnalysis(StructureCategory sc) throws JDependException {
		for (DomainAnalysis domainAnalysis : domainAnalysises) {
			if (domainAnalysis.getStructureCategory().equals(sc)) {
				return domainAnalysis;
			}
		}
		throw new JDependException("未找到类型为[" + sc + "]的领域分析器");
	}

	private void init() {
		List<String> analyzerNames = ClassSearchUtil.getInstance().getSubClassNames(DomainAnalysis.class.getName());
		domainAnalysises = new ArrayList<DomainAnalysis>();
		for (String analyzerName : analyzerNames) {
			try {
				Class analyzerClass = Class.forName(analyzerName);
				if (!analyzerClass.isInterface() && !Modifier.isAbstract(analyzerClass.getModifiers())) {
					DomainAnalysis analyzer = (DomainAnalysis) analyzerClass.newInstance();
					if (!domainAnalysises.contains(analyzer)) {
						domainAnalysises.add(analyzer);
					}
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
	}

}
