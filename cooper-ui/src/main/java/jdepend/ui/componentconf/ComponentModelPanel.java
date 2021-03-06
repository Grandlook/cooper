package jdepend.ui.componentconf;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.DefaultListModel;
import javax.swing.JCheckBox;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTextField;
import javax.swing.ListModel;
import javax.swing.ListSelectionModel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import jdepend.framework.exception.JDependException;
import jdepend.framework.util.BundleUtil;
import jdepend.model.component.modelconf.ComponentConf;
import jdepend.model.component.modelconf.ComponentModelConf;
import jdepend.model.component.modelconf.ComponentModelConfMgr;
import jdepend.ui.JDependCooper;
import jdepend.ui.wizard.IgnoreSettingDialog;

public class ComponentModelPanel extends JPanel {

	private JTextField componentModelField;

	// 包集合
	private JavaPackageListTable packageTable;
	// 包过滤器
	protected JTextField packageListFilter;
	// 是否包含外部包
	protected JCheckBox filterExt;
	// 包列表所占区域
	private boolean javaPackageListNormal = true;

	// 组件结果
	private ComponentModelConf componentModelConf = new ComponentModelConf();

	// 已创建的组件
	private JList componentListUI;

	private DefaultListModel componentListModel = new DefaultListModel();

	private String currentComponent;

	// 组件关联的包
	private DefaultListModel packageListModel = new DefaultListModel();

	public static final int Width = 650;
	public static final int Height = 580;

	public static final int NormalHeight = 355;

	private JDependCooper frame;

