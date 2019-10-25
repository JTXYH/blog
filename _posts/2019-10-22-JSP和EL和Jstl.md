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
**pageContext**	|			PageContext			|		当前页面共享数据，还可以获取其他八个内置对象    |
**request**		|			HttpServletRequest	|		一次请求访问的多个资源(转发)                  |
**session**		|			HttpSession			|		一次会话的多个请求间                         |
**application**	|			ServletContext		|		所有用户间共享数据                           |
**response**	|		    HttpServletResponse	|		响应对象                                 |
**page**		|		    Object				|		当前页面(Servlet)的对象  this             |
**out**			|			JspWriter			|		输出对象，数据输出到页面上                    |
**config**		|			ServletConfig		|		Servlet的配置对象                           |
**exception**	|		    Throwable		    |		异常对象                                     |

* **response.getWriter\(\)和out.writer\(\)的区别**
    * 在Tomcat服务器真正给客户端做出响应之前，会**先找到response缓冲区**数据，**再找out缓冲区**数据。
    * response.getWriter\(\)数据**输出**永远在out.writer\(\)**之前**

# EL表达式
* 概念：Ecpression Language表达式语言
* 作用：**替换和简化jsp页面中java代码的编写**
* 语法：**$\{表达式\}**
* 注意：
    1. JSP默认支持EL表达式，如果要忽略EL表达式
        * 设置jsp中的page中：**isELIgnored="true"**，忽略当前页面的EL表达式
        * **\$\{表达式\}**，忽略当前这个EL表达式

#### 1、运算符
1. 算数运算符： **+ - * /\(div\) %\(mod\)**
2. 比较运算符： **> < >= <= == !=**
3. 逻辑运算符： **&&\(and\) ||\(or\) !\(not\)**
4. 空运算符： **empty**
    * 功能：**用于判断字符串、集合、数组对象是否为null或者长度是否为0**
    * **$\{empty list\}**:判断字符串、集合、数组对象**是否为null或者长度为0**
    * **$\{not empty str\}**:表示判断字符串、集合、数组对象是否**不为null并且长度>0**

#### 2、获取值
* el表达式只能从域对象中获取值
* 语法：
    * **$\{域名称.键名\}**：从指定域中获取指定键的值
        * 域名称：
            1. **pageScope**		-->    pageContext
            2. **requestScope** 	-->    request
            3. **sessionScope** 	-->    session
            4. **applicationScope** -->    application（ServletContext）
    * **$\{键名\}**：表示依次从最小的域中去查找是否有该键对应的值，直到找到为止
* 获取**对象、List集合、Map集合**
    1. 对象：**$\{域名称.键名.属性名\}**
        * 本质上会去调用对象的**getter方法**
    2. List集合：**$\{域名称.键名\[索引\]\}**
    3. Map集合：**$\{域名称.键名.key名\}**或者**$\{域名称.键名\["key名"\]\}**

#### 3、隐式对象
* el表达式中有**11个隐式对象**
* **pageContext功能**：
    1. 获取jsp其他8个隐式对象
    2. **动态获取虚拟目录**：**$\{pageContext.request.contextPath\}**

# JSTL标签
* 概念：JavaServer Pages Tag Library JSP标准标签库，**是由Apache组织提供的开源的免费的jsp标签**
* 作用：用于简化和替换jsp页面上的java代码

#### 1、使用
1. 导入jar包：**[jstl下载](https://mvnrepository.com/artifact/javax.servlet.jsp.jstl/jstl/1.2)**
2. 引入标签库：**taglib指令：\<%@ taglib %\>**

#### 2、常用标签
1. **if**：相当于java中的**if**
    * **属性**：test 必须属性，接受boolean表达式
        * 如果表达式**为true，则显示if标签体内容**，如果**为false，则不显示标签体内容**
        * 一般情况下，test属性值会**结合el表达式一起使用**
    * **注意**：c:if标签没有else情况，想要else情况，则可以在定义一个c:if标签
2. **choose**：相当于java中的**switch**
    * **when标签**做判断，相当于**case**
    * **otherwise标签**做其他情况的声明，相当于**default**
3. **foreach**：相当于java中的**for**
    * 属性1：
        1. **begin：开始值**
        2. **end：结束值**
        3. **var：临时变量**
        4. **step：步长**
        5. varStatus：循环状态对象
            * **index**：容器中元素的索引，从0开始
            * **count**：循环次数，从1开始
    * 属性2：
        1. **items：容器对象**
        2. **var：容器中元素的临时变量**
        3. **varStatus：循环状态对象**
            * **index**：容器中元素的索引，从0开始
            * **count**：循环次数，从1开始