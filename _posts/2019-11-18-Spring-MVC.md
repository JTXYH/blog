---
layout:     post                    
title:      Spring-MVC
subtitle:   Important
date:       2019-11-18
author:     极客小祥                      
header-img: img/text/JAVA.jpg
catalog: true
tags:
    - JAVA
---

![Spring-MVC请求流程.png](https://i.loli.net/2019/11/18/HiEXGO6hT8bLemy.png)

spring-MVC是**spring中的一个服务，web服务，对servlet进行封装了，避免了繁琐的web配置**，spring-MVC是**面向接口编程**

# 核心类与接口
1. **DispatcherServlet前端控制器**：**接收请求，响应结果，相当于转发器**，是spring-MVC的中央处理器
![DispatcherServlet.png](https://i.loli.net/2019/11/18/ahXxsk3ActM7Jwo.png)
2. **HandlerMapping处理器映射器**：**解析URI，查找Handler处理器对象**
![HandlerMapping.png](https://i.loli.net/2019/11/18/rLwk5MSEhe7o3Jx.png)
3. **HandlerAdapter处理器适配器**：找到Handler处理器对象后，由DispatcherServlet前端控制器**调用HandlerAdapter来执行HandlerMethod**,**Handler处理器方法返回给适配器ModelAndView对象**
![HandlerAdapter.png](https://i.loli.net/2019/11/18/HmpXiGaB5cVRenK.png)
4. **Handler处理器对象**：自己编写，相当于**Controller**
5. **MOderAndView模型与视图对象**：是springmvc框架的一个底层对象，包括 **Model和View**，代表**数据与视图部分**，Handler执行完成后，返回**给Adapter的是ModelAndView对象**。Adapter再把**该对象返回给DispatherServlet前端控制器**
6. **ViewResolve视图解析器对象**：前端控制器**请求视图解析器去进行视图解析**，根据逻辑视图名解析成真正的视图(jsp)，视图解析器**向前端控制器返回View**，DispatcherServlet负责**渲染视图**，将模型数据(在ModelAndView对象中)填充到request作用域，便于显示数据,最终响应用户

# 使用
1. 导入jar包
![jar包.png](https://i.loli.net/2019/11/18/KwpEjzUQM1PJlm5.png)
2. 配置springMVC-config.xml文件

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:mvc="http://www.springframework.org/schema/mvc"
        xmlns:aop="http://www.springframework.org/schema/aop"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            https://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            https://www.springframework.org/schema/context/spring-context.xsd
            http://www.springframework.org/schema/aop
            https://www.springframework.org/schema/aop/spring-aop.xsd
            http://www.springframework.org/schema/mvc
            https://www.springframework.org/schema/mvc/spring-mvc.xsd">
        包扫描
        <context:component-scan base-package="io.jtxyh"></context:component-scan>
        
        识别spring-mvc的注解：
            包括：RequesetMapping，PathValiable，DatatimeFormated,getMapping,PostMapping....
        <mvc:annotation-driven></mvc:annotation-driven>
        
        处理器映射器： 识别RequestMapping注解，做uri映射,也可以不配置，默认已配置过
        <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping"></bean> 
        
        视图解析器，生成响应视图路径
        <bean
            class="org.springframework.web.servlet.view.InternalResourceViewResolver">
            <property name="prefix" value="/WEB-INF/view/"></property>
            <property name="suffix" value=".jsp"></property>
        </bean>

    </beans>
    ```

3. 配置web.xml文件
    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="http://java.sun.com/xml/ns/javaee"
        xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
        id="WebApp_ID" version="3.0">
        
        设置字符编码  post请求乱码配置
        <filter>
            <filter-name>encodingFilter</filter-name>
            <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
            设置request编码
            <init-param>
                <param-name>encoding</param-name>
                <param-value>UTF-8</param-value>
            </init-param>
            设置response编码
            <init-param>
                <param-name>forceResponseEncoding</param-name>
                <param-value>true</param-value>
            </init-param>
        </filter>
        设置范围
        <filter-mapping>
            <filter-name>encodingFilter</filter-name>
            <url-pattern>/*</url-pattern>
        </filter-mapping>
        
        
        加载springMVC-config配置文件
        <servlet>
            <servlet-name>dispatcherServlet</servlet-name>
            <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
            <init-param>
                <param-name>contextConfigLocation</param-name>
                <param-value>classpath:springMVC-config.xml</param-value>
            </init-param>
            <load-on-startup>1</load-on-startup>
        </servlet>
        
        <servlet-mapping>
            <servlet-name>dispatcherServlet</servlet-name>
            <url-pattern>/</url-pattern>
        </servlet-mapping>
    </web-app>
    ```

4. **Handler**编写

    ```java
    "注册一个bean到spring中"
    @Controller
    "指定处理的url请求名称"
    @RequestMapping("/userHandler")
    public class UserHandler {
        
        "接收日期参数需要使用@DateTimeFormat(pattern = "yyyy-MM-dd")格式化时间"
        @RequestMapping("/test1")
        public String test1(Model m,String uname,String upass,@DateTimeFormat(pattern = "yyyy-MM-dd") Date time) {
            System.out.println("test1执行了");
            "Model中的数据被放在request域中"
            m.addAttribute("key1", "value1"); 
            m.addAttribute("time",time);
            return "test1";
        }
        
        "路径不同，写法不同"
        @RequestMapping("/test2")
        public String test2() {
            System.out.println("test2执行了");
            return "/a/test2";
        }
        
        "获取传入的参数，@RequestParam给参数设置一个默认值"
        @RequestMapping("/test3")
        public String test3(@RequestParam(defaultValue = "默认名")String name,String pass,Model m) {
            System.out.println("test3执行了"+name+"------"+pass);
            m.addAttribute("name",name);
            return "test3";
        }
        
        "转发"
        @RequestMapping("/test4")
        public String test4() {
            System.out.println("test4执行了");
            "转发到test3去，如果用重定向就是redirect"
            return "forward:test3";
        }
        
        "返回一个ModelAndView视图"
        @RequestMapping("/test5")
        public ModelAndView test5() {
            System.out.println("test5执行了");
            ModelAndView md = new ModelAndView();
            "指定返回的视图名称"
            md.setViewName("test5");
            "返回的数据"
            md.addObject("test5", "哈哈哈哈哈");
            return md;
        }
        
        "形参可以有session,request,response，需要哪个写哪个"
        @RequestMapping("/test6")
        public String test6(HttpSession session,HttpServletRequest req,HttpServletResponse resp) {
            System.out.println("test6执行了");
            session.setAttribute("session", "session-Value");
            req.setAttribute("request", "request-Value");
            return "test6";
        }
        
        "因为postTest3不在WEB-INF下所以直接访问不到，需要通过Servlet"
            @RequestMapping("/test7")
            public String test7() {
                System.out.println("返回到postTest3页面");
                return "postTest3";
            }
    }
    ```

# 解析
1. **@Controller**：spring-core中的注解，**包扫描加入bean**
2. **@RequestMapping**：指定**处理的url请求名称**
3. **@RequestParam**：给形参设置一个**默认值**
4. **@DateTimeFormat**：格式化时间数据，@DateTimeFormat\(pattern = "yyyy-MM-dd"\)
5. **形参Model**：用于**返回给前端数据，存储在request域中**
6. **对象ModelAndView**：用于**返回给前端数据，存储在request域中**，需要指定返回的视图名称
