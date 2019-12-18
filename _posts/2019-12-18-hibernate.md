---
layout:     post
title:      Hibernate
subtitle:   orm框架
date:       2019-12-18
author:     极客小祥
header-img: img/text/JAVA.jpg
catalog: true
tags: 
    - JAVA
---

# Hibernate

#### 1、基础配置

* 添加**jar包**

    ```xml
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>5.4.9.Final</version>
    </dependency>

    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.38</version>
    </dependency>
    ```

* 创建java项目，添加**hibernate配置**

![项目设置.png](/项目设置.png)
![选择Hibernate.png](/选择Hibernate.png)
![创建.png](/创建.png)

#### 2、配置hibernate.cfg.xml

```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
    "-//Hibernate/Hibernate Configuration DTD//EN"
    "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
  <session-factory>
    <!--数据库方言配置，hibernate做sql语句生成，
    这里使用的是Mysql5.7版本就设置的是MySQL57Dialect-->
    <property name="hibernate.dialect">org.hibernate.dialect.MySQL57Dialect</property>
    <property name="connection.url">jdbc:mysql://localhost:3306/hibernate</property>
    <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
    <property name="connection.username">root</property>
    <property name="connection.password">root</property>
    <!-- 是否打印执行的sql，在控制台输出 -->
    <property name="show_sql">true</property>
    <!-- 是否格式化显示sql语句 -->
    <property name="format_sql">true</property>
  </session-factory>
</hibernate-configuration>
```

#### 3、生成实体类和配置

![创建相关.png](/创建相关.png)
![生成实体类.png](/生成实体类.png)

#### 4、hbm.xml配置

* 修改映射文件的**id生成策略**
    1. **identity**：自增
    2. **uuid**：自动生成uuid
    3. **native**：根据字段属性，**自动选择自增或者生成uuid**
    4. **assigned**：开发人员自己维护，**不自动生成**

```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-mapping PUBLIC
    "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping>
    <class name="io.jtxyh.entity.Uinfo" table="cinfo" schema="mybatis">
        <id name="uid" column="uid">
            <!-- 根据字段属性，自动选择 -->
            <generator class="native"></generator>
        </id>
        <property name="uname" column="uname"/>
    </class>
</hibernate-mapping>
```

# 使用

#### 1、查询

```java
// 获取sqlSessionFactory对象
SessionFactory sq = HibernateUtil.getSessionFactory();
// 获取session对象
session = sq.opernSession();

/**
* 查询所有信息
*/
//Sysuser不是表名，是实体类的名称(严格大小写)
String hql = "from Uinfo";
// 创建查询
Query query = session.createQuery(hql);
// 返回多条记录使用list()
List<Sysuser> list = query.list();

/**
* 条件查询
*/
String hql = "from Uinfo uname:un order by uid";
Query query = session.createQuery(hql);
// 对cd进行赋值查询
query.setParameter("un","111");
// 获取单条记录使用getSingleResult()
Sysuser y = (Sysuser)query.getSingleResult();

/**
* 查询部分字段
*/
String hql = "select uname,uphone from Uinfo order by uid";
// 或者使用这个
// String hql = "select new Uinfo (uname,uphone) from Uinfo where uid = :uid order by uid";
Query query = session.createQuery(hql);
List<Object[]> list = query.list();


/**
* 查询结果封装为map
*/
String hql = "select new map (uname,uphone) from Uinfo where uid = :uid order by uid";
Query query = session.createQuery(hql);
query.setParameter("uid",24);
Map<String,Object> result = (Map<String,Object>)query.getSingleResult();


/**
* 多表连接查询
*/
// 根据id查询用户，并查询角色
// 左外链接:返回的是对象数组
// 迫切左外连接 fetch:返回是单个对象，持有另外一个对象。两个对象之间做了关联
// 需要在实体类中创建一个为连接查询信息的字段
String hql = "from Cinfo r left join fetch r.uinfo where r.rid=:rid";
// 或者
// String hql = "select u from Uinfo u left join u.cinfo where u.uid=:uid";
Query query = session.createQuery(hql);
query.setParameter("uid",24);
Sysuser result = (Sysuser)query.getSingleResult();

session.close();
// 关闭sqlSessionFactory对象
sq.close()
```

#### 2、添加

```java
// 获取sqlSessionFactory对象
SessionFactory sq = HibernateUtil.getSessionFactory();
// 获取session对象
session = sq.opernSession();

// 开启事务
Transaction transaction = session.beginTransaction();
Uinfo u = new Uinfo();
u.setUname("123");
u.setUpwd("123");
//保存对象到数据库表
session.save(u);
// 提交事务
transaction.commit();

session.close();
// 关闭sqlSessionFactory对象
sq.close()
```

#### 3、修改

```java
// 获取sqlSessionFactory对象
SessionFactory sq = HibernateUtil.getSessionFactory();
// 获取session对象
session = sq.opernSession();

// 开启事务
Transaction transaction = session.beginTransaction();
Uinfo u = new Uinfo();
u.setUname("123修改");
u.setUpwd("123修改");
//修改对象
session.update(u);
// 提交事务
transaction.commit();

session.close();
// 关闭sqlSessionFactory对象
sq.close()
```

#### 4、删除

```java
// 获取sqlSessionFactory对象
SessionFactory sq = HibernateUtil.getSessionFactory();
// 获取session对象
session = sq.opernSession();

// 开启事务
Transaction transaction = session.beginTransaction();
Uinfo u = new Uinfo();
u.setUid("1001");
//删除对象
session.delete(u);
// 提交事务
transaction.commit();

session.close();
// 关闭sqlSessionFactory对象
sq.close()
```