---
layout:     post                    
title:      Cookie和Session                    
subtitle:   会话技术               
date:       2019-10-22               
author:     极客小祥                      
header-img: img/text/WEB.jpg   
catalog: true                        
tags:                                
    - WEB
---

# 会话技术
* 会话：**一次会话中包含多次请求和响应**
    * **一次会话**：浏览器第一次给服务器资源发送请求，会话建立，直到一方断开为止
* 功能：在一次会话范围内的多次请求间**共享数据**
* 方式：
    1. **客户端**会话技术：**Cookie**
    2. **服务端**会话技术：**Session**

# Cookie
* 概念：**客户端**会话技术，将数据保存在客户端
#### 1、使用：
1. **创建Cookie**，绑定数据
    * **new Cookie\(String name, String value\)**
2. **发送Cookie对象**
    * **response.addCookie\(Cookie cookie\)**
3. **获取Cookie**，拿到数据
    * Cookie\[\] **request.getCookies\(\)**

#### 2、实现原理
基于**响应头set-cookie和请求头cookie实现**

#### 3、cookie细节
* 一次可以发送多个cookie
* **保存时间**
    1. 默认情况下，当**关闭浏览器时cookie将被清除**
    2. 设置持久化存储：
        * **serMaxAge\(int seconds\)**
            1. **正数**：持久化存储，cookie的存活时间，秒数
            2. **负数**：默认值
            3. **零**：删除cookie信息
* **Tomcat8**之后支持中文存储
* **cookie共享问题**：
    * 默认情况下cookie**不能共享给其他web项目**
        * **setPath\(String path\)**：设置cookie的获取范围，默认情况下，设置当前虚拟目录
        * 如果要共享则将path设置为**/**
    * 不同的tomcat服务器之间cookie共享
        * **setDomain\(String path\)**：设置**一级域名相同**，那么多个服务器之间的cookie可以共享
            * *setDomain\(.baidu.com\)，这样设置后tieba.baidu.com和news.baidu.com中cookie可以共享*

#### 4、cookie特点和作用
* **特点**
    1. cookie**存储数据在客户端浏览器**
    2. 浏览器对于单个cookie的大小有限制，以及对同一个域名下的总的cookie数量也有限制\(20个\)
* **作用**：
    1. cookie一般用于**存储少量的不太敏感的数据**
    2. 在**不登录的情况下**，完成服务器对客户端的识别