	/**
	 * 创建组件模型窗口
	 * 
	 * @param frame
	 * @param path
	 * @param group
	 */
	public ComponentModelPanel(JDependCooper frame, String path, String group) {

		this.frame = frame;

		this.setLayout(new BorderLayout());

		JPanel componentGroupPanel = new JPanel(new BorderLayout());
		componentGroupPanel.add(
				BorderLayout.WEST,
				new JLabel(BundleUtil
						.getString(BundleUtil.ClientWin_ComponentModel_Name)
						+ ":"));

		JPanel contentPanel = new JPanel(new GridLayout(1, 2));
		componentModelField = new JTextField();
		componentModelField.addKeyListener(new KeyAdapter() {
			@Override
			public void keyReleased(KeyEvent e) {
				componentModelConf.setName(componentModelField.getText());
			}
		});
		contentPanel.add(componentModelField);
		filterExt = new JCheckBox(
				BundleUtil
						.getString(BundleUtil.ClientWin_ComponentModel_FilterExt));
		filterExt.setSelected(true);
		filterExt.addChangeListener(new ChangeListener() {
			@Override
			public void stateChanged(ChangeEvent arg0) {
				packageTable.filterPackageList();
			}
		});
		contentPanel.add(filterExt);
		componentGroupPanel.add(BorderLayout.CENTER, contentPanel);

		JPanel layoutPanel = new JPanel(new BorderLayout());
		layoutPanel
				.add(BorderLayout.WEST,
						new JLabel(
								BundleUtil
										.getString(BundleUtil.ClientWin_ComponentModel_PackageListFilter)
										+ ":"));
		packageListFilter = new JTextField();
		packageListFilter.setPreferredSize(new Dimension(150, 20));
		packageListFilter.addKeyListener(new KeyAdapter() {
			@Override
			public void keyReleased(KeyEvent e) {
				packageTable.filterPackageList();
			}
		});

		layoutPanel.add(BorderLayout.CENTER, packageListFilter);

		componentGroupPanel.add(BorderLayout.EAST, layoutPanel);

		this.add(BorderLayout.NORTH, componentGroupPanel);

		JPanel packageComponentPanel = new JPanel(new BorderLayout());
		JComponent javaPackageList = this.createListJavaPackages(path, group);
		JPanel componentPanel = new JPanel(new BorderLayout());

		JList componentList = createComponentList();

		JList packageList = createPackageList();

		JSplitPane componentSplitPane = new JSplitPane(
				JSplitPane.HORIZONTAL_SPLIT, false, new JScrollPane(
						componentList), new JScrollPane(packageList));

		componentPanel.add(componentSplitPane);

		final JSplitPane packageComponentSplitPane = new JSplitPane(
				JSplitPane.VERTICAL_SPLIT, false, javaPackageList,
				componentPanel);

		packageComponentSplitPane.setDividerLocation(NormalHeight);

		packageTable.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (e.getClickCount() == 2) {
					if (javaPackageListNormal) {
						packageComponentSplitPane.setDividerLocation(Height);
						javaPackageListNormal = false;
					} else {
						packageComponentSplitPane
								.setDividerLocation(NormalHeight);
						javaPackageListNormal = true;
					}
				}
			}
		});

		packageComponentPanel.add(packageComponentSplitPane);

		this.add(BorderLayout.CENTER, packageComponentPanel);

		packageTable.loadPackageList();
	}

	/**
	 * 修改组件模型窗口
	 * 
	 * @param frame
	 * @param path
	 * @param groupName
	 * @param componentModelName
	 */
	public ComponentModelPanel(JDependCooper frame, String path,
			String groupName, String componentModelName) {
		this(frame, path, groupName);

		componentModelField.setText(componentModelName);
		this.setReadOnlyName();

		componentModelConf = ComponentModelConfMgr.getInstance()
				.getTheComponentModelConf(groupName, componentModelName);
		// 更新componentListModel和packageListModel
		for (ComponentConf componentConf : componentModelConf
				.getComponentConfs()) {
			componentListModel.addElement(componentConf.getName());
			for (String packageName : componentConf.getPackages()) {
				if (componentListModel.size() == 1) {
					packageListModel.addElement(packageName);
				}
			}
		}

		// 删除已经包含在组件模型中的packages
		packageTable.removeThePackageList(componentModelConf
				.getContainPackages());

		// 设置默认组件
		if (this.currentComponent == null && componentListModel.size() > 0) {
			currentComponent = (String) componentListModel.getElementAt(0);
			componentListUI.setSelectedIndex(0);
		}
	}

	public void setReadOnlyName() {
		componentModelField.setEditable(false);
	}

	public JComponent createListJavaPackages(String path, String group) {

		packageTable = new JavaPackageListTable(this, path, group);

		JScrollPane pane = new JScrollPane(packageTable);
		pane.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (e.getButton() == 3) {
					JPopupMenu menu = new JPopupMenu();
					JMenuItem gobalIgnoreItem = new JMenuItem(
							BundleUtil
									.getString(BundleUtil.Command_ViewGobalIgnorePackages));
					gobalIgnoreItem.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							try {
								gobalIgnore();
							} catch (Exception ex) {
								ex.printStackTrace();
								JOptionPane.showMessageDialog(
										ComponentModelPanel.this,
										ex.getMessage(), "alert",
										JOptionPane.ERROR_MESSAGE);
							}
						}

						private void gobalIgnore() {
							IgnoreSettingDialog d = new IgnoreSettingDialog(
									frame);
							d.setModal(true);
							d.setVisible(true);
						}
					});
					menu.add(gobalIgnoreItem);
					JMenuItem refreshItem = new JMenuItem(BundleUtil
							.getString(BundleUtil.Command_Refresh));
					refreshItem.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							try {
								packageTable.loadPackageList();
								// 删除已经包含在组件模型中的packages
								packageTable
										.removeThePackageList(componentModelConf
												.getContainPackages());
								//进行关键字过滤
								packageTable.filterPackageList();
							} catch (Exception ex) {
								ex.printStackTrace();
								JOptionPane.showMessageDialog(
										ComponentModelPanel.this,
										ex.getMessage(), "alert",
										JOptionPane.ERROR_MESSAGE);
							}
						}
					});
					menu.add(refreshItem);
					menu.show((Component) e.getSource(), e.getX(), e.getY());
				}
			}
		});
		return pane;

	}

	protected void createComponent() throws JDependException {
		int[] rows = packageTable.getSelectedRows();
		if (rows == null || rows.length == 0)
			throw new JDependException("您没有选择包！");

		ArrayList<String> selectedPackages = new ArrayList<String>();
		for (int i = 0; i < rows.length; i++) {
			selectedPackages.add((String) packageTable.getValueAt(rows[i], 0));
		}

		CreateCustomComponentConfDialog d = new CreateCustomComponentConfDialog(
				selectedPackages);
		d.setModal(true);
		d.setVisible(true);
	}

	protected void batchCreateComponent() throws JDependException {
		int[] rows = packageTable.getSelectedRows();
		if (rows == null || rows.length == 0)
			throw new JDependException("您没有选择包！");

		ArrayList<String> selectedPackages = new ArrayList<String>();
		for (int i = 0; i < rows.length; i++) {
			selectedPackages.add((String) packageTable.getValueAt(rows[i], 0));
		}

		ArrayList<String> packageList;
		for (String unit : selectedPackages) {
			packageList = new ArrayList<String>();
			packageList.add(unit);
			componentModelConf.addComponentConf(unit,
					jdepend.model.Component.UndefinedComponentLevel,
					packageList);
		}
		packageTable.removeThePackageList(selectedPackages);
		refreshComponentList();
	}

	protected void joinComponent() throws JDependException {
		int[] rows = packageTable.getSelectedRows();
		if (rows == null || rows.length == 0)
			throw new JDependException("您没有选择包！");

		ArrayList<String> selectedPackages = new ArrayList<String>();
		for (int i = 0; i < rows.length; i++) {
			selectedPackages.add((String) packageTable.getValueAt(rows[i], 0));
		}

		JoinCustomComponentConfDialog d = new JoinCustomComponentConfDialog(
				selectedPackages, componentModelConf) {
			@Override
			protected void doService() {
				packageTable.removeThePackageList(joinPackages);
				refreshComponentList();
			}
		};
		d.setModal(true);
		d.setVisible(true);

	}

	private JList createComponentList() {

		componentListUI = new JList(componentListModel);

		final JPopupMenu popupMenu = new JPopupMenu();
		JMenuItem deleteItem = new JMenuItem(
				BundleUtil.getString(BundleUtil.Command_DeleteComponent));
		deleteItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				deleteComponent();
				refreshComponentList();
			}
		});
		popupMenu.add(deleteItem);

		componentListUI.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				JList theList = (JList) e.getSource();
				ListModel model = theList.getModel();

				int index = theList.locationToIndex(e.getPoint());
				if (index >= 0) {
					currentComponent = (String) model.getElementAt(index);
					theList.setSelectedIndex(index);
					refreshPackageList();
				}
				if (e.getButton() == 3)
					popupMenu.show(theList, e.getX(), e.getY());
			}
		});

		return componentListUI;
	}

	private JList createPackageList() {
		final JList packageList = new JList(packageListModel);
		packageList
				.setSelectionMode(ListSelectionModel.MULTIPLE_INTERVAL_SELECTION);

		final JPopupMenu popupMenu = new JPopupMenu();
		JMenuItem removeItem = new JMenuItem(
				BundleUtil.getString(BundleUtil.Command_MoveToOtherComponent));
		removeItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {

				if (packageList.getSelectedValues() == null
						|| packageList.getSelectedValues().length == 0) {
					JOptionPane.showMessageDialog((Component) e.getSource(),
							"请选择至少一个包", "alert", JOptionPane.ERROR_MESSAGE);
					return;
				}
				List<String> selectedPackages = new ArrayList<String>();
				for (Object value : packageList.getSelectedValues()) {
					selectedPackages.add((String) value);
				}
				JoinCustomComponentConfDialog d = new JoinCustomComponentConfDialog(
						selectedPackages, componentModelConf) {
					@Override
					protected void doService() {
						componentModelConf
								.getTheComponentConf(currentComponent)
								.deletePackages(joinPackages);
						refreshComponentList();
					}
				};
				d.setModal(true);
				d.setVisible(true);
			}
		});
		popupMenu.add(removeItem);

		JMenuItem deleteItem = new JMenuItem(
				BundleUtil.getString(BundleUtil.Command_Delete));
		deleteItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {

				if (packageList.getSelectedValues() == null
						|| packageList.getSelectedValues().length == 0) {
					JOptionPane.showMessageDialog((Component) e.getSource(),
							"请选择至少一个包", "alert", JOptionPane.ERROR_MESSAGE);
					return;
				}
				List<String> selectedPackages = new ArrayList<String>();
				for (Object value : packageList.getSelectedValues()) {
					selectedPackages.add((String) value);
				}

				componentModelConf.getTheComponentConf(currentComponent)
						.deletePackages(selectedPackages);
				packageTable.addThePackageList(selectedPackages);
				refreshComponentList();
			}
		});
		popupMenu.add(deleteItem);

		packageList.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				JList theList = (JList) e.getSource();
				if (e.getButton() == 3)
					popupMenu.show(theList, e.getX(), e.getY());
			}
		});

		return packageList;
	}

	private void deleteComponent() {
		String componentName = (String) componentListUI.getSelectedValue();
		packageTable.addThePackageList(componentModelConf.getTheComponentConf(
				componentName).getPackages());
		componentModelConf.deleteComponentConf(componentName);
	}

	private void refreshComponentList() {
		componentListModel.removeAllElements();
		for (String componentName : componentModelConf.getComponentConfNames()) {
			componentListModel.addElement(componentName);
		}
		this.refreshPackageList();
	}

	private void refreshPackageList() {
		packageListModel.removeAllElements();
		if (currentComponent != null) {
			for (String packageName : componentModelConf.getTheComponentConf(
					currentComponent).getPackages())
				packageListModel.addElement(packageName);
		}
	}

	class CreateCustomComponentConfDialog extends CreateComponentConfDialog {

		public CreateCustomComponentConfDialog(ArrayList<String> units) {
			super(units, false);
		}

		protected void doService(ActionEvent e) throws JDependException {
			componentModelConf.addComponentConf(componentname.getText(),
					this.getComponentLayer(), units);
			packageTable.removeThePackageList(units);
			refreshComponentList();
		}
	}

	public void validateData() throws JDependException {

		this.componentModelConf.validateData();

		List<String> ignorePackages = this.componentModelConf
				.calIgnorePackages(packageTable.getPackages());
		if (ignorePackages != null && ignorePackages.size() > 0) {
			if (JOptionPane.showConfirmDialog(this,
					"包[" + ignorePackages.get(0) + "]等" + ignorePackages.size()
							+ "个没有被包含的组件中，你是否确认继续？") != JOptionPane.OK_OPTION) {
				throw new JDependException();
			}
		}
		// 设置未包含的packages
		this.componentModelConf.setIgnorePackages(ignorePackages);
	}

	public ComponentModelConf getComponentModelConf() {
		return this.componentModelConf;
	}

	public List<String> calIgnorePackages() {
		return this.componentModelConf.calIgnorePackages(packageTable
				.getPackages());
	}
}
