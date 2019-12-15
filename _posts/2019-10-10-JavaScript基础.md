---
layout:     post                    
title:      JavaScript基础
subtitle:   最流行的脚本语言               
date:       2019-10-10               
author:     极客小祥                      
header-img: img/text/WEB.jpg   
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
4. 
    * 与html结合方式
        1. 内部JS：**定义\<script\>，标签体内容就是js代码**
        2. 外部JS：**定义\<script\>，通过src属性引入外部js文件**
    * 注意：
        1. \<script\>可以定义在**html页面的任何地方。但定义的位置会影响执行顺序**
        2. \<script\>可以**定义多个**

# ECMAScript基本语法
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
* **语法**：
    1. **var 变量名 = 初始化值;**

        ```javascript
        function foo() {
            for (var i=0; i<100; i++) {
                //
                }
            i += 100; '仍然可以引用变量i'
            }
        ```

    2. **let 变量名 = 初始化值;**
        * 可以申明一个**块级作用域**的变量
    
        ```javascript
        function foo() {
            for (let i=0; i<100; i++) {
                //
                }
            i += 100; '语法错误'
            }
        ```

    3. **const 大写变量名 = 初始化值;**
        * 声明一个**常量**

        ```javascript
        const A = 1;
        A = 3;  '赋值没有效果'
        console.log(A);  '结果还是1'
        ```

    4. **解构赋值**
        * 同时对多个变量赋值
        * 使用解构赋值对对象属性进行赋值时，如果**对应的属性不存在，变量将被赋值为undefined**

        ```javascript
        // let [x,y,z] = [1,2,3] 或者 let [,,z] = [1,2,3]
        var [x,y,z] = [1,2,3];
        console.log(x+y+z); '输出6'

        var data = {'name':'小米','modal':'Y999'，'price':'2999'};
        var {name,modal,price} = data;
        console.log(name); '输出小米'

        var data2 = {'name':'张三','address':{'city':'郑州','street':'999号'}};
        var {name,address:{city,street}} = data2;
        console.log(city); '输出郑州'

        var data3 = {'name':'张三','pId':'1001'};
        'pId:id这样写是为了让id获取到pId的值'
        var {name,pId:id} = data3;
        console.log(id); '输出1001'

        var data4 = {'name':'张三','pId':'1001'};
        "id='无id' 是设置默认值，如果没有id属性就设置为无id，不会显示undefined"
        var {name,id='无id'} = data4;
        console.log(id); '输出无id'

        "声明变量"
        var x, y;
        "解构赋值，必须加上()不然会报语法错误"
        ({x,y} = {'x':100,'y':200});
        console.log(x+y); '输出300'
        "交换变量"
        [x,y] = [y,x];
        console.log(x); '输出200'

        "获取当前页域名和路径"
        var {hostname:domain, pathname:path} = location;
        ```


* **typeof**运算符：**获取变量类型**
    * 注：**null**运算后得到的是**object**

#### 4、运算符
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

#### 5、流程控制语句
1. **if...else**
2. **switch**
    * 在**Java**中，switch语句可以接收的数据类型：**byte,int,short,char,枚举(1.5),String(1.7)**
    * 在**JS**中，switch语句可以接收**任意数据类型**
3. **while**
4. **do...while**
5. **for**
6. **for ... of**

    ```javascript
    var array = ['1','2','3'];
    for(var a for array){
        console.log(a); // 输出 1 2 3
    }
    ```
7. **forEach**
    * 在**Array**中
        * **element**：指向当前元素的**值**
        * **index**：指向当前**索引**
        * **array**：指向Array**对象本身**
    * 在**Set**中
        * **element**：指向当前元素的**值**
        * **sameElement**：指向当前**对象本身**
        * **set**：指向Set**对象本身**
    * 在**Map**中
        * **value**：指向当前元素的**值**
        * **key**：指元素的**键**
        * **map**：指元素的**本身**

    ```javascript
    var array = ['1','2','3'];
    array.forEach(function(element,index,array){})
    // 或者这样写
    array.forEach(function(element){})

    var set = new Set(['1','2','3']);
    set.forEach(function(element,sameElement,set){})
    // 或者这样写
    set.forEach(function(element){})

    var map = new Map([[1,'x'],[2,'y']])
    // 或者这样写
    map.forEach(function(value){})
    ```

