---
layout:     post                    
title:      JavaScript
subtitle:   最流行的脚本语言               
date:       2019-10-10               
author:     极客小祥                      
header-img: img/text/19-10-10.jpg   
catalog: true                        
tags:                                
    - WEB
---

# JavaScript
<hr>

#### 1、概念
运行在浏览器的**客户端脚本语言**，**不需要编译**，直接可以被浏览器解析执行
#### 2、功能
可以来增强用户和html的交互过程，控制html元素
#### 3、引入方式
1. **script标签**
2. **scrip标签加src 引用js文件**
3. **在元素的事件中直接编写js代码**

# ECMAScript基本语法
<hr>

* 与html结合方式
    1. 内部JS：**定义\<script\>，标签体内容就是js代码**
    2. 外部JS：**定义\<script\>，通过src属性引入外部js文件**
* 注意：
    1. \<script\>可以定义在**html页面的任何地方。但定义的位置会影响执行顺序**
    2. \<script\>可以**定义多个**

#### 1、注释
1. 单行注释：**//注释内容**
2. 多行注释：**/\*注释内容\*/**

#### 2、数据类型
1. 原始数据类型(基本数据类型)：
    1. number：数字，**整数/小数/NaN(not a number)**
    2. string：**字符串**
    3. boolean：**true和false**
    4. null：**一个对象为空的占位符**
    5. undefined：**未定义**，如果一个变量没有给初始化值，就会被赋值为这个
2. 引用数据类型：对象

#### 3、变量
* 变量：一小块存储数据的内存空间
* Java语言是**强类型语言**，而JavaScript是**弱类型语言**
    1. 强类型：在开辟变量存储空间时，定义了空间将来存储的数据的数据类型。**只能存储固定类型的数据**
    2. 弱类型：在开辟变量存储空间时，不定义了空间将来存储的数据的数据类型。**可以存储任意类型的数据**
* 语法：**var 变量名 = 初始化值;**
* **typeof**运算符：**获取变量类型**
    * 注：**null**运算后得到的是**object**

#### 4、类型转换
1. **parseInt()**：字符串转换为整数
2. **parseFloat()**：字符串转浮点数
3. **toString()**：返回字符串

#### 5、运算符
1. 一元运算符：**只有一个运算符的运算符**
    * **++，--，+-(正负号)**
    * 注意：如果运算符前**有正负号**，在JS中，如果运算数不是运算符所要求的类型，那么js引擎会**自动的将运算数进行类型转换**
        1. **string转number**：按照字面值转换，如果字面值**不是数字，则转为NaN**
        2. **boolean转number**：true转为1，false转为0
2. 算数运算符
    * **+，-，*，/，%**
3. 赋值运算符
    * **=，+=，-=，......**
4. 比较运算符
    * **\<，\>，\>=，\<=，==，===(全等于)**
    * 比较方式：
        1. **类型相同**：直接比较
            * 字符串比较会按照**字典顺序比较，按位逐一比较，直到得出大小停止**
        2. **类型不同**：先进行类型转换再比较
            * **===**：全等于。在进行比较之前，**先判断类型是否一致，不一致直接返回false**
5. 逻辑运算符
    * **&&，\|\|，!**
    * **其他类型转boolean**
        1. number：**0或NaN为假，其他为真**
        2. string：**除了空字符串为假，其他为真**
        3. null和undefined：**都是false**
        4. 对象：**所有对象都为true**
6. 三元运算符
    * **表达式?值1:值2**

7. 注意：

#### 6、流程控制语句
1. **if...else**
2. **switch**
    * 在**Java**中，switch语句可以接收的数据类型：**byte,int,short,char,枚举(1.5),String(1.7)**
    * 在**JS**中，switch语句可以接收**任意数据类型**
3. **while**
4. **do...while**
5. **for**

#### 7、JS特殊语法
1. **语句;结尾**，如果一行只有一条语句，**可以省略**(不推荐)
2. 变量的定义是用**var关键字**，也可以不使用
    * 用var：定义的变量是**局部变量**
    * 不用var：定义的变量是**全局变量**(不建议)

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>99乘法表</title>
	<style>
		td{
			border: 1px solid;
		}
	</style>
</head>
<script>
	// 表格嵌套
	document.write("<table align='center'>");
	for (var i = 1; i <= 9; i++) {
		// 嵌套tr标签
		document.write("<tr>");
		for(var j = 1; j <= i; j++){
			// 嵌套td标签
			document.write("<td>");
			document.write("i * j = "+i*j+"&nbsp&nbsp&nbsp");
			// 嵌套td标签结束
			document.write("</td>");
		}
		// 嵌套tr标签结束
		document.write("</tr>");
	}
	//表格嵌套结束
	document.write("</table>");
</script>
<body>
	
</body>
</html>
```

#### 8、系统函数
1. **isNaN()**判断是否是数字
2. **eval()**解析可计算的js格式字符串

# ECMAScript基本对象
<hr>

#### 1、Function函数(方法)对象
* 创建：
    1. **var 方法名 = new Function(形式参数列表,方法体)**(不推荐)
    2. **function 方法名称(形式参数列表){方法体}**
    3. **var 方法名 = function(形式参数列表){方法体};**
        ```html
        <script>
            // 第一种
            var fun1 = new Function("a","b","alert(a);");

            // 第二种
            function fun2(a,b){
                alert(a+b);
            }

            // 第三种
            var fun3 = function(a,b){
                alert(a+b);
            };
        </script>
        ``` 
* 属性：
    * **length**：代表形参的个数
* 特点：
    1. 方法定义时，**形式参数类型不用写，返回值类型也不写**
    2. 方法是一个**对象**，如果定义名称相同的方法，**会被覆盖**
    3. 在JS中，方法的调用**只和方法的名称有关，和参数列表无关**
    4. 在方法声明中有一个隐藏的内置对象(数组)**arguments**，**封装所有的实际参数**
* 调用：**方法名称(实际参数列表);**

#### 2、Array数组对象
* 创建：
    1. **var 方法名 = new Array(元素列表);**
    2. **var 方法名 = new Array(默认长度);**
    3. **var 方法名 = \[元素列表\]**
        ```html
        <script>
            // 第一种
            var arr1 = new Array(1,2,3);
            
            // 第二种
            var arr2 = new Array(5);
            
            // 第三种
            var arr3 = [1,2,3,4];
        </script>
        ```
* 属性：
    * **length**：数组的长度
* 方法：
    1. **join(参数)**：将数组中的元素按照指定的分隔符拼接字符串
    2. **push(参数)**：在集合尾部添加一个或多个元素
* 特点：
    1. JS中，数组元素的**类型是可变的**
    2. JS中，数组的**长度是可变的**

#### 3、Date
* 创建：**var 方法名 = new Date();**
* 方法：
    1. **toLocaleString()**：返回为本地时间字符串格式
    2. **getMonth()**：返回月(0~11)
    3. **getDate()**：返回日(1~31)
    4. **gerDay()**：返回星期(0~6)
    5. **getHours()**：返回小时(0~23)
    6. **getMinutes()**：返回分钟(0~59)
    7. **getSeconds()**：返回秒数(0~59)
    8. **getFullYear()**：返回年。4位数年份
    9. **getTime()**：返回1970年1月1日至今的毫秒数

#### 4、Math
* 创建：Math对象**不用创建，直接使用**
* 方法：
    1. **random()**：**[0,1)**之间的随机数
    2. **ceil(值)**：向上取整
    3. **floor(值)**：向下取整
    4. **round(值)**：四舍五入
* 属性：**PI**和其他。。
#### 5、RegExp(正则)
* 正则表达式[https://jtxyh.github.io/2018/11/27/正则表达式/]
#### 6、Global
#### 7、其他
1. **Boolean**
2. **Number**
3. **String**