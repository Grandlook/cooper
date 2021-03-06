package jdepend.ui.motive;

import java.util.Map;

import javax.swing.JOptionPane;

import jdepend.framework.exception.JDependException;
import jdepend.model.JDependUnitMgr;

public final class AddComponentDialog extends ComponentListDialog {

	private String areaName;

	public AddComponentDialog(MotiveOperationPanel motiveOperationPanel, String areaName) {
		super(motiveOperationPanel);
		this.setTitle("增加");
		this.areaName = areaName;
	}

	@Override
	protected void add() throws JDependException {
		if (this.currentComponentNames == null || currentComponentNames.size() == 0) {
			JOptionPane.showMessageDialog(this, "请选择组件", "alert", JOptionPane.INFORMATION_MESSAGE);
		} else {
			Map<String, jdepend.model.Component> unitForNames = JDependUnitMgr.getInstance().getResult()
					.getComponentForNames();
			for (String componentName : this.currentComponentNames) {
				if (unitForNames.containsKey(componentName)) {
					this.motiveContainer.addComponent(areaName, unitForNames.get(componentName));
				}
			}
			motiveOperationPanel.refreshArea();
		}

	}

}
