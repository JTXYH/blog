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

# 介绍
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
