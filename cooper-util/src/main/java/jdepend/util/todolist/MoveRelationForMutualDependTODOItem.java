package jdepend.util.todolist;

import jdepend.framework.exception.JDependException;
import jdepend.framework.util.MathUtil;
import jdepend.model.Relation;

public final class MoveRelationForMutualDependTODOItem extends MoveRelationTODOItem {

	public MoveRelationForMutualDependTODOItem(Relation relation) {
		super(relation);
	}

	protected boolean decision() throws JDependException {
		if (relation.getAttentionType() != Relation.MutualDependAttentionType) {
			throw new JDependException("该关系不是彼此依赖");
		}
		// 根据耦合值判断需要移动Relation
		if (MathUtil.isZero(currentCaIntensity) || MathUtil.isZero(dependCeIntensity)) {
			if (currentCeIntensity > dependCaIntensity) {
				this.moveClasses = depend.getClasses();
				this.targetComponent = this.relation.getCurrent().getComponent();
			} else {
				this.moveClasses = current.getClasses();
				this.targetComponent = this.relation.getDepend().getComponent();
			}
			this.isChangeDir = true;
		} else {
			Float currentIntensity = currentCaIntensity + currentCeIntensity;
			Float dependIntensity = dependCaIntensity + dependCeIntensity;
			if (currentIntensity > dependIntensity) {
				this.moveClasses = depend.getClasses();
				this.targetComponent = this.relation.getCurrent().getComponent();
			} else {
				this.moveClasses = current.getClasses();
				this.targetComponent = this.relation.getDepend().getComponent();
			}
			this.isChangeDir = false;
		}
		return true;
	}

	@Override
	public String getAccording() {
		return "两个组件存在彼此依赖，应该避免强度比较弱的依赖线";
	}

	@Override
	public String getContent() {
		return relation.getCurrent().getName() + " 与 " + relation.getDepend().getName() + " 存在彼此依赖，并且前者对后者的依赖较少，请解决该依赖";
	}
}
