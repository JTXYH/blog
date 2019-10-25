---
layout:     post                    
title:      JSP和EL和Jstl                    
subtitle:   Java服务器端页面               
date:       2019-10-22               
author:     极客小祥                      
header-img: img/text/WEB.jpg   
catalog: true                        
tags:                                
    - WEB
---

# JSP
* 概念：一个特殊的页面，**既可以写html标签，也可以写Java代码**

#### 1、原理
* JSP本质上就是一个**Servlet**

#### 2、JSP定义Java方式
1. **\<%代码%\>**：定义代码在**service方法**中，可以写service方法中所有的语法
2. **\<%! 代码%\>**：定义的代码在jsp转换后的**java0类**中，用来定义**成员变量和成员方法**
3. **\<%= 代码%\>**：定义的代码会**输出到页面上**

#### 3、JSP内置对象
1. **request**：**请求**对象
2. **response**：**响应**对象
3. **out**：**字符输出流对象**，可以将数据输出到页面上
    * **response.getWriter\(\)和out.writer\(\)的区别**
        * 在Tomcat服务器真正给客户端做出响应之前，会**先找到response缓冲区**数据，**再找out缓冲区**数据。
        * response.getWriter\(\)数据**输出**永远在out.writer\(\)**之前**
