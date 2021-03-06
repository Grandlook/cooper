package jdepend.ui.result;

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import jdepend.core.command.CommandAdapterMgr;
import jdepend.core.score.ScoreByItemComparator;
import jdepend.core.score.ScoreInfo;
import jdepend.core.score.ScoreRepository;
import jdepend.framework.exception.JDependException;
import jdepend.framework.ui.JDependUIUtil;
import jdepend.framework.ui.graph.GraphData;
import jdepend.framework.ui.graph.GraphDataItem;
import jdepend.framework.ui.graph.GraphUtil;
import jdepend.framework.util.BundleUtil;
import jdepend.framework.util.MathUtil;
import jdepend.framework.util.MetricsFormat;
import jdepend.framework.util.VersionUtil;
import jdepend.knowledge.AdviseInfo;
import jdepend.knowledge.ExpertFactory;
import jdepend.knowledge.Structure;
import jdepend.knowledge.StructureCategory;
import jdepend.knowledge.capacity.Capacity;
import jdepend.knowledge.capacity.CapacityCreatedListener;
import jdepend.knowledge.capacity.CapacityMgr;
import jdepend.model.JDependUnitMgr;
import jdepend.model.result.AnalysisResult;
import jdepend.model.result.AnalysisResultScored;
import jdepend.report.ui.ClassListDialog;
import jdepend.report.ui.CohesionDialog;
import jdepend.ui.JDependCooper;
import jdepend.ui.componentconf.ChangedPackageListDialog;
import jdepend.ui.motive.MotiveDialog;

