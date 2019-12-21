---
layout:     post
title:      Spring-Boot
subtitle:   JAVA企业级框架
date:       2019-12-21
author:     极客小祥
header-img: img/text/JAVA.jpg
catalog: true
tags: 
    - JAVA
---

# 简介

#### 1、简单介绍
1. springBoot按照**开发习惯**对原来的xml配置提供了**预配置**，开发人员使用springBoot框架，**不用再手工配置xml**
2. springBoot按**包依赖习惯**，提供了各个常用模块的**依赖启动器starter**，
    * 官方提供的启动器如：**spring-boot-starter-\***
    * 第三方的启动器如：**\*-spring-boot-starter**
    * 比如**web模块，test模块，mybaits模块，redis模板**...

#### 2、项目结构说明
* src/main/**java/*Application**：**启动类，主类**
* src/main/**resources/static**：**静态资源**路径\(css/js/图片/视频。。。纯静态资源\)
* src/main/**resources/templates**：**视图模板**文件。\(html加**thymeleaf模板引擎**\)
* src/main/**resources/application.properties**：**项目核心配置文件**。改默认配置的地方

#### 3、pom.xml
* **父工程**：项目有**两个父工程**，管理了**jdk版本**，管理了**maven的resources配置**，管理了**常用依赖的版本**.
* **jdk版本**：重写父工程的**java.version.重新制定jdk版本**
* **dependency依赖**：配置启动器依赖。
* **spring-boot-maven-plugin打包插件**：打jar包的插件,**配置启动类位置**