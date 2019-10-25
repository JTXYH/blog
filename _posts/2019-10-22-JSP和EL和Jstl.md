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

#### 3、指令
* 作用：用于配置JSP页面，导入资源文件
* 格式：**\<%@ 指令名称 属性名1=属性值1 属性名2=属性值2 ...%\>**
* 分类：
    1. **page**：配置JSP页面
        * **contentType**：等同于**response.setContentType\(\)**
            1. 设置字符编码
        * **import**：导包
        * **errorPage**：当前页面发生异常后，会**自动跳转到指定的错误页面**
        * **isErrorPage**：标识当前页是否是错误页面
            * **true**：是，可以使用内置对象exception
            * **false**：不是，不能使用exception
    2. **include**：导入**其他页面资源文件**
    3. **taglib**：导入**标签库**

#### 4、注释
1. html注释：**\<\!----\>**
2. jsp注释：**\<%----%\>**

#### 5、JSP内置对象

变量名			|		     真实类型			|			  作用           |
 ---            |             ---               |             ---              |
* **pageContext**	|			PageContext			|		当前页面共享数据，还可以获取其他八个内置对象    |
* **request**		|			HttpServletRequest	|		一次请求访问的多个资源(转发)                  |
* **session**		|			HttpSession			|		一次会话的多个请求间                         |
* **application**	|			ServletContext		|		所有用户间共享数据                           |
* **response**		|			HttpServletResponse	|		响应对象                                    |
* **page**			|			Object				|		当前页面(Servlet)的对象  this                |
* **out**			|			JspWriter			|		输出对象，数据输出到页面上                    |
* **config**		|			ServletConfig		|		Servlet的配置对象                           |
* **exception**		|			Throwable			|		                                            |

1. **request**：**请求**对象
2. **response**：**响应**对象
3. **out**：**字符输出流对象**，可以将数据输出到页面上
    * **response.getWriter\(\)和out.writer\(\)的区别**
        * 在Tomcat服务器真正给客户端做出响应之前，会**先找到response缓冲区**数据，**再找out缓冲区**数据。
        * response.getWriter\(\)数据**输出**永远在out.writer\(\)**之前**
4. **pageContext**：
5. **session**：
6. **application**：
7. **page**：
8. **out**：
9. **config**：
10. **exception**：