public final class ScorePanel extends SubResultTabPanel implements
		CapacityCreatedListener {

	private AnalysisResult result;
	private JDependCooper frame;

	private List<ScoreInfo> scorelist = new ArrayList<ScoreInfo>();

	private JLabel capacityLabel;

	public ScorePanel(AnalysisResult result, JDependCooper frame) {
		this.result = result;
		this.frame = frame;
	}

	@Override
	protected void init(AnalysisResult result) {
		try {
			scorelist = ScoreRepository.getScoreList();
		} catch (JDependException e) {
			e.printStackTrace();
		}
		initComponents();

		// 将自己注册到CapacityMgr中
		CapacityMgr.getInstance().setListener(this);

	}

	private void initComponents() {

		this.setBackground(new java.awt.Color(255, 255, 255));
		this.setBorder(new EmptyBorder(2, 2, 2, 2));

		this.add(BorderLayout.NORTH, this.createExecuteInfo());

		this.add(BorderLayout.CENTER, this.createWorkspacePanel());
	}

	private JComponent createExecuteInfo() {
		JLabel executeInfo = new JLabel();

		executeInfo.setFont(new java.awt.Font("宋体", 0, 10));
		executeInfo.setForeground(new java.awt.Color(204, 204, 204));
		executeInfo.setText(BundleUtil.getString(BundleUtil.Analysis_Time)
				+ ":" + this.result.getRunningContext().getAnalyseDate() + " V"
				+ VersionUtil.getVersion() + " BuildDate:"
				+ VersionUtil.getBuildDate() + " Group:"
				+ this.result.getRunningContext().getGroup() + " Command:"
				+ this.result.getRunningContext().getCommand());

		return executeInfo;
	}

	private JPanel createWorkspacePanel() {

		JPanel workspacePanel = new JPanel(new GridLayout(1, 2));
		workspacePanel.setBackground(new java.awt.Color(255, 255, 255));

		JPanel leftPanel = new JPanel(new BorderLayout());

		JPanel scorePanel = new JPanel(new BorderLayout());
		scorePanel.setBorder(new TitledBorder(BundleUtil
				.getString(BundleUtil.ClientWin_ScorePanel_TotalScore)));
		scorePanel.setBackground(new java.awt.Color(255, 255, 255));

		scorePanel.add(this.createScorePanel());

		leftPanel.add(BorderLayout.CENTER, scorePanel);

		JPanel otherPanel = new JPanel(new BorderLayout());
		otherPanel.setBorder(new TitledBorder(BundleUtil
				.getString(BundleUtil.ClientWin_ScorePanel_OtherMetrics)));
		otherPanel.setBackground(new java.awt.Color(255, 255, 255));

		otherPanel.add(this.createItem(AnalysisResult.OOName, result
				.getSummary().getObjectOriented()));

		leftPanel.add(BorderLayout.SOUTH, otherPanel);

		workspacePanel.add(leftPanel);

		JPanel subitemPanel = new JPanel(new GridLayout(4, 1));
		subitemPanel.setBackground(new java.awt.Color(255, 255, 255));

		JPanel dPanel = new JPanel(new BorderLayout());
		dPanel.setBorder(new TitledBorder(BundleUtil
				.getString(BundleUtil.Metrics_D)));
		dPanel.setBackground(new java.awt.Color(255, 255, 255));
		dPanel.add(this.createItem(AnalysisResult.DName, result.getD()));

		subitemPanel.add(dPanel);

		JPanel balancePanel = new JPanel(new BorderLayout());
		balancePanel.setBorder(new TitledBorder(BundleUtil
				.getString(BundleUtil.Metrics_Balance)));
		balancePanel.setBackground(new java.awt.Color(255, 255, 255));
		balancePanel.add(this.createItem(AnalysisResult.BalanceName,
				result.getBalance()));

		subitemPanel.add(balancePanel);

		JPanel encapsulationPanel = new JPanel(new BorderLayout());
		encapsulationPanel.setBorder(new TitledBorder(BundleUtil
				.getString(BundleUtil.Metrics_Encapsulation)));
		encapsulationPanel.setBackground(new java.awt.Color(255, 255, 255));
		encapsulationPanel.add(this.createItem(
				AnalysisResult.EncapsulationName, result.getEncapsulation()));

		subitemPanel.add(encapsulationPanel);

		JPanel relationRationalityPanel = new JPanel(new BorderLayout());
		relationRationalityPanel.setBorder(new TitledBorder(BundleUtil
				.getString(BundleUtil.Metrics_RelationRationality)));
		relationRationalityPanel
				.setBackground(new java.awt.Color(255, 255, 255));
		relationRationalityPanel.add(this.createItem(
				AnalysisResult.RelationRationalityName,
				result.getRelationRationality()));

		subitemPanel.add(relationRationalityPanel);

		workspacePanel.add(subitemPanel);

		return workspacePanel;

	}

	private JPanel createItem(String itemName, Float scoreValue) {

		JPanel itemPanel = new JPanel(new BorderLayout());
		itemPanel.setBackground(new java.awt.Color(255, 255, 255));
		itemPanel.setBorder(new EmptyBorder(2, 2, 2, 2));

		JPanel scorePanel = new JPanel(new GridLayout(2, 1));
		scorePanel.setBackground(new java.awt.Color(255, 255, 255));

		JLabel score = new JLabel();
		score.setFont(new java.awt.Font("宋体", 1, 18));
		String title = null;
		if (itemName.equals(AnalysisResult.OOName)) {
			title = itemName + ":";
		} else {
			title = BundleUtil.getString(BundleUtil.ClientWin_ScorePanel_Score)
					+ ":";
		}
		score.setText(title + MetricsFormat.toFormattedMetrics(scoreValue));
		if (itemName.equals(AnalysisResult.ScoreName)) {
			score.addMouseListener(new java.awt.event.MouseAdapter() {
				@Override
				public void mouseClicked(java.awt.event.MouseEvent evt) {
					MotiveDialog motive = new MotiveDialog(frame);
					motive.setModal(true);
					motive.setVisible(true);
				}
			});
			JDependUIUtil.addClickTipEffect(score);
		}

		scorePanel.add(score);

		JLabel fullScore = new JLabel();
		fullScore.setBackground(new java.awt.Color(153, 153, 153));
		fullScore.setFont(new java.awt.Font("宋体", 0, 10));
		fullScore.setForeground(new java.awt.Color(204, 204, 204));
		if (itemName.equals(AnalysisResult.OOName)) {
			fullScore.setText(BundleUtil.getString(BundleUtil.Metrics_OO_Desc));
		} else if (itemName.equals(AnalysisResult.ScoreName)) {
			fullScore.setText(BundleUtil
					.getString(BundleUtil.ClientWin_ScorePanel_FullScore)
					+ ":"
					+ AnalysisResultScored.FullScore);
		} else if (itemName.equals(AnalysisResult.RelationRationalityName)) {
			fullScore.setText(BundleUtil
					.getString(BundleUtil.ClientWin_ScorePanel_FullScore)
					+ ":"
					+ AnalysisResultScored.RelationRationality);
		} else if (itemName.equals(AnalysisResult.DName)) {
			fullScore.setText(BundleUtil
					.getString(BundleUtil.ClientWin_ScorePanel_FullScore)
					+ ":"
					+ AnalysisResultScored.D);
		} else if (itemName.equals(AnalysisResult.BalanceName)) {
			fullScore.setText(BundleUtil
					.getString(BundleUtil.ClientWin_ScorePanel_FullScore)
					+ ":"
					+ AnalysisResultScored.Balance);
		} else if (itemName.equals(AnalysisResult.EncapsulationName)) {
			fullScore.setText(BundleUtil
					.getString(BundleUtil.ClientWin_ScorePanel_FullScore)
					+ ":"
					+ AnalysisResultScored.Encapsulation);
		}

		scorePanel.add(fullScore);

		itemPanel.add(BorderLayout.WEST, scorePanel);

		JPanel scoreScope = new JPanel();
		if (scorelist.size() > 0) {
			Collections.sort(scorelist, new ScoreByItemComparator(itemName));
			final ScoreInfo lScore = scorelist.get(0);
			final ScoreInfo hScore = scorelist.get(scorelist.size() - 1);

			scoreScope = this.createScope(lScore, hScore, itemName);
		}

		itemPanel.add(BorderLayout.EAST, scoreScope);

		itemPanel.add(BorderLayout.SOUTH, this.createAdvisePanel(itemName));

		return itemPanel;
	}

	private JComponent createScorePanel() {

		JPanel scorePanel = new JPanel(new BorderLayout());
		scorePanel.setBackground(new java.awt.Color(255, 255, 255));
		scorePanel.add(BorderLayout.NORTH,
				this.createItem(AnalysisResult.ScoreName, result.getScore()));

		JPanel otherPanel = new JPanel(new BorderLayout());
		otherPanel.setBackground(new java.awt.Color(255, 255, 255));
		JPanel descPanel = new JPanel(new GridLayout(3, 2));
		descPanel.setBackground(new java.awt.Color(255, 255, 255));
		JPanel panel = null;
		JLabel valuePanel = null;

		panel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		panel.setBackground(new java.awt.Color(255, 255, 255));
		panel.add(new JLabel(BundleUtil.getString(BundleUtil.Metrics_LC) + ":"
				+ result.getSummary().getLineCount()));
		descPanel.add(panel);

		panel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		panel.setBackground(new java.awt.Color(255, 255, 255));
		panel.add(new JLabel(BundleUtil.getString(BundleUtil.Metrics_CN) + ":"
				+ result.getSummary().getClassCount()));
		descPanel.add(panel);

		panel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		panel.setBackground(new java.awt.Color(255, 255, 255));
		panel.add(new JLabel(BundleUtil
				.getString(BundleUtil.Metrics_ComponentCount) + ":"));
		valuePanel = new JLabel("" + result.getComponents().size());
		JDependUIUtil.addClickTipEffect(valuePanel);
		valuePanel.addMouseListener(new java.awt.event.MouseAdapter() {
			public void mouseClicked(java.awt.event.MouseEvent evt) {
				frame.getResultPanel().setTab(0, 1);
			}
		});
		panel.add(valuePanel);
		descPanel.add(panel);

		panel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		panel.setBackground(new java.awt.Color(255, 255, 255));
		panel.add(new JLabel(BundleUtil
				.getString(BundleUtil.Metrics_RelationCount) + ":"));
		valuePanel = new JLabel("" + result.getRelations().size());
		JDependUIUtil.addClickTipEffect(valuePanel);
		valuePanel.addMouseListener(new java.awt.event.MouseAdapter() {
			public void mouseClicked(java.awt.event.MouseEvent evt) {
				frame.getResultPanel().setTab(1, 1);
			}
		});
		panel.add(valuePanel);
		descPanel.add(panel);

		panel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		panel.setBackground(new java.awt.Color(255, 255, 255));
		panel.add(new JLabel(BundleUtil
				.getString(BundleUtil.Metrics_RelationComponentScale)
				+ ":"
				+ result.calRelationComponentScale()));
		descPanel.add(panel);

		panel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		panel.setBackground(new java.awt.Color(255, 255, 255));
		panel.add(new JLabel(BundleUtil.getString(BundleUtil.Metrics_Capacity)
				+ ":"));
		this.capacityLabel = new JLabel();
		JDependUIUtil.addClickTipEffect(this.capacityLabel);
		this.capacityLabel.addMouseListener(new java.awt.event.MouseAdapter() {
			public void mouseClicked(java.awt.event.MouseEvent evt) {
				frame.getResultPanel().setTab(3, 1);
			}
		});
		panel.add(this.capacityLabel);
		descPanel.add(panel);

		otherPanel.add(BorderLayout.SOUTH, descPanel);

		Map<String, String> diffPackages = result.getDiffPackages();
		if (diffPackages != null && diffPackages.size() > 0) {
			JPanel tipPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
			tipPanel.setBackground(new java.awt.Color(255, 255, 255));
			tipPanel.add(new JLabel(
					BundleUtil
							.getString(BundleUtil.ClientWin_ScorePanel_PackageChangeTip)));
			JLabel tipClickLabel = new JLabel(
					BundleUtil
							.getString(BundleUtil.ClientWin_ScorePanel_PackageChangeTip_This));
			JDependUIUtil.addClickTipEffect(tipClickLabel);
			tipClickLabel.addMouseListener(new java.awt.event.MouseAdapter() {
				public void mouseClicked(java.awt.event.MouseEvent evt) {
					ChangedPackageListDialog d = new ChangedPackageListDialog(
							frame);
					d.setModal(true);
					d.setVisible(true);
				}
			});
			tipPanel.add(tipClickLabel);
			otherPanel.add(BorderLayout.NORTH, tipPanel);
		}

		JPanel contentpanel = new JPanel(new GridLayout(1, 2));
		contentpanel.add(otherPanel);
		contentpanel.add(this.createGraphScore());

		scorePanel.add(BorderLayout.CENTER, contentpanel);

		return scorePanel;
	}

	private JComponent createGraphScore() {
		GraphData graph = new GraphData();

		GraphDataItem item = null;
		Map<Object, Object> datas = null;
		item = new GraphDataItem();
		item.setTitle(BundleUtil.getString(BundleUtil.Metrics_D));
		item.setType(GraphDataItem.PIE);
		datas = new HashMap<Object, Object>();
		datas.put(BundleUtil.getString(BundleUtil.ClientWin_ScorePanel_Score),
				this.result.getD() / AnalysisResult.D);
		datas.put(BundleUtil
				.getString(BundleUtil.ClientWin_ScorePanel_ScoreDifference), 1F
				- this.result.getD() / AnalysisResult.D);
		item.setDatas(datas);
		graph.addItem(item);

		item = new GraphDataItem();
		item.setTitle(BundleUtil.getString(BundleUtil.Metrics_Balance));
		item.setType(GraphDataItem.PIE);
		datas = new HashMap<Object, Object>();
		datas.put(BundleUtil.getString(BundleUtil.ClientWin_ScorePanel_Score),
				this.result.getBalance() / AnalysisResult.Balance);
		datas.put(BundleUtil
				.getString(BundleUtil.ClientWin_ScorePanel_ScoreDifference), 1F
				- this.result.getBalance() / AnalysisResult.Balance);
		item.setDatas(datas);
		graph.addItem(item);

		item = new GraphDataItem();
		item.setTitle(BundleUtil.getString(BundleUtil.Metrics_Encapsulation));
		item.setType(GraphDataItem.PIE);
		datas = new HashMap<Object, Object>();
		datas.put(BundleUtil.getString(BundleUtil.ClientWin_ScorePanel_Score),
				this.result.getEncapsulation() / AnalysisResult.Encapsulation);
		datas.put(BundleUtil
				.getString(BundleUtil.ClientWin_ScorePanel_ScoreDifference), 1F
				- this.result.getEncapsulation() / AnalysisResult.Encapsulation);
		item.setDatas(datas);
		graph.addItem(item);

		item = new GraphDataItem();
		item.setTitle(BundleUtil
				.getString(BundleUtil.Metrics_RelationRationality));
		item.setType(GraphDataItem.PIE);
		datas = new HashMap<Object, Object>();
		datas.put(BundleUtil.getString(BundleUtil.ClientWin_ScorePanel_Score),
				this.result.getRelationRationality()
						/ AnalysisResult.RelationRationality);
		datas.put(BundleUtil
				.getString(BundleUtil.ClientWin_ScorePanel_ScoreDifference), 1F
				- this.result.getRelationRationality()
				/ AnalysisResult.RelationRationality);
		item.setDatas(datas);
		graph.addItem(item);

		JPanel contentPanel = new JPanel(new BorderLayout());
		contentPanel.setBackground(new java.awt.Color(255, 255, 255));
		try {
			GraphUtil.getInstance().setAddJScrollPane(false);
			contentPanel.add(GraphUtil.getInstance().createGraph(graph));
		} catch (JDependException e) {
			e.printStackTrace();
		}

		return contentPanel;
	}

	private JPanel createAdvisePanel(String itemName) {

		JPanel advisePanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		advisePanel.setBackground(new java.awt.Color(255, 255, 255));

		JLabel adviseLabel = null;
		JLabel descLabel = null;
		Structure structure = null;
		if (itemName.equals(AnalysisResult.ScoreName)) {
			adviseLabel = new JLabel();
			structure = new Structure();
			structure.setCategory(StructureCategory.LowScoreItemIdentifier);
			structure.setData(result);
			try {
				AdviseInfo advise = new ExpertFactory().createExpert().advise(
						structure);
				if (advise != null) {
					adviseLabel.setText(advise.getDesc()
							+ advise.getComponentNameInfo());
					advisePanel.add(adviseLabel);
				}
			} catch (JDependException e) {
				e.printStackTrace();
			}
		} else if (itemName.equals(AnalysisResult.DName)) {
			structure = new Structure();
			structure.setCategory(StructureCategory.DDomainAnalysis);
			structure.setData(result);
			try {
				AdviseInfo advise = new ExpertFactory().createExpert().advise(
						structure);
				if (advise != null) {
					descLabel = new JLabel();
					descLabel.setText(advise.getDesc());
					adviseLabel = new JLabel();
					adviseLabel.setFont(new java.awt.Font("宋体", 1, 15)); // NOI18N
					adviseLabel.setText(advise.getComponentNameInfo());
					JDependUIUtil.addClickTipEffect(adviseLabel);
					adviseLabel
							.addMouseListener(new java.awt.event.MouseAdapter() {
								public void mouseClicked(
										java.awt.event.MouseEvent evt) {
									JDependUnitDetailDialog d = new JDependUnitDetailDialog(
											((JLabel) evt.getSource())
													.getText());
									d.setModal(true);
									d.setVisible(true);
								}
							});
					advisePanel.add(adviseLabel);
					advisePanel.add(descLabel);
				}
			} catch (JDependException e) {
				e.printStackTrace();
			}
		} else if (itemName.equals(AnalysisResult.BalanceName)) {
			structure = new Structure();
			structure.setCategory(StructureCategory.CohesionDomainAnalysis);
			structure.setData(result);
			try {
				AdviseInfo advise = new ExpertFactory().createExpert().advise(
						structure);
				if (advise != null) {
					descLabel = new JLabel();
					descLabel.setText(advise.getDesc());
					adviseLabel = new JLabel();
					adviseLabel.setFont(new java.awt.Font("宋体", 1, 15)); // NOI18N
					adviseLabel.setText(advise.getComponentNameInfo());
					JDependUIUtil.addClickTipEffect(adviseLabel);
					adviseLabel
							.addMouseListener(new java.awt.event.MouseAdapter() {
								public void mouseClicked(
										java.awt.event.MouseEvent evt) {
									CohesionDialog d = new CohesionDialog(
											((JLabel) evt.getSource())
													.getText());
									d.setModal(true);
									d.setVisible(true);
								}
							});
					advisePanel.add(descLabel);
					advisePanel.add(adviseLabel);
				}
			} catch (JDependException e) {
				e.printStackTrace();
			}
		} else if (itemName.equals(AnalysisResult.EncapsulationName)) {
			structure = new Structure();
			structure
					.setCategory(StructureCategory.EncapsulationDomainAnalysis);
			structure.setData(result);
			try {
				final AdviseInfo advise = new ExpertFactory().createExpert()
						.advise(structure);
				if (advise != null) {
					descLabel = new JLabel();
					descLabel.setText(advise.getDesc());
					adviseLabel = new JLabel();
					adviseLabel.setFont(new java.awt.Font("宋体", 1, 15)); // NOI18N
					adviseLabel.setText(advise.getComponentNameInfo());
					JDependUIUtil.addClickTipEffect(adviseLabel);
					adviseLabel
							.addMouseListener(new java.awt.event.MouseAdapter() {
								public void mouseClicked(
										java.awt.event.MouseEvent evt) {
									jdepend.model.Component component = JDependUnitMgr
											.getInstance()
											.getTheComponent(
													advise.getComponentNameInfo());
									ClassListDialog d = new ClassListDialog(
											component);
									d.setModal(true);
									d.setVisible(true);
								}
							});
					advisePanel.add(descLabel);
					advisePanel.add(adviseLabel);
				}
			} catch (JDependException e) {
				e.printStackTrace();
			}
		} else if (itemName.equals(AnalysisResult.RelationRationalityName)) {
			Float rs = result.getAttentionRelationScale();
			adviseLabel = new JLabel();
			if (MathUtil.isZero(rs)) {
				adviseLabel
						.setText(BundleUtil
								.getString(BundleUtil.ClientWin_ScorePanel_RelationNormal));
			} else {
				adviseLabel.setText(BundleUtil
						.getString(BundleUtil.Metrics_AttentionRelationScale)
						+ ":" + MetricsFormat.toFormattedPercent(rs));
				JDependUIUtil.addClickTipEffect(adviseLabel);
				adviseLabel.addMouseListener(new java.awt.event.MouseAdapter() {
					public void mouseClicked(java.awt.event.MouseEvent evt) {
						frame.getResultPanel().setTab(1, 0);
					}
				});
			}
			advisePanel.add(adviseLabel);
		}

		return advisePanel;

	}

	private JPanel createScope(ScoreInfo lScoreInfo, ScoreInfo hScoreInfo,
			String itemName) {
		Float lScore = null;
		String lScoreId;
		Float hScore = null;
		String hScoreId;

		lScoreId = lScoreInfo.id;
		hScoreId = hScoreInfo.id;
		if (itemName.equals(AnalysisResult.ScoreName)) {
			lScore = lScoreInfo.score;
			hScore = hScoreInfo.score;
		} else if (itemName.equals(AnalysisResult.DName)) {
			lScore = lScoreInfo.d;
			hScore = hScoreInfo.d;
		} else if (itemName.equals(AnalysisResult.BalanceName)) {
			lScore = lScoreInfo.balance;
			hScore = hScoreInfo.balance;
		} else if (itemName.equals(AnalysisResult.EncapsulationName)) {
			lScore = lScoreInfo.encapsulation;
			hScore = hScoreInfo.encapsulation;
		} else if (itemName.equals(AnalysisResult.RelationRationalityName)) {
			lScore = lScoreInfo.relation;
			hScore = hScoreInfo.relation;
		} else if (itemName.equals(AnalysisResult.OOName)) {
			lScore = lScoreInfo.oo;
			hScore = hScoreInfo.oo;
		}

		return this.createScope(lScore, lScoreId, hScore, hScoreId);
	}

	private JPanel createScope(final Float lScore, final String lScoreId,
			final Float hScore, final String hScoreId) {
		JPanel scoreScope = new JPanel();
		FlowLayout flowLayout = new FlowLayout();
		flowLayout.setAlignment(FlowLayout.RIGHT);
		scoreScope.setLayout(flowLayout);
		scoreScope.setBackground(new java.awt.Color(255, 255, 255));
		JLabel scopeTitle = new JLabel(
				BundleUtil
						.getString(BundleUtil.ClientWin_ScorePanel_ExistingScoreScope)
						+ ":");
		scopeTitle.setForeground(new java.awt.Color(204, 204, 204));
		scoreScope.add(scopeTitle);
		JLabel lScoreJLablel = new JLabel(String.valueOf(lScore));
		lScoreJLablel.setForeground(new java.awt.Color(204, 204, 204));
		lScoreJLablel
				.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
		scoreScope.add(lScoreJLablel);
		lScoreJLablel.addMouseListener(new java.awt.event.MouseAdapter() {
			public void mouseClicked(java.awt.event.MouseEvent evt) {
				try {
					scoreScopeMouseClicked(lScoreId);
				} catch (JDependException e) {
					frame.getResultPanel().showError(e);
				}
			}
		});
		JLabel interval = new JLabel("~");
		interval.setForeground(new java.awt.Color(204, 204, 204));
		scoreScope.add(interval);
		JLabel hScoreJLablel = new JLabel(String.valueOf(hScore));
		hScoreJLablel.setForeground(new java.awt.Color(204, 204, 204));
		hScoreJLablel
				.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
		hScoreJLablel.addMouseListener(new java.awt.event.MouseAdapter() {
			public void mouseClicked(java.awt.event.MouseEvent evt) {
				try {
					scoreScopeMouseClicked(hScoreId);
				} catch (JDependException e) {
					frame.getResultPanel().showError(e);
				}
			}
		});
		scoreScope.add(hScoreJLablel);

		return scoreScope;
	}

	private void scoreScopeMouseClicked(String id) throws JDependException {
		AnalysisResult result = ScoreRepository.getTheResult(id);
		String group = result.getRunningContext().getGroup();
		String command = result.getRunningContext().getCommand();
		if (!CommandAdapterMgr.getCurrentGroup().equals(group)
				|| !CommandAdapterMgr.getCurrentCommand().equals(command)) {
			JDependUnitMgr.getInstance().setResult(result);
			CommandAdapterMgr.setCurrentGroup(group);
			CommandAdapterMgr.setCurrentCommand(command);
			frame.getResultPanel().showResults();
		}
	}

	@Override
	public void onCreated(Capacity capacity) {
		this.capacityLabel.setText("" + capacity.getLevel());

	}
}
