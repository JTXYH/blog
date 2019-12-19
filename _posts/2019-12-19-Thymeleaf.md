---
layout:     post
title:      Thymeleaf
subtitle:   Java服务器端的模板引擎
date: 2019-12-19
author:     极客小祥
header-img: img/text/JAVA.jpg
catalog: true
tags: 
-JAVA
---

# Thymeleaf
* 简介：Thymeleaf是一个Java服务器端的模板引擎，Thymeleaf的主要目标让开发者已更优雅的方式使用模板引擎，**Thymeleaf以html的形式存在**，它可以在服务器中运行也可以**作为独立的静态页面运行**，这样让前端开发和后端开发能够更加快速的协作。同时它可以**与Spring框架进行集成**，同时它也完美**兼容目前的HTML5**特性

#### 1、spring-boot中使用
1. 加依赖

```xml
<!--添加thymeleaf模板引擎-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

2. 在**html标签头内**加上：**xmlns:th="http://www.thymeleaf.org"**
3. 因为**thymeleaf会在内存中留下缓存**，所以在spring-boot项目开发阶段需要将缓存**暂时关闭**，在**application.properties**中设置**spring.thymeleaf.cache=false**关闭thymeleaf缓存

#### 2、语法
* **表达式**：
    * **属性表达式**：**$\{key或session.key或#session.getAttribute\(key\)或#servletContext.getAttribute\('key'\)\}**
    * **链接表达式**：**@\{\}**,解决了项目根路径的问题，自动补全项目根路径
    * 文档表达式：**~\{页面 :: 片段名称\}**
    * 选择表达式：***\{\}**
* **属性**：
    * **th:text**：用在双标签的属性中，作用是替换标签之间的文本。结合**属性表达式**$\{\}使用。可以通过\[\[$\{\}\]\]取代**th:text**

        ```html
        <!--获取model中的数据直接使用 名字 获取-->
        <p th:text="${m}"></p>
        <p>[[${m}]]</p>

        <hr>

        <!--获取session中的数据使用session.名字获取-->
        <p th:text="${session.s}"></p>
        <p>[[${session.s}]]</p>
        <hr>

        <!--获取servletContext中的数据，使用#servletContext.getAttribute('名字')获取-->
        <p th:text="${#servletContext.getAttribute('sc')}"></p>
        <p>[[${#servletContext.getAttribute('sc')}]]</p>
        <hr>
        ```

    * **th:href**：结合**链接表达式**使用，自动补全项目根路径

        ```html
        <!--通过@{/路径}可以去另一个页面，自动拼接上项目根路径，后面的href会被前面的覆盖-->
        <p><a th:href="@{/uinfo/test1}" href="test1.html">去test1页面</a></p>
        ```

    * **th:src**：结合**链接表达式**使用，自动补全项目根路径

        ```html
        <img th:src="@{/test.png}">
        ```

    * **th:action**：结合**链接表达式**使用，自动**补全项目根路径**
        ```html
        <!-- 传递参数在后面拼上(参数名=值,参数名=值)，如果是动态的值使用${}获取 -->
        <form th:action="@{/user/boot(a=1,b=2,c=${v})}"></form>
        ```

    * **th:replace**：**页面嵌套,替换掉原标签**。可以结合**文档表达式**与th:fragment属性达到局部页面嵌套的目的
    * th:insert：**页面嵌套，保留了原页面标签**

        ```html
        <!--
        使用 ~{页面名字} 引入其他页面到这个页面中
        使用replace会替换掉本页面的div
        使用insert不会会保留本页面的div
        -->
        <div th:replace="~{top}"></div>
        <div th:insert="~{top}"></div>
        ```

    * th:fragment：结合**文档表达式**使用，用来实现局部页面嵌套

        ```html
        <!-- 在需要嵌套的页面设置 -->
        <div th:fragment="topdiv">顶部页面</div>
        <div th:fragment="footdiv">底部页面</div>

        <!-- 需要引入的页面 -->
        <div th:replace="~{top :: topdiv}"></div>
        <div th:replace="~{top :: footdiv}"></div>
        ```

    * th:object：结合**选择表达式**使用。**声明局部对象**，选择表达式取得对象中属性值

        ```html
        <span th:object="${u}">
            <p th:text="*{uid}"></p>
            <p th:text="*{uname}"></p>
        </span>
        ```

    * th:each：结合**属性表达式**使用，遍历集合数据

        ```html
        <tbody>
            <!--遍历List集合获取值，i.count是索引从1开始计算-->
            <tr th:each="u,i : ${uinfoList}">
                <td th:text="${i.count}"></td>
                <td th:text="${u.uid}">uid</td>
                <td th:text="${u.uname}">uname</td>
            </tr>
        </tbody>
        ```

    * th:if：结合**属性表达式**使用，判断数据是否满足条件
