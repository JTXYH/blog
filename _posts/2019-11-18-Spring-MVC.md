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

# 请求流程
![Spring-MVC请求流程.png](https://i.loli.net/2019/11/18/HiEXGO6hT8bLemy.png)

1. 用户**发送请求** 
2. 请求**进入中央处理器DispatcherServlet**，解析URI，**调用处理器映射器**
3. **处理器映射器RequestMappingHandlerMapping**根据uri找到一个具体的**HandlerMethod**，**返回**给DispatcherServlet
4. DispatcherServlet调用**处理器适配器RequestMappingHandlerAdapter执行HandlerMethod**，**返回ModelAndView对象**给中央处理器
5. DispatcherServlet调用**视图解析器ViewResolver解析View视图**，**返回逻辑视图View**给DispathcerSrevlet
6. DispatcherServlet把**ModelAndView对象中数据放在request作用域**中
7. **jsp渲染页面**，返回给前端浏览器

* spring-MVC是**spring中的一个服务，web服务，对servlet进行封装了，避免了繁琐的web配置**，spring-MVC是**面向接口编程**

# 核心类与接口
1. **DispatcherServlet前端控制器**：**接收请求，响应结果，相当于转发器**，是spring-MVC的中央处理器
![DispatcherServlet.png](https://i.loli.net/2019/11/18/ahXxsk3ActM7Jwo.png)
2. **HandlerMapping处理器映射器**：**解析URI，查找Handler处理器对象**
![HandlerMapping.png](https://i.loli.net/2019/11/18/rLwk5MSEhe7o3Jx.png)
3. **HandlerAdapter处理器适配器**：找到Handler处理器对象后，由DispatcherServlet前端控制器**调用HandlerAdapter来执行HandlerMethod**,**Handler处理器方法返回给适配器ModelAndView对象**
![HandlerAdapter.png](https://i.loli.net/2019/11/18/HmpXiGaB5cVRenK.png)
4. **Handler处理器对象**：自己编写，相当于**Controller**
5. **ModerAndView模型与视图对象**：是springmvc框架的一个底层对象，包括 **Model和View**，代表**数据与视图部分**，Handler执行完成后，返回**给Adapter的是ModelAndView对象**。Adapter再把**该对象返回给DispatherServlet前端控制器**
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
7. **@ResponseBody**：在方法上设置使方法**不走视图解析器，走消息转换器，返回数据\(json数据或者字符串数据\)**
8. **@RestController**：在类上设置，让这个类中**所有的方法都走消息转换器**
9. **@PathVariable**：用户**获取形参的数据**，在写Rest接口时使用
10. **@GetMapping**：Rest中使用通过**get**获取数据，用在**查询的接口上**
11. **@PostMapping**：Rest中使用通过**post**获取数据，用在**添加的接口上**
12. **@PutMapping**：Rest中使用通过**put**获取数据，用在**修改的接口上**
13. **@DeleteMapping**：Rest中使用通过**delete**获取数据，用在**删除的接口上**
14. **@CrossOrigin**：实现跨域，即在服务器内**不是同一个端口也可以访问方法**
15. **@ExceptionHandler**：在类中添加这个注解，**当前方法变为局部异常处理的方法**

# Rest风格
* **添加注解使得在传统的增删改查更加的简便**

```java
@Component
@RequestMapping("/restTest")
@RestController  "下面所有的方法都不走视图解析器，都走消息转换器"
@CrossOrigin  "实现跨域，不同的端口号访问也可以"
public class RestTest {
	
    "通过get请求获取，查询方法"    "@PathVariable注解是为了获取到形参的数据传给Mapping"
	@GetMapping("{uid}") 
	public User getUserInfo(@PathVariable("uid")String uid) {
		User user = new User("1001","智智","男");
		return user;
	}

	"通过post请求获取，添加方法"
	@PostMapping 
	public void addUserInfo(String uid,String uname,String gender) {
		User u = new User(uid,uname,gender);
		System.out.println("新添加的User信息："+u);
	}
	
    "通过put请求获取，修改方法"
	@PutMapping  
	public void updateUserInfo(String uid,String uname,String gender) {
		User u = new User(uid,uname,gender);
		System.out.println("修改后的User信息："+u);
	}
	
    "通过delete请求获取，删除方法"
	@DeleteMapping("{uid}")  
	public void deleteUser(@PathVariable("uid")String uid) {
		System.out.println("需要删除的User的ID为："+uid);
	}
}
```

# 静态资源处理
1. 在**web.xml**中配置**Tomcat默认的DefaultServlet的servlet**

    ```xml
    引用Tomcat的配置，对静态资源进行处理，这样就可以通过浏览器地址栏直接访问到静态资源
    不需要mapping
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.html</url-pattern>
		<url-pattern>*.css</url-pattern>
		<url-pattern>*.js</url-pattern>
	</servlet-mapping>
    ```

2. 在**springMVC-config.xml**中配置

    ```xml
    静态资源必须放在WebContent下，不能放在WEB-INF下！！
    对静态资源进行处理，这里配置了之后就不需要在web.xml中配置Servlet的default了
    推荐使用这种方法
    <**代表不管多少层路径全部都处理>
    mapping相当于RequestMapping做映射名
    有多个文件夹就配多个<mvc:resources></mvc:resources>
	<mvc:resources location="/static/" mapping="/static/**"></mvc:resources>
    ```

# 文件上传
* 需要jar包
![文件上传.png](https://i.loli.net/2019/11/19/J5PDvhp3Wn9eVB6.png)

* 在**springMVC-config中配置**

    ```xml
    id必须是multipartResolver
	<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
		最大文件大小
		<property name="maxUploadSize" value="30000000"></property>
		临时文件域
		<property name="maxInMemorySize" value="10000000"></property>
		设置默认字符编码
		<property name="defaultEncoding" value="UTF-8"></property>
		临时文件储存路径
		<property name="uploadTempDir" value="/upload"></property>
	</bean>
    ```

* 在**页面**上的写法

    ```html
    必须有 enctype="multipart/form-data"
	<form action="goMain" method="post" enctype="multipart/form-data">
		<input type="file" name="img"/><br/>
		<input type="submit" value="提交">
	</form>
    ```

* **在java中写法**

    ```java
    @RequestMapping("/goMain")
	"这里的MultipartFile形参的名字必须与上传的文件的name保持一致"
	public void goMain(HttpServletResponse resp,MultipartFile img) {
		"获取文件名称"
		String fileName = img.getOriginalFilename();
		"获取文件大小"
		long fileSize = img.getSize();
		System.out.println("文件名字："+fileName+"========文件大小："+fileSize);
		try {
			"获取文件字节数组"
			byte[] fileBytes = img.getBytes();
			System.out.println("文件字节数组："+fileBytes.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		"设置文件响应流"
		resp.setContentType("text/html;charset=utf-8");
		try {
			PrintWriter pw = resp.getWriter();
			pw.write("上传成功");
			pw.flush();
			pw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
    ```

# json支持
* 使用jar包，使用**jackjson或者fastjson**都可以，spring默认集成了jackjson
* 配置消息转换器，在**springMVC-config.xml中配置**

    ```xml
    识别mvc的注解
	<mvc:annotation-driven>
		配置JSON解析
		<mvc:message-converters>
			json消息转换器：contentType:applicatin/json  defaultCharset:UTF-8  默认字符编码是UTF-8

			jackson的配置方法
			<bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"></bean>

            两种只需配一种即可

			fastjson的配置方法
			<bean class="com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter"></bean>


			string消息转换器：contentType:text/plain defaultCharset:ISO-8859-1 默认字符编码是ISO-8859-1
            用来返回string数据的
			<bean class="org.springframework.http.converter.StringHttpMessageConverter">
				指定默认字符编码为UTF-8
				<property name="defaultCharset" value="UTF-8"></property>
			</bean>
		</mvc:message-converters>
	</mvc:annotation-driven>
    ```

* **java中使用**

    ```java
    @RequestMapping("/getUserInfo")
    "让这个方法不走视图解析器，走消息转换器"
	@ResponseBody
	"实现返回json数据"
	public List<User> getUserInfo(){
		List<User> list = new ArrayList<User>();
		list.add(new User("1001","张三","11"));
		list.add(new User("1002","李四","12"));
		list.add(new User("1003","王五","13"));
		list.add(new User("1004","赵六","14"));
		return list;
	}
	
	@RequestMapping("/getUname")
	@ResponseBody
	"实现返回字符串数据"
	public String getUname() {
		User u = new User();
		u.setUname("智智");
		return u.getUname();
	}
    ```

# 拦截器设置
* 在一个类中**继承HandlerInterceptor**，进行**重写preHandle方法**
    * **preHandle方法**：前置拦截，在**执行Handler之前**执行
    * **postHandle方法**：**执行Handler之后不出异常时**执行
    * **afterCompletion方法**：**最后执行，无论出不出异常都执行**

* 在java中配置

    ```java
    "一般只需要重写preHandle方法"
    public class MyloginInterceptor implements HandlerInterceptor{

	"Handler执行前执行"
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		System.out.println("=======preHandl============");
		"返回true就是放行，返回false就是拦截"
		return true;
	    }

	"Handler执行后执行，出现异常则不执行"
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		System.out.println("========postHandler===========");
	    }
	
	"Handler执行后执行，不管出不出现异常都执行"
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		System.out.println("========afterCompletion===========");
	    }
    }
    ```

* 在**springMVC-config.xml**中配置

    ```xml
    配置拦截器
    <mvc:interceptors>
		<mvc:interceptor>
			拦截路径
			<mvc:mapping path="/**"/>
			不拦截的路径
			<mvc:exclude-mapping path="/localExceptionDealWith/test1"/>
			<mvc:exclude-mapping path="/localExceptionDealWith/test2"/>
			配置自己的拦截器到bean容器中
			<bean class="io.jtxyh.interceptor.MyloginInterceptor"></bean>
		</mvc:interceptor>
	</mvc:interceptors>
    ```

