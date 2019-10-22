---
layout:     post                   
title:      Request,Response和ServletContext
subtitle:   Servlet相关知识              
date:       2019-10-20               
author:     极客小祥                      
header-img: img/text/19-10-19.jpg   
catalog: true              
tags:                                
    - JAVA
---

# Request和Response原理
1. request和response对象是由**服务器创建的**，我们只是使用
2. request对象是来**获取请求消息**，response对象是来**设置响应消息**


# request继承原理
1. ServletRequest  **--接口\(继承HttpServletRequest\)**
2. HttpServletRequest  **--接口\(实现org.apache.catalina.connector.RequestFacade\)**
3. org.apache.catalina.connector.RequestFacade **--类\(tomcat\)**

# 获取请求消息数据功能
#### 1、获取请求行数据
* 格式：**GET /day01/test1?name=lisi HTTP/1.1**
* 方法：
    1. 获取请求方式：**GET**
        * String  **getMethod\(\)**
    2. 获取虚拟目录：**/day01**
        * String  **getContextPath\(\)**
    3. 获取Servlet路径：**/test1**
        * String  **getServletPath\(\)**
    4. 获取get方式请求参数：**name=lisi**
        * String  **getQueryString\(\)**
    5. 获取请求**URI\(统一资源标识符\)**：**/day01/test1**
        * String  **getRequestURI\(\)**
    6. 获取请求**URL\(统一资源定位符\)**：**http://localhost/day01/test1**
        * StringBuffer  **getRequestURL\(\)**
    7. 获取协议及版本：**HTTP/1.1**
        * String  **getProtocol\(\)**
    8. 获取客户机IP地址：
        * String  **getRemoteAddr\(\)**
#### 2、获取请求头数据
* 方法：
    1. 通过请求头的名称获取请求头：
        * **String getHeader\(String name\)**
    2. 获取所有的请求头名称：
        * **Enumeration<String> getHeaderNames\(\)**
        ```java
        // 获取所有请求头名称
        Enumeration<String> headerNames = request.getHeaderNames();
        // 遍历
        while(headerNames.hasMoreElements()){
            String name = headerNames.nextElement();
            //根据名称获取请求头
            String value = request.getHeader(name);
        }
        ```

#### 3、获取请求体数据
* 只有**POST**请求方式才有请求体
* 步骤：
    1. 获取**流对象**
        * 获取**字符输入流**：**BufferedReader getReader\(\)，只能获取字符数据**
        * 获取**字节输入流**：**ServletInputStream getInputStream\(\)，可以操作所有类型数据**
    2. **从流对象中拿数据** 

# 其他功能
#### 1、获取请求参数\(GET和POST通用\)
1. 根据参数名称获取参数值：
    * String **getParamenter\(String name\)**
2. 根据参数名称获取参数值的**数组**
    * String\[\] **getParamenterValues\(String name\)**
3. 获取所有请求的参数名称
    * * Enumeration<String> **getParamenterNames\(\)**
4. 获取所有参数的Map集合
    * Map<String,String\[\]> **getParamenterMap\(\)**

* **中文乱码问题**
    * **get方式**：tomcat8解决了中文乱码方式
    * **post方式**：会有乱码
        * 需要设置字符集为：**request.setCharacterEncoding\("utf-8"\)**

#### 2、请求转发
* 一种在服务器内部的**资源跳转方式**
* **步骤**：
    1. 通过request对象获取请求转发器对象
        * RequestDispatcher **getRequestDispatcher\(String path\)**
    2. 使用RequestDispatcher对象进行转发
        * **forword\(ServletRequest request,ServletResponse response\)**

#### 3、共享数据
* **域对象**：一个有作用范围的对象，可以在**范围内共享数据**
* **request域**：代表**一次请求**的范围，一般用于**请求转发的多个资源中共享数据**
* 方法：
    1. 存储数据
        * void **setAttribute\(String name,Object obj\)**
    2. 通过键获取值
        * object **getAttribute\(String name\)**
    3. 通过键移除键值对
        * void **removeAttribute\(String name\)**

#### 4、获取ServletContext
* 获取
    * ServletContext **getServletContext\(\)**

