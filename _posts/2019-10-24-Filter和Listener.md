---
layout:     post                    
title:      Filter和Listener
subtitle:   过滤器和监听器               
date:       2019-10-26               
author:     极客小祥                      
header-img: img/text/WEB.jpg   
catalog: true                        
tags:                                
    - WEB
---

# Filter
* 作用：用于当访问服务器资源时，**过滤器可以将请求拦截下来，完成一些功能**
* 简单使用步骤：
    1. 定义一个类实现接口**Filter**
    2. 重新接口的抽象方法
    3. **配置拦截路径**
        * 在web.xml里配置
        * 使用**@WebFilter\(\)**注解

        ```java
        @WebFilter("/*") // 所有资源在被访问之前都会经过过滤器
        public class FilterDemo1 implements Filter{

            @Override
            public void destroy() {
                // TODO Auto-generated method stub
                
            }

            @Override
            public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                    throws IOException, ServletException {
                System.out.println("过滤器执行了。。。。。");
                // 放行
                chain.doFilter(request, response);
            }

            @Override
            public void init(FilterConfig filterConfig) throws ServletException {
                // TODO Auto-generated method stub
                
            }
        ```

#### 1、web.xml配置
```xml
<filter>
<filter-name>demo1</filter-name>
<filter-class>io.jtxyh.controller.FilterDemo1</filter-class>
</filter>

<filter-mapping>
<filter-name>demo1</filter-name>
<!-- 这下面这个路径是拦截路径 -->
<url-pattern>/*</url-pattern>
</filter-mapping>
```

#### 2、执行流程
1. 执行**过滤器**
2. 执行**放行后**的资源
3. **回来**执行过滤器放行代码下边的代码

#### 3、生命周期
1. **init**：在服务器启动后，会创建Filter对象，然后调用init方法。**只执行一次**
2. **doFilter**：在每一次请求被拦截资源时，会执行。**执行多次**
3. **destroy**：在服务器关闭后，Filter对象被销毁，如果服务器**正常关闭**，则会执行destroy方法。**只执行一次**，用于释放资源

#### 4、配置
* **拦截路径配置**
    1. 具体的资源路径：**/index.jsp**
        * 只有访问**index.jsp资源**时，才会执行
    2. 拦截目录：**/user/\***
        * 访问**/user下的所有资源**时，才会执行
    3. 后缀名拦截：**\*.jsp**
        * 访问**后缀名为jsp资源**时，才会执行
    4. 拦截所有资源：**/\***
        * 访问所有资源时都会执行
* **拦截方式配置**
    * **注解配置**：
        1. 设置**dispatcherTypes**属性
            1. **REQUEST**：**默认值。浏览器直接请求**资源
            2. **FORWARD**：**转发**访问资源
            3. **INCLUDE**：**包含**访问资源
            4. **ERROR**：**错误**跳转资源
            5. **ASYNC**：**异步**访问资源
            
            ```java
            @WebFilter(value = "/*",dispatcherTypes = {DispatcherType.REQUEST,...})
            ```

        2. web.xml配置
            * 设置\<dispatcher\>\</dispatcher\>标签

            ```xml
              <filter-mapping>
                <filter-name>demo1</filter-name>
            <!-- 	这下面这个路径是拦截路径 -->
                <url-pattern>/index.jsp</url-pattern>
                <dispatcher>FORWARD</dispatcher>
            </filter-mapping>
            ```

#### 5、链\(配置多个过滤器\)
* 执行**顺序**：有**两个过滤器**
    1. *执行过滤器1*
    2. *执行过滤器2*
    3. *资源执行*
    4. *执行过滤器2*
    5. *执行过滤器1*
* 过滤器**先后顺序**
    1. 注解配置：按照**类名的字符串比较**规则比较，**值小的先执行**
    2. web.xml配置：**\<filter-mapping\>定义在上面的先执行**