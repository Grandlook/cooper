package jdepend.ui.property;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.JComponent;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

import jdepend.framework.exception.JDependException;
import jdepend.framework.ui.JTableUtil;
import jdepend.framework.util.BundleUtil;
import jdepend.model.JDependUnitMgr;
import jdepend.ui.JDependCooper;
import jdepend.util.todolist.TODOItem;
import jdepend.util.todolist.TODOListIdentify;

public final class TODOListPanel extends JPanel {

	private JDependCooper frame;

	private JTable listTable;

	private DefaultTableModel listModel;

	private String current;

	private List<String> selectedTODOItems;

	private List<TODOItem> todoList = new ArrayList<TODOItem>();

	public TODOListPanel(JDependCooper frame) {
		this.frame = frame;

		setLayout(new BorderLayout());

		this.add(this.initList());
	}

	private JComponent initList() {
		listModel = new DefaultTableModel() {
			@Override
			public boolean isCellEditable(int row, int column) {
				return false;
			}

		};

		listModel.addColumn("ID");
		listModel.addColumn(BundleUtil.getString(BundleUtil.TableHead_Desc));
		listModel.addColumn(BundleUtil
				.getString(BundleUtil.TableHead_According));

		this.listTable = new JTable(listModel);

		final JPopupMenu popupMenu = new JPopupMenu();
		JMenuItem viewItem = new JMenuItem(
				BundleUtil.getString(BundleUtil.Command_View));
		viewItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				view();
			}
		});
		popupMenu.add(viewItem);
		JMenuItem executeItem = new JMenuItem(
				BundleUtil.getString(BundleUtil.Command_VirtualExecute));
		executeItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					execute();
				} catch (JDependException e1) {
					e1.printStackTrace();
					frame.getResultPanel().showError(e1);
				}
			}
		});
		popupMenu.add(executeItem);

		popupMenu.addSeparator();

		JMenuItem saveAsItem = new JMenuItem(
				BundleUtil.getString(BundleUtil.Command_SaveAs));
		saveAsItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				JTableUtil.exportTableToExcel(listTable);
			}
		});
		popupMenu.add(saveAsItem);

		listTable.addMouseListener(new MouseAdapter() {
			@Override
			public void mousePressed(MouseEvent e) {
				JTable table = (JTable) e.getSource();
				current = (String) table.getValueAt(
						table.rowAtPoint(e.getPoint()), 0);
				selectedTODOItems = new ArrayList<String>();
				for (int row : table.getSelectedRows()) {
					selectedTODOItems.add((String) table.getValueAt(row, 0));
				}
				if (e.getClickCount() == 2) {
					try {
						execute();
					} catch (JDependException e1) {
						e1.printStackTrace();
						frame.getResultPanel().showError(e1);
					}
				} else if (e.getButton() == 3) {
					popupMenu.show(table, e.getX(), e.getY());
				}
			}
		});

		this.listTable.getColumnModel().getColumn(0).setMaxWidth(0);
		this.listTable.getColumnModel().getColumn(0).setMinWidth(0);

		try {
			refresh();
		} catch (JDependException e1) {
			e1.printStackTrace();
		}

		JScrollPane pane = new JScrollPane(this.listTable);
		pane.setBorder(BorderFactory.createEmptyBorder(0, 0, 0, 0));

		return pane;
	}

	private void view() {
		TODOItem item = this.getCurrent();
		this.frame.getResultPanel().addResult(item.getAccording(),
				item.getInfo());
	}

	private void execute() throws JDependException {
		if (this.selectedTODOItems == null
				|| this.selectedTODOItems.size() == 0) {
			throw new JDependException("请选择需要执行的待做事项");
		}
		List<StringBuilder> infos = new ArrayList<StringBuilder>();
		for (TODOItem item : this.getCurrents()) {
			StringBuilder info = null;
			try {
				info = item.execute();
			} catch (JDependException e) {
				e.printStackTrace();
				frame.showStatusError(e.getMessage());
			}
			if (info != null && info.length() > 0) {
				infos.add(info);
			}
		}
		frame.onRefactoring();
		for (StringBuilder info : infos) {
			frame.getResultPanel().addResult("待办建议", info);
		}
	}

	private TODOItem getCurrent() {
		TODOItem item = null;
		for (TODOItem element : todoList) {
			if (element.getId().equals(this.current)) {
				item = element;
				break;
			}
		}
		return item;
	}

	private List<TODOItem> getCurrents() {
		List<TODOItem> items = new ArrayList<TODOItem>();
		for (TODOItem element : todoList) {
			if (this.selectedTODOItems.contains(element.getId())) {
				items.add(element);
			}
		}
		return items;
	}

	public void refresh() throws JDependException {
		TODOListIdentify identify = new TODOListIdentify();
		todoList = identify.identify(JDependUnitMgr.getInstance().getResult());

		listModel.setRowCount(0);
		Object[] row;
		for (TODOItem item : todoList) {

			row = new Object[3];
			row[0] = item.getId();
			row[1] = item.getContent();
			row[2] = item.getAccording();
			listModel.addRow(row);
		}

	}

	public void clear() {
		listModel.setRowCount(0);
	}

}
