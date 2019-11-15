---
layout:     post                    
title:      Junit和Spring                     
subtitle:   Important               
date:       2019-11-15               
author:     极客小祥                      
header-img: img/text/JAVA.jpg   
catalog: true                        
tags:                                
    - JAVA
---

# Junit
#### 1、测试分类
1. 黑盒测试：**不需要写代码，给输入值**，看程序是否能够输出期望的值
2. 白盒测试：**需要写代码**，关注程序的执行流程，**Junit属于白盒测试**
 
#### 2、步骤

1. 定义一个测试类
    * 测试类名：**被测试的类名+Test**
    * 包名：**xxx.xx.test**
2. 定义测试方法：可以独立运行
    * 方法名：**test+测试的方法名**
    * 返回值：**void**
    * 参数列表：**空参**
3. **导入Junit依赖环境**
4. 给方法**加@Test**
5. 加**断言操作**：**Assert.assertEquals(期望的结果,运算的结果)**
6. 在测试类类名上加**@FixMethodOrder\(MethodSorters.NAME_ASCENDING\)**，所有**@Test测试的执行顺序为字典的顺序执行**

```java
@Test
public void testAdd(){
    '调用方法'
    Assert.assertEquals(期望的结果,运算的结果);
    Assert.assertNull(需要判断的变量); // 判断是否是null
}
```

#### 3、其他注解

```java

"设置@Test方法的执行顺序为字典的顺序执行"

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TestJunit {
    @BeforeClass
    public static void test2() {
        System.out.println("所有方法开始执行之前执行，必须是static的");
    }

    @Before
    public void test4() {
        System.out.println("每个Test方法开始执行之前执行");
    }


    @Test
    public void test9() {
        Integer i = null;
        System.out.println("执行@Test9中的代码。。。。");

        "断言类，预期结果如果和判断结果不一致时会报一个Failures"
        Assert.assertNull(i);
    }

    @Test
    public void test6() {
        System.out.println("执行@Test2中的代码。。。。");
    }

    @After
    public void test5() {
        System.out.println("每个Test方法执行后执行");
    }

    @AfterClass
    public static void test3() {
        System.out.println("所有方法执行完成后执行，必须是static的");
    }
}
```

# Spring和Junit
* 需要在测试类上加**@RunWith\(SpringJUnit4ClassRunner.class\)**和**@ContextConfiguration("classpath:加载的配置文件名称")**

```java
@RunWith(SpringJUnit4ClassRunner.class)
"加载配置文件"
@ContextConfiguration("classpath:applicationContext.xml")
public class TestSpringContainer {
	"自动配置成员变量"
	@Autowired
	private UserDaoImpl ud;
	
	@Test
	public void test1() {
		UserInfo user = ud.getUser();
		System.out.println(user);
	}
}
```