# BeanUtils技术
* 导入jar包：
    1. **[下载BeanUtils](https://mvnrepository.com/artifact/commons-beanutils/commons-beanutils/1.9.3)**
    2. **[下载Logging](https://mvnrepository.com/artifact/commons-logging/commons-logging/1.2)**

* **注意**：出现**java.lang.ClassNotFoundException**时
    * **需要把beanutils.jar包和logging.jar包放到Tomcat的\WEB-INF\lib目录下面**

```java
// 设置字符编码
req.setCharacterEncoding("utf-8");
// 获取所有请求参数
Map<String, String[]> map = req.getParameterMap();
// 创建一个存储的对象
BeanTest beanTest = new BeanTest();
    // 使用BeanUtils封装
    try {
        BeanUtils.populate(beanTest, map);
    } catch (IllegalAccessException e) {
        e.printStackTrace();
    } catch (InvocationTargetException e) {
        e.printStackTrace();
    }
```

* 用于封装**JavaBean**的
    1. JavaBean：**标准的Java类**
        1. **要求**：
            * 类必须被public修饰
            * 必须提供空参的构造器
            * 成员变量必须使用private修饰
            * 提供公共的setter和getter方法
        2. **功能**：封装数据
    2. 概念：
        * 成员变量：定义在类下面被**修饰符修饰的变量**
        * 属性：**setter和getter方法截取后的产物**
* 方法：
    1. 设置**属性值**
        * void **setProperty\(Object obj,String name,String value\)**
    2. 获取**属性值**
        * String **getProperty\(String name\)**
    3. **将map集合的键值对信息，封装到相应的JavaBean对象中**
        * void **popular\(Object obj,Map<String, String[]> map\)**

# Response对象
* 功能：设置响应消息

#### 1、设置响应行
1. 格式：HTTP/1.1 200 OK
2. 设置状态码：**setStatus\(int sc\)**

#### 2、设置响应头
1. **response.setHeader\(String name,String value\)**

#### 3、设置响应体
* 使用步骤：
    1. **获取输出流**
        * 首先设置**字符编码**：**response.setContentType\("text/html;charset=utf-8"\)**
        * 字符输出流：PrintWriter **getWriter\(\)，只能获取字符数据**
        * 字节输出流：ServletOutputStream **getOutputStream\(\)，可以操作所有类型数据**
    2. **使用输出流**，将数据输出到客户端浏览器

# 重定向和转发
* **转发特点**：forward
    1. 浏览器**地址栏路径不发生变化**
    2. 只能转发到**当前服务器内部资源中**
    3. 转发是**一次请求**
* **重定向特点**：redirect
    1. 浏览器**地址栏路径发生变化**
    2. 可以访问**其他站点\(服务器\)资源**
    3. 重定向是**两次请求**，**不能使用request对象来共享数据**

    ```java
    /设置状态码为302
    resp.setStatus(302);
    // 设置响应头location
    resp.setHeader("location","req.getContextPath()+/demo2");
    ------------------------
    * 简单使用的重定向方法
    resp.sendRedirect("/00_Test/demo2");
        }
    ```
# 路径写法
1. **相对路径**：通过相对路径**不可以**确定唯一资源
    * ./index.html
    * **不以 / 开头，以 . 开头**
    * **规则**：找到当前资源和目标资源之间的相对位置关系
2. **绝对路径**：通过绝对路径**可以**确定唯一资源
    * /day01/demo1
    * **以 / 开头**
    * 规则：
        1. 给客户端浏览器使用：**需要**加虚拟目录\(**项目路径**\)
            * 虚拟目录使用：**request.getContextPath\(\)动态获取**
        2. 给服务器使用：**不需要**加虚拟目录

# ServletContext对象
概念：**代表整个web应用，可以和程序的容器\(服务器\)来通信**

#### 1、获取：
1. 通过request对象获取
    * **request.getServletContext\(\)**
2. 通过HTTPServlet获取
    * **this.getServletContext\(\)**

#### 2、功能：
1. **获取MIME类型**
    * MIME类型：在互联网通信过程中定义的一种**文件数据类型**
    * 格式：**大类型/小类型**
        * text/html   image/jpeg
    * 获取：**String getMimeType\(String file\)**
2. **域对象**：共享数据
    1. **setAttribute\(String name,Object value\)**
    2. **getAttribute\(String name\)**
    3. **removeAttribute\(String name\)**

    * ServletContext**对象范围**：**所有用户所有请求的数据**
2. **获取文件的真实\(服务器\)路径**
    1. 方法：**String getRealPath\(String path\)**