package jdepend.webserver.web;

import jdepend.framework.exception.JDependException;
import jdepend.framework.util.MetricsFormat;
import jdepend.knowledge.AdviseInfo;
import jdepend.knowledge.ExpertFactory;
import jdepend.knowledge.Structure;
import jdepend.knowledge.StructureCategory;
import jdepend.model.result.AnalysisResult;

public class WebAnalysisResult extends AnalysisResult {

	private static final long serialVersionUID = 6554084973911277359L;

	public WebAnalysisResult(AnalysisResult result) {
		super(result);
	}

	public String getProblemRelationScale() {
		return MetricsFormat.toFormattedPercent(this.getAttentionRelationScale());
	}

	public String getDAdvise() {
		return this.getAdvise(StructureCategory.DDomainAnalysis);
	}

	public String getBalanceAdvise() {
		return this.getAdvise(StructureCategory.CohesionDomainAnalysis);
	}

	public String getEncapsulationAdvise() {
		return this.getAdvise(StructureCategory.EncapsulationDomainAnalysis);
	}

	public String getRelationRationalityAdvise() {
		return this.getAdvise(StructureCategory.RelationRationalityDomainAnalysis);
	}

	private String getAdvise(StructureCategory category) {
		Structure structure = new Structure();
		structure.setCategory(category);
		structure.setData(this);
		try {
			AdviseInfo advise = new ExpertFactory().createExpert().advise(structure);
			if (advise != null) {
				return advise.toString();
			} else {
				return null;
			}
		} catch (JDependException e) {
			e.printStackTrace();
			return null;
		}
	}

}