#### 6、JS特殊语法
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

7. 严格模式 
* 使代码显示地 脱离**马虎模式/稀松模式/懒散模式（sloppy）模式**
    1. 通过抛出错误来消除了一些原有静默错误。
    2. 修复了一些导致JavaScript引擎难以执行优化的缺陷：有时候，相同的代码，严格模式可以比非严格模式下运行得更快。
    3. 禁用了在ECMAScript的未来版本中可能会定义的一些语法。
* 使用
    * 在JavaScript文件的开头**加上'use strict';**
    * 在某个函数中**加上'use strict';**开启严格模式

    ```javascript
    "对当前整个javascript开启严格模式"
    'use strict';
    var a = 'a';
    ```

    ```javascript
    function a(){
        "对当前方法开启严格模式"
        'use strict';
    }
    ```

# ECMAScript基本对象
<hr>

#### 1、Function函数(方法)对象
* 创建：

    ```javascript
    "var 方法名 = new Function(形式参数列表,方法体)(不推荐)"
    var fun1 = new Function("a","b","alert(a);");

    "function 方法名称(形式参数列表){方法体}"
    function fun2(a,b){
        alert(a+b);
    }

    "var 方法名 = function(形式参数列表){方法体}"
    var fun3 = function(a,b){
        alert(a+b);
    };
    ``` 

* 属性：
    * **length**：代表形参的个数
* 特点：
    1. 方法定义时，**形式参数类型不用写，返回值类型也不写**
    2. 方法是一个**对象**，如果定义名称相同的方法，**会被覆盖**
    3. 在JS中，方法的调用**只和方法的名称有关，和参数列表无关**
    4. 在方法声明中有一个隐藏的内置对象(数组)**arguments**，**封装所有的实际参数**
    5. 在ES6中新加入**rest参数**用于封装,rest参数**只能写在最后**，**用...标识**

        ```javascript
        function myfun(a,...rest){
            console.log(a); '输出'
            console.log(rest); '输出[2,3,4]'
        }
        myfun(1,2,3,4,);
        ```

* **方法**：
    * **this关键字**

    ```javascript
    var data = {
        name:'张三',
        age:function(){
            console.log(this.name); '输出张三'
        },
    }

    ```
    * **apply使用**：接收两个参数，**第一个参数就是需要绑定的this变量**，第二个参数是**Array，表示函数本身的参数**

    ```javascript
    function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
    }

    var data = {
        name: '小明',
        birth: 1990,
        age: getAge
    };

    xiaoming.age(); '输出25'
    getAge.apply(data, []); '输出25, this指向xiaoming, 参数为空'
    ```

    * **call使用**：apply**把参数打包成Array**再传入，call**把参数按顺序**传入

    ```javascript
    "判断最大值"
    Math.max.apply(null, [3, 5, 4]);  '输出5'
    Math.max.call(null, 3, 5, 4);  '输出5'
    ```

    * **装饰器概念**

    ```javascript
    "统计页面总共使用了多少次parseFloat"
    var count = 0;
    var oldParseFloat = parseFloat;
    
    window.parseFloat = function(){
    	count += 1;
    	"调用原函数"
    	return oldParseFloat.apply(null,arguments);
    }

    var jj = 1;
    var jj2 = 2;
    var jj3 = 3;
   	parseFloat(jj);
   	parseFloat(jj2);
   	parseFloat(jj3);
   	console.log(count); '输出3'
    ```

* 调用：**方法名称(实际参数列表);**

#### 2、Array数组对象
* 创建：
    1. **var 方法名 = new Array(元素列表);**
    2. **var 方法名 = new Array(默认长度);**
    3. **var 方法名 = \[元素列表\]**
        ```javascript
        // 第一种
        var arr1 = new Array(1,2,3);
        
        // 第二种
        var arr2 = new Array(5);
        
        // 第三种
        var arr3 = [1,2,3,4];
        ```

