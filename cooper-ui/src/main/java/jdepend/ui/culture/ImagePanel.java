package jdepend.ui.culture;

import java.awt.Graphics;
import java.awt.GridBagLayout;
import java.awt.Image;

import javax.swing.JPanel;

import jdepend.framework.ui.JDependUIUtil;

public class ImagePanel extends JPanel {

	public ImagePanel() {

		this.setLayout(new GridBagLayout());
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		Image backgroundImage = JDependUIUtil.getImage("mascot.jpg");
		int width = this.getWidth();
		int height = this.getHeight();
		// int imageWidth = backgroundImage.getWidth(this);
		// int imageHeight = backgroundImage.getHeight(this);
		g.drawImage(backgroundImage, 0, 0, width, height, this);
	}
}
