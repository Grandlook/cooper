package jdepend.ui.componentconf;

import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPopupMenu;
import javax.swing.JProgressBar;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableCellRenderer;

import jdepend.core.config.CommandConf;
import jdepend.core.config.CommandConfMgr;
import jdepend.core.config.GroupConf;
import jdepend.framework.exception.JDependException;
import jdepend.framework.ui.JTableUtil;
import jdepend.framework.ui.TableSorter;
import jdepend.framework.util.BundleUtil;
import jdepend.model.JavaPackage;
import jdepend.parse.util.SearchUtil;

public class JavaPackageListTable extends JTable {

	private ComponentModelPanel componentModelPanel;

	// 包中最大类个数
	private int maxClassCount;
	// 包集合
	private DefaultTableModel packageTableModel;

	// 包集合
	private List<JavaPackage> packages;
	private Map<String, JavaPackage> packageForNames;
	// 当前包集合
	private List<String> currentPackageList;

	// 正在操作的命令组名称
	private String currentGroup;

	private String path;

	public JavaPackageListTable(ComponentModelPanel componentModelPanel1,
			String path, String currentGroup) {

		this.componentModelPanel = componentModelPanel1;
		this.path = path;
		this.currentGroup = currentGroup;

		packageTableModel = new DefaultTableModel() {
			@Override
			public boolean isCellEditable(int row, int column) {
				return false;
			}

		};

		TableSorter sorter = new TableSorter(packageTableModel);

		final JPopupMenu popupMenu = new JPopupMenu();
		JMenuItem createItem = new JMenuItem(
				BundleUtil.getString(BundleUtil.Command_CreateComponent));
		createItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					componentModelPanel.createComponent();
				} catch (JDependException ex) {
					ex.printStackTrace();
					JOptionPane.showMessageDialog(null, ex.getMessage(),
							"alert", JOptionPane.ERROR_MESSAGE);
				}
			}
		});
		popupMenu.add(createItem);
		JMenuItem create1Item = new JMenuItem(
				BundleUtil
						.getString(BundleUtil.Command_CreateComponentWithPackages));
		create1Item.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					componentModelPanel.batchCreateComponent();
				} catch (JDependException ex) {
					ex.printStackTrace();
					JOptionPane.showMessageDialog(null, ex.getMessage(),
							"alert", JOptionPane.ERROR_MESSAGE);
				}
			}
		});
		popupMenu.add(create1Item);

		popupMenu.addSeparator();

		JMenuItem joinItem = new JMenuItem(
				BundleUtil.getString(BundleUtil.Command_JoinComponent));
		joinItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					componentModelPanel.joinComponent();
				} catch (JDependException ex) {
					ex.printStackTrace();
					JOptionPane.showMessageDialog(null, ex.getMessage(),
							"alert", JOptionPane.ERROR_MESSAGE);
				}
			}
		});
		popupMenu.add(joinItem);

		popupMenu.addSeparator();

		JMenuItem viewClassItem = new JMenuItem(
				BundleUtil.getString(BundleUtil.Command_ViewClassList));
		viewClassItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					viewClassList();
				} catch (JDependException ex) {
					ex.printStackTrace();
					JOptionPane.showMessageDialog(null, ex.getMessage(),
							"alert", JOptionPane.ERROR_MESSAGE);
				}
			}
		});
		popupMenu.add(viewClassItem);

		this.addMouseListener(new MouseAdapter() {
			public void mouseClicked(MouseEvent e) {
				JTable table = (JTable) e.getSource();
				if (e.getButton() == 3) {
					popupMenu.show(table, e.getX(), e.getY());
				}
			}
		});

		sorter.setTableHeader(this.getTableHeader());

		packageTableModel.addColumn(BundleUtil
				.getString(BundleUtil.TableHead_PackageName));
		packageTableModel.addColumn(BundleUtil
				.getString(BundleUtil.TableHead_ClassCount));

		sorter.setSortingStatus(0, TableSorter.ASCENDING);

		this.setModel(sorter);

	}

	protected void loadPackageList() {

		packageTableModel.setRowCount(0);

		currentPackageList = new ArrayList<String>();

		packages = new ArrayList<JavaPackage>(this.getPackages(this.path));

		Collections.sort(packages);

		this.packageForNames = new HashMap<String, JavaPackage>();
		for (JavaPackage javaPackage : packages) {
			this.packageForNames.put(javaPackage.getName(), javaPackage);
		}

		Object[] row;
		int ClassCount;
		for (JavaPackage javaPackage : packages) {
			if (this.componentModelPanel.filterExt.isSelected()
					&& javaPackage.isInner()
					|| !this.componentModelPanel.filterExt.isSelected()) {
				row = new Object[2];
				row[0] = javaPackage.getName();
				ClassCount = javaPackage.getClassCount();
				row[1] = ClassCount;
				if (maxClassCount < ClassCount) {
					maxClassCount = ClassCount;
				}
				packageTableModel.addRow(row);
			}
			currentPackageList.add(javaPackage.getName());
		}

		List<String> fitColNames = new ArrayList<String>();
		fitColNames.add(BundleUtil.getString(BundleUtil.TableHead_PackageName));
		JTableUtil.fitTableColumns(this, fitColNames);
	}

	@Override
	public TableCellRenderer getCellRenderer(int row, int column) {
		if (column == 1) {
			return new TableCellRenderer() {
				@Override
				public Component getTableCellRendererComponent(JTable table,
						Object value, boolean isSelected, boolean hasFocus,
						int row, int column) {
					JProgressBar progressBar = new JProgressBar();
					progressBar.setMinimum(0);
					progressBar.setMaximum(maxClassCount);
					if (value != null) {
						progressBar.setValue((Integer) value);
						progressBar.setToolTipText(Integer
								.toString((Integer) value));
					}
					if (isSelected) {
						progressBar.setBackground(table
								.getSelectionBackground());
					} else {
						progressBar.setBackground(table.getBackground());
					}
					progressBar.setBorderPainted(false);
					return progressBar;
				}
			};
		} else {
			return super.getCellRenderer(row, column);
		}
	}

	private void viewClassList() throws JDependException {
		int[] rows = this.getSelectedRows();
		if (rows == null || rows.length != 1)
			throw new JDependException("请选择一个包！");

		String javaPackageName = (String) this.getValueAt(rows[0], 0);
		JavaPackage javaPackage = this.packageForNames.get(javaPackageName);
		ClassListInThePackageDialog d = new ClassListInThePackageDialog(
				javaPackage);
		d.setModal(true);
		d.setVisible(true);
	}

	protected void removeThePackageList(Collection<String> packageNames) {
		for (int row = packageTableModel.getRowCount() - 1; row >= 0; row--) {
			if (packageNames.contains(packageTableModel.getValueAt(row, 0))) {
				packageTableModel.removeRow(row);
			}
		}
		for (int row = this.currentPackageList.size() - 1; row >= 0; row--) {
			if (packageNames.contains(currentPackageList.get(row))) {
				currentPackageList.remove(row);
			}
		}
	}

	protected void addThePackageList(List<String> packageNames) {
		for (JavaPackage javaPackage : packages) {
			if (packageNames.contains(javaPackage.getName())
					&& !this.currentPackageList.contains(javaPackage.getName())) {
				this.currentPackageList.add(javaPackage.getName());
			}
		}
		filterPackageList();
	}

	protected void filterPackageList() {

		String filter = this.componentModelPanel.packageListFilter.getText();
		boolean filterExtSetting = this.componentModelPanel.filterExt
				.isSelected();
		boolean filterString;
		boolean filterExtResult;
		List<String> matchPackageList = new ArrayList<String>();

		for (String packageName : this.currentPackageList) {
			filterString = filter == null || filter.length() == 0
					|| packageName.indexOf(filter) != -1;
			filterExtResult = filterExtSetting ? this.packageForNames.get(
					packageName).isInner() ? true : false : true;
			if (filterString && filterExtResult) {
				matchPackageList.add(packageName);
			}
		}

		packageTableModel.setRowCount(0);
		Object[] row;
		for (String packageName : matchPackageList) {
			row = new Object[2];
			row[0] = packageName;
			for (JavaPackage javaPackage : packages) {
				if (javaPackage.getName().equals(packageName)) {
					row[1] = javaPackage.getClassCount();
				}
			}
			packageTableModel.addRow(row);
		}
		packageTableModel.fireTableDataChanged();
	}

	private Collection<JavaPackage> getPackages(String path) {
		// 转换
		path = CommandConf.covertDefaultClassesPath(path);

		List<String> paths = new ArrayList<String>();
		paths.add(path);

		SearchUtil searchUtil = new SearchUtil(paths);
		searchUtil.setBuildClassRelation(false);

		try {
			// 设置当前命令组配置的FilteredPackages
			GroupConf groupConf = CommandConfMgr.getInstance().getTheGroup(
					this.currentGroup);
			if (groupConf != null) {
				searchUtil.addFilters(groupConf.getFilteredPackages());
			}
		} catch (JDependException e) {
			e.printStackTrace();
		}

		return searchUtil.getPackages();
	}

	protected List<JavaPackage> getPackages() {
		return packages;
	}

}
