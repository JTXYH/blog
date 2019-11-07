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

#### 5、js手动清除cookie

```javascript
var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
if(keys) {
    for(var i = keys.length; i--;){						
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}
```


# Session
* 概念：**服务器端会话技术**，在**一次会话**的**多次请求**间共享数据，将数据**保存在服务器端**的对象中

#### 1、基本方法
1. Object **getAttribute\(String name\)**：**获取**session对象
2. void **setAttribute\(String name,Objecr value\)**：**设置**session对象
3. void **removeAttribute\(String name\)**：**移除**session对象

```java
HttpSession se = request.getSession();
se.setSession("name","张三");
se.getSession("name");
se.removeSession("name")
```

#### 2、原理
* Session的实现是**依赖于Cookie的**

#### 3、特点
1. 当**客户端关闭后，服务器不关闭**，两次获取的session默认**不是同一个**
    * 如果需要相同，则创建一个Cookie，键设置为**JSESSIONID**，设置最大存活时间，让cookie持久化保存

    ```java
    Cookie c = new Cookie("JSESSIONID",session.getId()); // 设置一个Cookie
    c.setMaxAge(60*60); // 设置最大存活时间
    response.addCookie(c);
    ```
2. 当**客户端不关闭，服务器关闭后**，两次获取的session**不是同一个**
    * session的**钝化**：在服务器正常关闭之前，将session对象序列化到硬盘上
    * session的**活化**：在服务器启动后，将session文件转化为内存中的session对象
#### 4、session的销毁
1. 服务器关闭
2. session对象调用**invalidate\(\)**
3. session默认失效时间：**30分钟**
    * **修改默认失效时间**：目录**tomcat/conf/web.xml里**

        ```xml
        <session-config>
            <session-timeout>30</session-timeout>
            </session-config>
            ```

4. session用于**存储一次会话的多次请求的数据**，存在服务器
5. session可以**存储任意类型，任意大小的数据**
6. session与Cookie区别：
    * session存在**服务器**，cookie存在**客户端**
    * session**没有**数据大小限制，cookie**有**
    * session数据**安全**，cookie相对**不安全**
7. java中**手动清除session**

    ```java
    request.getSession().invalidate();
    ```