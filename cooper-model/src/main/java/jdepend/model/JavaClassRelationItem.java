package jdepend.model;

import java.io.IOException;
import java.io.Serializable;

/**
 * 两个JavaClass之间的关联项信息
 * 
 * @author <b>Abner</b>
 * 
 */
public class JavaClassRelationItem implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6332298811666212021L;

	public static final String CA_DIRECTION = "CA";

	public static final String CE_DIRECTION = "CE";

	private transient JavaClass depend = null;// 关联的javaclass

	private transient JavaClass current = null;// 当前javaClass

	private String dependJavaClass = null;// 序列化和反序列化时使用

	private String currentJavaClass = null;// 序列化和反序列化时使用

	private JavaClassRelationType type = null;// 关联类型

	private String direction = null;// 关联方向

	/**
	 * 得到该关联项关联强度
	 * 
	 * @return
	 */
	public float calRelationIntensity() {
		// 计算耦合
		float intensity = this.type.getIntensity();
		float rationality = this.type.getRationality(this.depend, this.current, this.direction);

		return intensity * rationality;
	}

	public boolean isInner() {
		return this.current.getComponent().equals(this.depend.getComponent());
	}

	public JavaClass getDepend() {
		return depend;
	}

	public void setDepend(JavaClass depend) {
		this.depend = depend;
	}

	public JavaClassRelationType getType() {
		return type;
	}

	public String getDependJavaClass() {
		return dependJavaClass;
	}

	public String getCurrentJavaClass() {
		return currentJavaClass;
	}

	public void setType(JavaClassRelationType type) {
		this.type = type;
	}

	public JavaClass getCurrent() {
		return current;
	}

	public void setCurrent(JavaClass current) {
		this.current = current;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public void setDependJavaClass(String dependJavaClass) {
		this.dependJavaClass = dependJavaClass;
	}

	public void setCurrentJavaClass(String currentJavaClass) {
		this.currentJavaClass = currentJavaClass;
	}

	private void writeObject(java.io.ObjectOutputStream out) throws IOException {
		if (this.depend != null) {
			this.dependJavaClass = this.depend.getName();
		}
		if (this.current != null) {
			this.currentJavaClass = this.current.getName();
		}
		out.defaultWriteObject();// 先序列化对象
	}

	@Override
	public String toString() {
		return "JavaClassRelationItem [current=" + current.getName() + ", depend=" + depend.getName() + ", direction="
				+ direction + ", type=" + type + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((current == null) ? currentJavaClass.hashCode() : current.hashCode());
		result = prime * result + ((depend == null) ? dependJavaClass.hashCode() : depend.hashCode());
		result = prime * result + ((direction == null) ? 0 : direction.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		JavaClassRelationItem other = (JavaClassRelationItem) obj;
		if (currentJavaClass == null) {
			if (other.currentJavaClass != null)
				return false;
		} else if (!currentJavaClass.equals(other.currentJavaClass))
			return false;
		if (dependJavaClass == null) {
			if (other.dependJavaClass != null)
				return false;
		} else if (!dependJavaClass.equals(other.dependJavaClass))
			return false;
		if (current == null) {
			if (other.current != null)
				return false;
		} else if (!current.equals(other.current))
			return false;
		if (depend == null) {
			if (other.depend != null)
				return false;
		} else if (!depend.equals(other.depend))
			return false;
		if (direction == null) {
			if (other.direction != null)
				return false;
		} else if (!direction.equals(other.direction))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		return true;
	}
}