* 方法：
    * **map**方法：调用**Array的map\(\)方法**，传入**我们自己的函数**，可以**得到一个新的Array**作为结果

    ```javascript
        function f(x){
        return x*10;
    }

    var array = [1,2,3,4];
    var result = array.map(f);
    console.log(result); '输出[10, 20, 30, 40]'

    var result2 = array.map(String);
    console.log(result2); '输出["1", "2", "3", "4"]'
    ```

    * **reduce**方法：**Array的reduce\(\)**把一个函数作用在这个**Array的\[x1, x2, x3...\]上**，这个函数**必须接收两个参数**，reduce\(\)把**结果继续和序列的下一个元素做累积**

    ```javascript
    var arr = [1, 3, 5, 7, 9];
    arr.reduce(function (x, y) {
        return x + y; '返回25'
    });
    ```

    * **filter**方法：**Array的filter\(\)**方法把传入的函数**依次作用于每个元素**，然后**根据返回值是true还是false**决定**保留还是丢弃**该元素

        * **element*：指的是**数组中的单个元素**
        * **index*：指的是**数组中的索引**
        * **self*：指的是**数组本身**

    ```javascript
    "排除空字符串"
    var array = ['1','','2'];
    var newAarray = array.filter(function (element,index,self){
        return element !== ''; '输出['1','2']'
    });
    ```

    * **sort**方法：对Array进行排序，会把传入的**数字转为字符串**进行排序，**默认排序规则是根据ASCII码**，所以对数字排序会**出现异常**，不过sort也是一个高阶函数，可以**自定义排序规则**

    ```javascript
    "返回0和-1时不排序，返回1时进行升序排序"
    "降序排序"
    var arr = [10, 20, 1, 2];
    arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
    });
    ```

    * **every**方法：判断**数组的所有元素是否满足测试条件**

    ```javascript
    var arr = [1,2,3];
    var re = arr.every(function(s){
        return s>2;
    })
    console.log(re); '输出false，因为有一个不满足条件就是false'
    ```

    * **find**方法：**查找**符合条件的**第一个元素**，如果**找到了，返回这个元素**，**没找到返回undefined**

    ```javascript
    var arr = ['a','b','c'];
    var re = arr.find(function(s){
        return s === 'a';
    })
    console.log(re); '输出a'
    ```

    * **findIndex**方法：查找符合条件的**第一个元素**，**找到返回索引，找不到返回-1**

    ```javascript
    var arr = ['a','b','c'];
    var re = arr.findIndex(function(s){
        return s === 'a';
    })
    console.log(re); '输出0'
    ```

    * **forEach**方法：和**map\(\)类似**，每个元素依次作用于传入的函数，但不会返回新的数组
        * **element*：指的是**数组中的单个元素**
        * **index*：指的是**数组中的索引**
        * **self*：指的是**数组本身**

    ```javascript
    var arr = ['a','b','c'];
    arr.forEach(function(element,index,self){
        console.log(element); '输出的是a b c'
        console.log(index); '输出的是 0 1 2 '
        console.log(self); "输出的是['a','b','c']"
    });
    ```

* 属性：
    * **length**：数组的长度
