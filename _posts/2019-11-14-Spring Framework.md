---
layout:     post                    
title:      Spring Framework
subtitle:   Java框架               
date:       2019-11-14               
author:     极客小祥                      
header-img: img/text/JAVA.jpg   
catalog: true                        
tags: 
    - JAVA
---

# Spring
#### 1、基础
* 概述：Spring是一个**开源的控制反转(Inversion of Control ,IoC)和面向切面(AOP)的容器框架**.帮助开发人员分离组件之间的依赖关系，它的主要目的是**简化企业开发**。
* **CORE**需要的jar包
![springJAR.png](https://i.loli.net/2019/11/14/ZFob81MXU9gt2rC.png)
* **使用步骤**：
    1. 导入相关**jar包**
    2. 创建spring的xml配置文件，配置**bean标签或者包扫描和相关注解**
    3. 使用**ClassPathXMLApplicationContext**加载xml文件，**初始化spring容器**
    4. 从容器中**获取对象**

    ```xml
    "xml配置文件"

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <bean id="myUserDao" class="io.jtxyh.dao.impl.UserDaoImpl"></bean>

    <bean id="myUserService" class="io.jtxyh.service.impl.UserServiceImpl">
        成员变量字符串赋值
        <property name="str" value="永远相信美好的事情即将发生"></property> 
        为成员变量对象赋值
        <property name="usDao" ref="myUserDao"></property>
	</bean>

    </beans>
    ```

    ```java
    "java代码"
    public static void main(String[] args) {
		初始化容器的时候就默认执行了对象的无参构造new了，bean对象已经创建了，是单例的
		ApplicationContext s = new ClassPathXmlApplicationContext("applicationContext.xml");

		1、按照名称查找bean对象
		UserServiceImpl myUserService = s.getBean("myUserService",UserServiceImpl.class);

		2、按照类型查找bean对象
		UserService myUserService2 = s.getBean(UserService.class);

		调用方法
		myUserService.getUser();
		myUserService2.getUser();
	}
    ```

* **生命周期**：**默认单例**，容器**初始化即创建bean**，在bean标签中设置**scope="prototype" 更改默认状态，改为多例**，容器**初始化不创建**，每个**getBean创建新的bean**

#### 2、IOC控制反转
* 使用第三方组件容器，使应用本身不在依赖于**对象的创建于维护**，交给第三方容器来**创建与维护**
* **实现方式**：：
    1. 通过在xml文件中配置**bean对象**
        * **id属性**：给bean设置一个**名字**
        * **class属性**：使用的对象的**位置**
        * **init-method属性**：**初始化**时执行的方法
        * **destory-method属性**：**销毁**时执行的方法
    2. 通过在xml文件中实现**包扫描的方式配合注解使用**
        * **base-package属性**：扫描的**位置**
        * **@Controller**：标注**控制层**组件
        * **@Service**：标注**业务层**组件
	    * **@Repository**：标注数据**访问组件，即DAO组件**
	    * **@Component**：组件，当组件**不好归类的时候，我们可以使用这个注解**进行标注
	    * **@Autowired**：**成员变量或set方法上**。
	    * **@Resource**：**成员变量或set方法上**
	    * **@Scope**：指定**scope作用域的（用在类上）**
	    * **@PostConstruct**：指定**初始化方法（用在方法上）**
	    * **@PreDestory**：指定**销毁方法（用在方法上）**

    ```xml
    "bean对象方式"
    <bean id="myUserDao" class="io.jtxyh.dao.impl.UserDaoImpl"></bean>

    "包扫描方式"
    <context:component-scan base-package="io.jtxyh"></context:component-scan>
    ```

#### 3、DI注入
1. **set注入**：通过bean标签的中的**property**实现
    * **name属性**：bean指代对象中**变量的属性名**
    * **value属性**：传入的值\(当值为**基本数据类型和引用数据类型**时使用\)
    * **ref属性**：当值为**对象**时使用

    ```xml
    <bean id="myUserDao" class="io.jtxyh.dao.impl.UserDaoImpl"></bean>
	
	<bean id="myUserService" class="io.jtxyh.service.impl.UserServiceImpl">
		成员变量字符串赋值
		 <property name="str" value="永远相信美好的事情即将发生"></property> 
		为成员变量对象赋值
		<property name="usDao" ref="myUserDao"></property>
	</bean>
    ```

2. **构造器注入**：通过**constructor-arg**包扫描方式实现，**属性同property**

    ```xml
    <bean id="myUserDao" class="io.jtxyh.dao.impl.UserDaoImpl"></bean>

	<bean id="myUserService2" class="io.jtxyh.service.impl.UserServiceImpl">
		使用constructor-arg为成员变量对象赋值
        <constructor-arg name="usDao" ref="myUserDao"></constructor-arg>
		<constructor-arg name="str" value="永远相信美好的事情即将发生"></constructor-arg>
	</bean>
    ```

3. **自动装配**：通过**包扫描方式和注解实现**

    ```xml
    扫描io.jtxyh下所有有注解的类
    <context:component-scan base-package="io.jtxyh"></context:component-scan>
    ```

    ```java
    自动装配，配合包扫描使用，UseDao是一个对象
	@Autowired
	private UseDao usDao;

    在UseDao实现类上配置
    @Repository
    public class UserDaoImpl implements UseDao{

    }
    ```

4. **集合注入**：使用**property中的相关标签**
    * **list**：注入**List集合**
        * **value**：中间填写list的值
    * **array**：注入**Array数组**
        * **value**：中间填写array的值
    * **map**：注入**Map集合**
        * **entry**：有**属性key和value**，分别填写map的键和值

    ```xml
    <property name="myList">
    <list>
        <value>list值1</value>
        <value>list值2</value>
        <value>list值3</value>
    </list>
    </property>
    <property name="myArray">
        <array>
            <value>Array值1</value>
            <value>Array值2</value>
            <value>Array值3</value>
        </array>
    </property>
    <property name="myMap">
        <map>
            <entry key="1" value="Map值1"></entry>
            <entry key="2" value="Map值2"></entry>
            <entry key="3" value="Map值3"></entry>
        </map>
    </property>
    ```

5. **内部bean注入**：使用**constructor-arg**时使用

    ```xml
    <bean id="myUserService2" class="io.jtxyh.service.impl.UserServiceImpl">
		<constructor-arg name="usDao">
            内部bean注入
			<bean class="io.jtxyh.dao.impl.UserDaoImpl"></bean>
		</constructor-arg>
		<constructor-arg name="str" value="永远相信美好的事情即将发生"></constructor-arg>
	</bean>
    ```