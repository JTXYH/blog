---
layout:     post                    
title:      Spring-AOP
subtitle:   Important               
date:       2019-11-16               
author:     极客小祥                      
header-img: img/text/JAVA.jpg   
catalog: true                        
tags: 
    - JAVA
---

# 介绍
1. **AOP**被称为**面向切面编程**，是将**横切出来的逻辑代码融合到业务逻辑中**，来实现和没横切之前的一样的功能
2. **Spring-AOP**是将相同逻辑的**重复代码横向抽取**出来，使用**动态代理技术**将这些重复代码**织入**到目标对象方法中，实现和原来一样的功能。

# 相关概念
1. **JoinPoint\(连接点\)**：能够被**拦截到的点**，在spring中,这些**点指的是方法**，每一个**成员方法为一个连接点**
2. **Pointcut\(切点\)**：**具体定位的连接点**，具体定位到某一个方法成为**切点**
3. **Advice\(通知\)**：添加到**切点的一段逻辑代码**，Spring中定义了五类通知
    * **前置通知**
    * **后置通知**
    * **返回通知**
    * **异常通知**
    * **环绕通知**
4. **Weave\(织入\)**：将**Advice\(通知\)添加到目标类**的**具体连接点**的过程
5. **Aspect\(切面\)**：由**Pointcut\(切点\)**和**Advice\(通知\)**组成，包括**横切逻辑和连接点**定义
6. **Target\(目标对象\)**：被代理的目标对象，**已经存在的原对象**

# 使用
#### 1、注解
1. 导入**spring-IOC的相关jar包**，还有下面这些
![spring-aopJar.png](https://i.loli.net/2019/11/15/STk7zZi4jhdGHo5.png)
2. 创建**xml配置文件进行包扫描**和**切面类**
3. 切入点pointcut属性配置：**execution\(返回值类型 包名.类名.方法名\(形参类型\)\)**
4. 在前置通知**@Before**和最终通知**@After**的属性中配置的是**切入点的方法**
5. 在返回通知**@AfterReturning**和异常通知**@AfterThrowing**中
    * **pointcut**配置的是**切入点的方法**
    * 返回通知的**returning**配置的是返回值对象的名称，**名称必须与形参一直**，**形参必须是Object**
    * 异常通知的**throwing**配置的是异常方法名称，**名称必须与形参一直**，**形参为Exception**
6. 每个通知方法中的**JoinPoint**为接入点，即方法，可以通过属性获取到相关信息
    * **jp.getSignature\(\).getName\(\)**：获取到执行对象的**方法名**
    * **jp.getTarget\(\)**：获取到**接口的实现类**
    * **jp.getArgs\(\)**：获取**方法传入的形参**
7. 使用**环绕通知**，方法的返回值必须是**Object**，形参必须是**ProceedingJoinPoint**

```xml
在xml配置头中需要引入spring-aop的配置地址

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

	<context:component-scan base-package="io.jtxyh"></context:component-scan>

	开启aop注解识别 , 
	属性 proxy-target-class:
    默认false：创建代理对象，有接口的话用Proxy，没接口用cglib 
	true：全部用cglib创建代理对象
	<aop:aspectj-autoproxy></aop:aspectj-autoproxy>

</beans>
```

```java
"两个注解加其他是切面bean对象"
@Component // 实现被包扫描扫描到
@Aspect // 日志切面aspect
public class MyAop {

	"切入点pointcut（joinPoint的集合）"
	"execution(返回值类型 包名.类名.方法名(形参类型))"
	@Pointcut("execution(* io.jtxyh.service.*.*(..))")
	public void servicePointcut() {};
	
	"前置通知"
	@Before("servicePointcut()")
	public void write(JoinPoint jp) {
		Object target = jp.getTarget();
		System.out.println("通知方法："+target);
	}
	
	"返回通知"
	@AfterReturning(pointcut = "servicePointcut()",returning = "obj")
	public void afterReturn(JoinPoint jp,Object obj) {
		String methedName = jp.getSignature().getName();
		System.out.println("返回通知："+methedName+"-------返回信息："+obj);
	}
	
	"异常通知"
	@AfterThrowing(pointcut = "servicePointcut()",throwing = "ex")
	public void afterThrow(JoinPoint jp,Exception ex) {
		String methedName = jp.getSignature().getName();
		System.out.println("异常通知："+methedName+"-------异常信息："+ex.getMessage());
	}
	
	"最终通知"
	@After("servicePointcut()")
	public void after(JoinPoint jp) {
		String methedName = jp.getSignature().getName();
		System.out.println("最终通知："+methedName);
	}
}
```

```java
// 切面bean对象
@Component // 实现被包扫描扫描到
@Aspect // 日志切面aspect
public class MyAop2 {
	@Pointcut("execution(* io.jtxyh.service.*.*(..))")
	public void myAop() {};
	
	"环绕通知，方法的返回值必须是Object，形参必须是ProceedingJoinPoint"
	@Around("myAop()")
	public Object around(ProceedingJoinPoint jp) {
		Object target = jp.getTarget(); "impl对象"
		String methodName = jp.getSignature().getName(); "方法名"
		Object[] args = jp.getArgs(); "调用方法传入的形参"
		Object result = null;
		System.out.println("impl对象："+target+"----方法名："+methodName+"----方法的形参："+Arrays.toString(args));
		try {
			System.out.println("环绕前置通知。。。。。");

			result = jp.proceed();
			
            System.out.println("环绕后置通知");
		} catch (Throwable e) {
			System.out.println("环绕异常通知。。。。。");
			e.printStackTrace();
		}finally {
			System.out.println("环绕结束通知");
		}
		return result; "返回调用方法的返回值"
	}
}

```