* 方法：
    1. **join(参数)**：将数组中的元素按照指定的分隔符拼接字符串
    2. **push(参数)**：在尾部添加一个元素
    3. **sort()**：排序
    4. **pop()**：删除尾部元素
    5. **shift()**：删除头部元素
    6. **unshift()**：在头部添加一个元素
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
* 使用：[正则表达式教程](https://jtxyh.github.io/2018/11/27/正则表达式/)
* 创建：
    1. **var 名字 = new RegExp("正则表达式");**
    2. **var 名字 = /正则表达式/;**
* 方法：
    1. **test(参数)**：**验证**指定的字符串是否符合正则的规范

#### 6、Global
* 特点：**全局对象**,Global封装的方法不需要对象就可以**直接调用**
* 方法：
    1. **encodeURI()**：URL**编**码
    2. **decodeURI()**：URL**解**码
    3. **encodeURIComponent()**：URL**编**码，编码的字符更多一些
    4. **decodeURIComponent()**：URL**解**码
    5. **isNaN()**：判断是否是NaN
        * **NaN**和什么判断都是**false**,包括自己
    6. **eval()**：将JavaScript字符串转为脚本代码执行
    7. **parseInt()**：字符串转换为整数
    8. **parseFloat()**：字符串转浮点数
    9. **toString()**：返回字符串

#### 7、其他
1. **Boolean**
2. **Number**
    * 方法
        1. **toString(数字)**：把数字转换为字符串
        2. **valueOf()**：返回一个Number对象的基本数字值。
3. **String**
    * 方法
        1. **indexOf(字符)**：查找指定字符
        2. **subString(开始位置,结束位置)**：截取字符串
        3. **substr(开始位置,截取个数)**：截取字符串，
        4. **split(指定分割字符)**：分割
        5. **toUppercase()**：转大写
        6. **replace(正则,字符串)**：替换与正则表达式匹配的子串
        7. **lastIndexOf(字符串)**：从后向前搜索字符串
4. **Map**
    * 创建：
        1. **var map = new Map\(\)**
        2. **var map = \['Michael', 'Bob', 'Tracy'\]**
    * **注意**：如果一个键已经存在，再存一次就会**覆盖前面的值**
    * 方法
        1. **set\(键，值\)**：**存储**键值对
        2. **has\(键\)**：判断**是否存在该键**，返回true和false
        3. **get\(键\)**：通过**键获取值**
        4. **delete\(键\)**：**删除**该键
5. **Set**
    * 创建：
        1. **var set = new Set\(\)**
        2. **var s2 = new Set\(\[1, 2, 3\]\)**
    * 方法：
        1. **add\(值\)**：添加
        2. **delete\(值\)**：删除

# 扩展
#### 1、高阶函数
* 基础：指的是**一个函数，可以接收一个函数参数**

    ```javascript
    function f(x){
        return x*10;
    }

    function test(x,f){
        console.log(f(x)); '输出20'
    }

    '不需要传入()，只需要传入函数名字就可以'
    test(2,f);
    ```

* **函数作为返回值**

    ```javascript
    function test(arr){
        var t = function(){
            return arr.reduce(function(x,y){
                return x+y;
            });
        }
        return t;
    }

    var f1 = test([1,2,3]);
    var f2 = test([1,2,3]);
    console.log(f1); '输出的是函数体'
    console.log(f1()); '输出6'
    '多个函数体的调用互不影响'
    console.log(f1 === f2); '输出fasle'
    ```

#### 2、箭头函数
* ES6标准新增了一种新的函数

    ```javascript
    var t = x => x+10;

    '上面的相当于下面'

    function t(x){
        return x+10;
    }
    ```

* **多个参数**需要用\(\)括起来

    ```javascript
    var fn = (x,y)=>{
        if(x>y){
            return 'x比y大';
        }else{
            return 'y比x大';
        }
    }
    console.log(fn(10,11)); // 输出y比x大
    ```

* **可变参数**

    ```javascript
    var fn = (x,y,...rest)=>{}
    ```

* **返回json对象**

    ```javascript
    var fn =  (x,y) => ({ x: x ,y:y})
    console.log(fn(10,11)); '输出{x:10,y:11}'
    ```

#### 3、generator
* **generator生成器**是ES6标准引入的新的数据类型。**可以返回多次**
* 使用**function\*定义**
* 通过**yield关键字**可以实现返回
* 取值时需要使用**next\(\)**
* **done表示这个方法是否已经执行结束**，false表示没有执行结束，true表示执行结束

    ```javascript
    function* g(x){
        yield x+10;
        yield x+11;
        return x+12;
    }

    var g = g(10);
    console.log(g.next()); '输出{value: 20, done: false}'
    console.log(g.next()); '输出{value: 21, done: false}'
    console.log(g.next()); '输出{value: 22, done: true}'
    console.log(g.next()); '输出{value: undefined, done: true}'

    "使用for ... of**
    for(let x of g){
        console.log(x); '输出20,21'
    }
    ```