---
layout:     post
title:      Spring-Boot
subtitle:   JAVA企业级框架
date:       2019-12-21
author:     极客小祥
header-img: img/text/JAVA.jpg
catalog: true
tags: 
    - JAVA
---

# 简介

#### 1、简单介绍
1. springBoot按照**开发习惯**对原来的xml配置提供了**预配置**，开发人员使用springBoot框架，**不用再手工配置xml**
2. springBoot按**包依赖习惯**，提供了各个常用模块的**依赖启动器starter**，
    * 官方提供的启动器如：**spring-boot-starter-\***
    * 第三方的启动器如：**\*-spring-boot-starter**
    * 比如**web模块，test模块，mybaits模块，redis模板**...

#### 2、项目结构说明
* src/main/**java/*Application**：**启动类，主类**
* src/main/**resources/static**：**静态资源**路径\(css/js/图片/视频。。。纯静态资源\)
* src/main/**resources/templates**：**视图模板**文件。\(html加**thymeleaf模板引擎**\)
* src/main/**resources/application.properties**：**项目核心配置文件**。改默认配置的地方

#### 3、pom.xml
* **父工程**：项目有**两个父工程**，管理了**jdk版本**，管理了**maven的resources配置**，管理了**常用依赖的版本**.
* **jdk版本**：重写父工程的**java.version.重新制定jdk版本**
* **dependency依赖**：配置启动器依赖。
* **spring-boot-maven-plugin打包插件**：打jar包的插件,**配置启动类位置**

#### 4、项目运行方式
1. jar包运行：
    * **java -jar jar包名称**

2. **war包运行**：为了tomcat调优，或者不用tomcat，需要打war包
    * pom中加入

        ```xml
        <packaging>war</packaging>
        <build>
            <finalName>war包名称</finalName>
        </build>
        ```

    * 默认tomcat启动器，**设置scope为provided**,避免与本地tomcat冲突

        ```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        ```

    * 要有入口配置类，等价于web.xml，配置类**从SpringBootServletInitializer抽象类派生,重写configure方法**，把配置类加到环境中

        ```java
        import org.springframework.boot.builder.SpringApplicationBuilder;
        import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
        // 等价于web.xml
        public class WebServletInit extends SpringBootServletInitializer {

            @Override
            protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
                return builder.sources(Boot1Application.class);
            }
        }
        ```

#### 5、配置文件
* application**.yml**：这个更**常用**
* application**.properties**：这个的**优先级更高**,重复配置以properties为主
* 存放位置：
    1. **/**
    2. **/config**
    3. **src/main/resources/**.yml或者.properties
    4. **src/main/resources/config/**.yml或者.properties，**优先级最高**

#### 6、启动类
* @SpringBootApplicaiotn
    * @SpringBootConfiguration：表示**当前类是一个配置类**。
        * @Configuration
    * @EnableAutoConfiguration:开启**自动配置**
        * @AutoConfigurationPackage:**设置包扫描范围**。获取启动类所在的包作为扫描包范围。
        * @Import\(\{AutoConfigurationImportSelector.class\}\):
            * 选择到**META-INF/spring.factories文件**，找到**key**为**org.springframework.boot.autoconfigure.EnableAutoConfiguration**的值，选择到**117个配置类**。通过Import注解导入到总配置类。
    * @ComponentScan：**包扫描**
        * **@Controller,@Service,@Repository,@Bean,@Value,@Component,@AutoWired,@Resource,@Configuration**

```java
    public static void main(String[] args) {
        SpringApplication.run(WebcrmApplication.class, args);
    }

    "启动tomcat，filter，listener，启动标志，启动日志"
```

#### 7、获取配置类中的自定义注解
1. @Value注解
    * **@Value**注解获取properties配置文件中的数据,例：@Value\("${key}"\)
    * **@PropertySource\("classpath:自定义properties文件的名称"\)**,写到配置类上。
2. @ConfigurationProperties\(prefix=""\)
    * 集合注值

    ```yml
    jdbc:
        url: jdbc:mysql://localhost:3306/jtxyh
        driverClassName: com.javasm.Driver
        userName: root
        password: root
    ```

    ```java
    @ConfigurationProperties(prefix = "jdbc")
    public class MyDataSourceProperties {
        private String url;
        private String driverClassName;
        private String userName;
        private String password;
    ```

#### 8、自定义banner
* 在*resources*下添加**banner.txt，自动加载**

#### 9、自定义欢迎页
* 在**resources/resources或resources/static或resources/public或/**下自定义一个**index.html**文件，优先级**由高到低**

#### 10、替换ico图标
* 在**静态资源路径**下放favicon.ico图标
* 在**tomcat下的root**下放favicon.ico
* 在页面的**link标签引入**favicon.ico

# 使用
#### 1、自定义拦截器，消息转换器
* 使用核心接口**WebMvcConfigurer** 来自定义扩展

```java
@Configuration  // 启动类自动加载这个类
public class MyWebMvcConfigurer implements WebMvcConfigurer {

    // 做统一视图解析器
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/uinfo").setViewName("uinfo");
        registry.addViewController("/cinfo").setViewName("cinfo");
        registry.addViewController("/minfo").setViewName("minfo");
    }

    // 设置拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // new MyInterceptor()是自己写一个继承HandlerInterceptor接口的拦截器
        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**").excludePathPatterns("/login","/");
    }

    //数据格式工具
    @Override
    public void addFormatters(FormatterRegistry registry) {
        // new MyDateFormater()是自定义的一个格式化日期的类，继承Converter<String,Date>接口
        registry.addConverter(new MyDateFormater());
    }

    // 静态资源
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 静态资源下的文件会放行，但文件夹中的文件不会，所以如果有文件夹就这样设置
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
    }
}
```

#### 2、异常处理
* 在SpringBoot中，自动配置机制会加载**ErrorMvcAutoConfiguration类**，在该类中**由basicErrorController**主要负责发生错误后的**页面跳转**，而basicErrorController中的**errorHtml\(\)和error\(\)**方法就分别是返回**html和json**的两个控制器。
* 当用**浏览器**访问时，出错，返回**错误页面**，页面包含
    * **timestamp，status，message，error，path**
* 当**非浏览器**客户端访问时，返回的json字符串，
    
    ```json
    {
        "timestamp": "2019-12-20T02:27:45.856+0000", 
        "status": 404, "error": "Not Found", 
        "message": "No message available", 
        "path": "/page"}
    ```

![springboot异常处理1.png](https://raw.githubusercontent.com/JTXYH/blog_comment/master/blog_imgs/springboot%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%861.png)
![springboot异常处理2.png](https://raw.githubusercontent.com/JTXYH/blog_comment/master/blog_imgs/springboot%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%862.png)
![springboot异常处理3.png](https://raw.githubusercontent.com/JTXYH/blog_comment/master/blog_imgs/springboot%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%863.png)
![springboot异常处理4.png](https://raw.githubusercontent.com/JTXYH/blog_comment/master/blog_imgs/springboot%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%864.png)

* **自定义异常处理**
    1. 自定义**错误信息**：从**DefaultErrorAttributes派生子类**
    2. 自定义**错误页面**：
        * 创建**error.html**，得到自定义错误信息
        * 或者创建**error目录，下加4xx.html,5xx.html**

    ```java
    public class MyErrorAttributes extends DefaultErrorAttributes {
        @Override
        public Map<String, Object> getErrorAttributes(WebRequest webRequest, boolean includeStackTrace) {
            Map<String, Object> map = super.getErrorAttributes(webRequest, includeStackTrace);
            // 在map中添加自定义要显示的异常信息
            return map;
        }
    }
    ```

#### 3、日志集成
* SpringBoot默认集成有日志功能，使用的是**Apache的commons-logging做日志的输出功能**，且使用的logback的日志机制
* **替换**默认使用的日志：
    1. **排除默认**的logging依赖

        ```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
            <!-- 排除默认的依赖 -->
            <exclusions>
                <exclusion>
                    <artifactId>spring-boot-starter-logging</artifactId>
                    <groupId>org.springframework.boot</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        ```

    2. 加入log4j2依赖

        ```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-log4j2</artifactId>
        </dependency>
        ```
    
    3. 自定义log4j2模板

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <configuration>
            <appenders>
                <!-- 控制台输出 -->
                <console name="Console" target="SYSTEM_OUT">
                    <PatternLayout
                        pattern="%d{HH:mm:ss.SSS} [%t] %-5level %class %L %M -- %msg%n" />
                </console>

                <!-- fileName：输出路径 filePattern：命名规则 -->
                <RollingFile name="RollingFileDebug"
                    fileName="E:/logs/debug.log"
                    filePattern="E:/logs/$${date:yyyy-MM-dd}/debug-%d{yyyy-MM-dd}-%i.log">
                    <Filters>
                        <ThresholdFilter level="DEBUG" />
                        <ThresholdFilter level="INFO" onMatch="DENY"
                            onMismatch="NEUTRAL" />
                    </Filters>
                    <!-- 输出格式 -->
                    <PatternLayout
                        pattern="%d{HH:mm:ss.SSS} [%t] %-5level %class{36} %L %M - %msg%n" />
                    <Policies>
                    <!-- 单个日志文件的大小限制 -->
                    <SizeBasedTriggeringPolicy size="100 MB" />
                    </Policies>
                    <!-- 最多保留20个日志文件 -->
                    <DefaultRolloverStrategy max="20" />
                </RollingFile>

                <RollingFile name="RollingFileInfo"
                    fileName="E:/logs/info.log"
                    filePattern="E:/logs/$${date:yyyy-MM-dd}/info-%d{yyyy-MM-dd}-%i.log">
                    <Filters>
                        <ThresholdFilter level="INFO" />
                        <ThresholdFilter level="WARN" onMatch="DENY"
                            onMismatch="NEUTRAL" />
                    </Filters>
                    <!-- 输出格式 -->
                    <PatternLayout
                        pattern="%d{HH:mm:ss.SSS} %-5level %class{36} %L %M - %msg%xEx%n" />
                    <Policies>
                        <!-- SizeBasedTriggeringPolicy单个文件的大小限制 -->
                        <SizeBasedTriggeringPolicy size="100 MB" />
                    </Policies>
                    <!-- DefaultRolloverStrategy同一个文件下的最大文件数 -->
                    <DefaultRolloverStrategy max="20" />
                </RollingFile>

                <RollingFile name="RollingFileWarn"
                    fileName="E:/logs/warn.log"
                    filePattern="E:/logs/$${date:yyyy-MM}/warn-%d{yyyy-MM-dd}-%i.log">
                    <Filters>
                        <ThresholdFilter level="WARN" />
                        <ThresholdFilter level="ERROR" onMatch="DENY"
                            onMismatch="NEUTRAL" />
                    </Filters>
                    <PatternLayout
                        pattern="[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n" />
                    <Policies>
                        <!--<TimeBasedTriggeringPolicy modulate="true" interval="1"/> -->
                        <SizeBasedTriggeringPolicy size="100 MB" />
                    </Policies>
                    <!--最多保留20个日志文件 -->
                    <DefaultRolloverStrategy max="20" min="0" />
                </RollingFile>

                <RollingFile name="RollingFileError"
                    fileName="E:/logs/error.log"
                    filePattern="E:/logs/$${date:yyyy-MM}/error-%d{yyyy-MM-dd}-%i.log">
                    <Filters>
                        <ThresholdFilter level="ERROR" />
                        <ThresholdFilter level="FATAL" onMatch="DENY"
                            onMismatch="NEUTRAL" />
                    </Filters>
                    <PatternLayout
                        pattern="[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n" />
                    <Policies>
                        <!--<TimeBasedTriggeringPolicy modulate="true" interval="1"/> -->
                        <SizeBasedTriggeringPolicy size="100 MB" />
                    </Policies>
                    <!--最多保留20个日志文件 -->
                    <DefaultRolloverStrategy max="20" min="0" />
                </RollingFile>
            </appenders>

            <loggers>
                <root level="debug">
                    <appender-ref ref="Console"/> 
                    <appender-ref ref="RollingFileDebug"/>
                    <appender-ref ref="RollingFileInfo"/>
                    <appender-ref ref="RollingFileWarn"/>
                    <appender-ref ref="RollingFileError"/>
                </root> 
                
                <logger name="org.springframework" level="error"></logger>
                <logger name="org.mybatis.spring" level="error"></logger>
                <logger name="org.apache.ibatis" level="error"></logger>
                
                <!-- 下面是实现异步日志 -->
                <!--过滤掉spring和mybatis的一些无用的debug信息 -->
                <!-- <AsyncLogger name="org.springframework" level="error" includeLocation="true">
                    <AppenderRef ref="RollingFileError"></AppenderRef>
                </AsyncLogger>
                <AsyncLogger name="org.mybatis" level="error" includeLocation="true">
                    <AppenderRef ref="RollingFileError"></AppenderRef>
                </AsyncLogger>
                <AsyncLogger name="com.alibaba.druid" level="error"  includeLocation="true">
                    <AppenderRef ref="RollingFileError"></AppenderRef>
                </AsyncLogger>
                <AsyncLogger name="org.apache.ibatis" level="error"  includeLocation="true">
                    <AppenderRef ref="RollingFileError"></AppenderRef>
                </AsyncLogger>

                <AsyncRoot level="debug" includeLocation="true">
                    <appender-ref ref="Console"/> 
                    <appender-ref ref="RollingFileDebug"/>
                    <appender-ref ref="RollingFileWarn"/>
                    <appender-ref ref="RollingFileError"/>
                    <appender-ref ref="RollingFileFatal"/>
                </AsyncRoot>	 -->
                
            </loggers>
        </configuration>
        ```

    4. 使用

        ```java
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        // 日志记录，在需要做日志记录的类上添加就可以了
        private Logger l = LoggerFactory.getLogger(UinfoHandler.class);
        ```

#### 4、Mybatis集成

* 在SpringBoot中默认采用**DataSourceAutoConfiguration来配置数据源（DataSource）**。官方默认只需要在application配置文件中使用简单的配置就可以连接数据库。
* 当加入了Druid-starter之后，它的**DruidDataSourceAutoConfigure默认初始化了一个创建DataSource**的方法。而这个DataSource默认就是读取当前**application配置文件中的spring.datasource.druid的值**，由此创建了基于Druid的数据源

![springboot配置DataSource.png](https://raw.githubusercontent.com/JTXYH/blog_comment/master/blog_imgs/springboot%E9%85%8D%E7%BD%AEDataSource.png)

* 在pom.xml**添加依赖**

    ```xml
    <!-- mybatis依赖,mybatis与spring整合-->
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>1.3.2</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid-spring-boot-starter</artifactId>
        <version>1.1.10</version>
    </dependency>
    <!--分页启动器-->
    <dependency>
        <groupId>com.github.pagehelper</groupId>
        <artifactId>pagehelper-spring-boot-starter</artifactId>
        <version>1.2.12</version>
    </dependency>
    ```

* 配置java目录下的**配置资源扫描和逆向工程插件**

    ```xml
    <build>
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
        </resources>
        <!--逆向工程插件-->
        <plugins>
        <plugin>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-maven-plugin</artifactId>
            <version>1.3.2</version>
            <dependencies>
                <dependency>
                    <groupId>mysql</groupId>
                    <artifactId>mysql-connector-java</artifactId>
                    <version>5.1.34</version>
                </dependency>
            </dependencies>
            <configuration>
                <overwrite>true</overwrite>
                <configurationFile>src/main/resources/generator.xml</configurationFile>
            </configuration>
        </plugin>
        </plugins>
    </build>
    ```

* 配置**数据库连接信息**

    ```yml
    spring:
        datasource:
            name: mysql_test
            type: com.alibaba.druid.pool.DruidDataSource
            #druid相关配置
            druid:
            #监控统计拦截的filters
            filters: stat
            driver-class-name: com.mysql.cj.jdbc.Driver
            #基本属性
            url: jdbc:mysql://localhost:3306/mybatis?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&serverTimezone=GMT%2B8&useSSL=false
            username: root
            password: jiang110
            #配置初始化大小/最小/最大
            initial-size: 1
            min-idle: 1
            max-active: 20
            #获取连接等待超时时间
            max-wait: 60000
            #间隔多久进行一次检测，检测需要关闭的空闲连接
            time-between-eviction-runs-millis: 60000
            #一个连接在池中最小生存的时间
            min-evictable-idle-time-millis: 300000
            validation-query: SELECT 'x'
            #空闲连接是否被回收
            test-while-idle: true
            #申请连接时是否检测有效性
            test-on-borrow: false
            #归还连接时是否检测有效性
            test-on-return: false
    
    # 配置mybatis映射
    mybatis:
        mapper-locations: classpath:io/jtxyh/webcrm/*/mapper/*.xml
        type-aliases-package: io.jtxyh.webcrm
    ```

* 启动**MapperScan扫描**
    
    ```java
    // 在主启动类上加
    @MapperScan(basePackages = "io.jtxyh.webcrm.*.mapper") // 扫描mapper文件做映射
    ```

* 开启**注解式事务**

    ```java
    // 在主启动类上加
    // 开启事务结合@Transactional注解使用
    @EnableTransactionManagement 
    ```

* **逆向工程插件配置文件**

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN" "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
    <generatorConfiguration>

        <context id="DB2Tables" targetRuntime="MyBatis3">
            <commentGenerator>
                <property name="suppressAllComments" value="true" />
            </commentGenerator>
            <!-- 数据库链接URL、用户名、密码 -->
            <jdbcConnection driverClass="com.mysql.jdbc.Driver" connectionURL="jdbc:mysql://localhost:3306/mybatis" userId="root" password="jiang110">
            <!--<jdbcConnection driverClass="oracle.jdbc.driver.OracleDriver" connectionURL="jdbc:oracle:thin:@localhost:1521:orcl" userId="msa" password="msa">-->
            </jdbcConnection>
            <javaTypeResolver>
                <property name="forceBigDecimals" value="false" />
            </javaTypeResolver>
            <!-- 生成模型的包名和位置 -->
            <javaModelGenerator targetPackage="io.jtxyh.webcrm.sys.entity" targetProject="E:\Private\Java_Notes\04_Advanced\01SpringBoot\webcrm\src\main\java">
                <property name="enableSubPackages" value="true" />
                <property name="trimStrings" value="true" />
            </javaModelGenerator>
            <!-- 生成的映射文件包名和位置 -->
            <sqlMapGenerator targetPackage="io.jtxyh.webcrm.sys.mapper" targetProject="E:\Private\Java_Notes\04_Advanced\01SpringBoot\webcrm\src\main\java">
                <property name="enableSubPackages" value="true" />
            </sqlMapGenerator>
            <!-- 生成DAO的包名和位置 -->
            <javaClientGenerator type="XMLMAPPER" targetPackage="io.jtxyh.webcrm.sys.mapper" targetProject="E:\Private\Java_Notes\04_Advanced\01SpringBoot\webcrm\src\main\java">
                <property name="enableSubPackages" value="true" />
            </javaClientGenerator>
            <!-- 要生成那些表(更改tableName和domainObjectName就可以) -->
            <table tableName="cinfo" domainObjectName="Cinfo" enableCountByExample="false" enableUpdateByExample="false" enableDeleteByExample="false" enableSelectByExample="false" selectByExampleQueryId="false" />
            <table tableName="minfo" domainObjectName="Minfo" enableCountByExample="false" enableUpdateByExample="false" enableDeleteByExample="false" enableSelectByExample="false" selectByExampleQueryId="false" />
        </context>
    </generatorConfiguration>
    ```

#### 5、Redis集成

* 添加redis启动器

    ```xml
    <!--redis整合-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
        <exclusions>
            <exclusion>
                <groupId>io.lettuce</groupId>
                <artifactId>lettuce-core</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
    </dependency>

    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.58</version>
    </dependency>
    ```

* 配置redis

    ```yml
    spring:
      redis:
          host: 127.0.0.1
          port: 6379
          password: root
    ```

* redis使用

    ```java
    @Autowired
    private StringRedisTemplate rt;
    private String key = "uinfo:";

    @GetMapping("select/{uid}")
    public Uinfo selectUinfoById(@PathVariable("uid") String uid){
        // 存储到redis中
        ValueOperations<String, String> ops = rt.opsForValue();
        Uinfo uinfo = null;
        String redisKey = key+uid;
        String ouinfo = ops.get(redisKey);
        if(ouinfo == null){
            uinfo = us.selectByPrimaryKey(uid);
            ops.set(redisKey, JSON.toJSONString(uinfo));
        }else {
            uinfo = JSON.parseObject(ouinfo,Uinfo.class);
        }
        return uinfo;
    }
    ```

* redis默认使用了**StringRedisTemplate**和**RedisTemplate**，做序列化存储
    * **StringRedisTemplate**默认泛型都是String，默认采用**string做序列化**
    * **RedisTemplate**默认泛型都是Object，默认采用**JDK做序列化**
        * 可以重写RedisTemplate方法，改变默认的序列方式

        ```java
        // 自定义RedisTemplate序列化方式
        @Bean
        public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) throws UnknownHostException {
            RedisTemplate<Object, Object> template = new RedisTemplate();
            template.setConnectionFactory(redisConnectionFactory);
            // 设置键的序列化方式为string序列化
            template.setKeySerializer(new StringRedisSerializer());
            // 设置值的序列化方式为fastJson序列化
            template.setKeySerializer(new GenericFastJsonRedisSerializer());
            // 设置hash的值的序列化方式为string
            template.setHashKeySerializer(new StringRedisSerializer());
            // 设置值的序列化方式为fastJson序列化
            template.setHashValueSerializer(new GenericFastJsonRedisSerializer());
            return template;
        }
        ```

* 注解式使用redis

    ![springboot使用Redis注解.png](https://raw.githubusercontent.com/JTXYH/blog_comment/master/blog_imgs/springboot%E4%BD%BF%E7%94%A8Redis%E6%B3%A8%E8%A7%A3.png)

    1. 在启动类上加**@EnableCaching**
    2. 在需要使用redis的类上使用注解
        
        ```java
        /**
        * 先去缓存找，找到返回，找不到查数据加入缓存
        * 在查询方法上加Cacheable注解,先去缓存中找userinfo:23的值，找到则返回，找不到执行方法，把方法返回值加入缓存。
        * condition：方法执行之前的条件判断
        * unless:方法执行完后的条件判断
        * @param uid
        * @return
        */
        @Cacheable(cacheNames = "userinfo",key = "#uid",unless = "#result==null")
        public Uinfo getUserById(@PathVariable("uid") int uid){
            Uinfo sysuser = sm.selectByPrimaryKey(uid);
            return sysuser;
        }
        /**
        * 用在删改的方法上。当删除和修改数据时，把缓存中对应数据删除掉。
        * @param uid
        * @return
        */
        @GetMapping("/udel/{uid}")
        @CacheEvict(cacheNames = "userinfo",key = "#uid")
        public int delUserById(@PathVariable("uid") int uid){
            int rows = sm.deleteByPrimaryKey(uid);
            return rows;
        }
        ```

#### 6、定时任务

* 引入**依赖**

    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-quartz</artifactId>
    </dependency>
    ```

* 在启动类上加注解**开启定时任务**

    ```java
    @EnableScheduling // 开启定时任务
    ```

* 使用

    ```java
    @Component
    public class MyQuery {
        // 每5分钟执行一次
        @Scheduled(cron = "0 0/5 * * * ?")
        public void run(){
            System.out.println("定时任务执行了。。。。");
        }
    }
    ```

#### 7、兼容jsp

* 修改项目为**打war包**的格式

    ```xml
    <packaging>war</packaging>
    <build>
        <finalName>war包名称</finalName>
    </build>
    ```

* 设置内置**tomcat为provided**

    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-tomcat</artifactId>
        <version>2.1.11.RELEASE</version>
        <scope>provided</scope>
    </dependency>
    ```

* 加入**jsp引擎，jstl支持**

    ```xml
    <dependency>
        <groupId>org.apache.tomcat.embed</groupId>
        <artifactId>tomcat-embed-jasper</artifactId>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
    </dependency>
    ```

* 创建**webapp目录**

* 创建**继承SpringBootServletInitializer**类代替web.xml

    ```java
    //等价于web.xml
    public class MyServletInit extends SpringBootServletInitializer {
        @Override
        protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
            return builder.sources(Boot3Application.class);
        }
    }
    ```