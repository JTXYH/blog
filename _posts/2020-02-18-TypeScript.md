---
layout: post
title: TypeScript
subtitle: 重要的前端知识
date: 2020-02-18
author: 极客小祥
header-img: img/text/WEB.jpg
catalog: true
tags:
  - WEB
---

# TypeScript

## 简介
* TypeScript是JavaScript的一个超集，主要提供了**类型系统和对ES6的支持**，由微软开发开源
* TypeScript增加了**代码的可读性和可维护性**

### 1、安装

1. 全局安装：**npm i -g typescript**
2. 编译文件：**tsc hello.ts**
3. 约定文件以**.ts为后缀**，编写**react时以.tsx为后缀** 

## 数据类型

### 1、基本类型
* **string,number,boolean,null,undefined,enum,symbol**
* 空值一般用**void**表示，void可以表示**变量**，也可以表示**函数无返回值**
* **任意值Any**，用来表示允许赋值为任意类型，变量在声明时**未指定类型并且未赋值**，就是**任意值**

```ts
var str:string = "hello"
var num:number = 1
var bo:boolean = true
var un:undefined = undefined
var nu:null = null
var an:any = "1"
var an2 // 声明未赋值，未指定类型，就为任意值

an = 1
an2 = true
an2 = "str"

// undefined和null是其他类型的子类型
// 所以str可以赋值为undefined和null
str = undefined
str = null

// void规定函数无返回值
var fun = function():void{
    //xxxxx
}
```

### 2、联合类型
* 联合类型表示取值可以为**多类型中的一种**，只能访问联合类型中**共有的属性和方法**

```ts
var t:string|number = "11"
t = 1

// string和number都有toString()方法
console.log(t.toString())
```

#### 3、对象类型
* **接口**：可描述的一部分抽象行为，接口中可定义**可选属性，只读属性，任意属性**

```ts
// 接口
// 强约束
interface Ista {
  name: string;
  age: number;
}

var obj1: Ista;
obj1 = { name: "名字", age: 10 };

// 可选属性
interface Ista2 {
  name: string;
  age?: number; //?代表可有可无的属性
}
var obj2: Ista2;
obj2 = { name: "hh" }; // 不赋值age也没事

// 动态属性
interface Ista3 {
  name: string | number; // 联合类型
  age?: number;
  [propName: string]: any; // 动态属性，必须指定any
}
var obj3: Ista3;
obj3 = { name: "xxx", sex: "男", home: "河南" }; // 可以动态添加

// 只读属性
interface Ista4 {
  name: string;
  readonly age?: number;
}
var obj4: Ista4 = { name: "张三", age: 20 };
obj4.name = "李四" // 可以更改
// obj4.age = 10  // 报错，后续不能修改
```

### 4、数组类型
* **类型加方括号**

```ts
var arr: number[] = [1, 2, 3];
var arr2: string[] = ["1", "2", "3"];
var arr3: any[] = ["1", 1, true];
```

* 数组**泛型 Array\<elemType\>表示法**

```ts
var arr: Array<number> = [1, 2, 3];
var arr2: Array<string> = ["1", "2", "3"];
var arr3: Array<any> = ["1", 1, true];
```

* **接口表示法**

```ts
interface Istate {
  name: string;
  age: number;
}

interface IArr {
  // 限制这个接口的数组类型为另一个接口的对象
  [index: number]: Istate;
}

var arrType: IArr = [{ name: "张三", age: 10 }];
var arrType2: Array<Istate> = [{ name: "张三", age: 10 }];
var arrType3: Istate[] = [{ name: "张三", age: 10 }];
```

### 5、函数类型

* **声明类函数**

```ts
function fun1(name: string, age: number): number {
  return age;
}
var ageNum: number = fun1("张三", 19);

// 函数参数不确定时
function fun2(name: string, age: number, sex?: string): number {
  return age;
}
var ageNum2: number = fun2("张三", 19, "女");

// 赋值默认值
function fun3(name: string = "李四", age: number = 10, sex?: string): number {
  return age;
}
var ageNum2: number = fun3("张三", 19, "女");

```

* **表达式类型函数**

```ts
var fun4: (name: string, age: number) => number = function(
  name: string = "李四",
  age: number = 10
): number {
  return age;
};

interface Ifun {
  (name: string, age: number): void; // 无返回值
}
var fun5: Ifun = function(name: string = "李四", age: number = 10) {};
```

* **联合类型函数**

```ts
// 对于联合类型的函数，可以采用重载的方式
function getValue(value: number): number;
// 重载
function getValue(value: string): string;
function getValue(value: number | string): number | string {
  return value;
}
var a: number = getValue(1);
var b: string = getValue("1");
```

## 类型断言

* 语法：**\<类型\>值**或者**as类型**
* 类型断言**不是类型转换**，不能断言联合类型中**不存在的类型**

```ts
function getAssert(name: string | number) {
  //   return (<string>name).length;
  return (name as string).length;
}
```

## 类型别名

* 给类型起一个名字，采用关键字**type**

```ts
// 类型别名
type strType = string | number | boolean;
var str: strType = "10";
str = 10;
str = true;

// 接口类型别名
interface muchType1 {
  name: string;
}
interface muchType2 {
  age: number;
}

type muchType = muchType1 | muchType2;
var obj1: muchType = { name: "张三" };
var obj2: muchType = { age: 10 };
var obj3: muchType = { name: "张三", age: 10 };

// 限制字符串
type sex = "男" | "女";

function getSex(s:sex): string {
  return s;
}
getSex("男");
```

## 枚举

* 枚举成员会被赋值**从0开始递增的数字**，同时也会被**枚举值到枚举名进行反向映射**
* 枚举类型会被编译成一个**双向映射的对象**

```ts
enum Days {
  Sun,
  Mon,
  Tue,
  Web,
  Thu,
  Fri,
  Sat
}
console.log(Days.Sun) // 打印0
console.log(Days.Sat) // 打印6
console.log(Days[1] === "Mon"); // true

enum Days2 {
    Sun = 3,
    Mon,
    Tue,
}
console.log(Days.Sun); // 打印3
```

## 类修饰符
* **public,private,protected**

```ts
class Person {
  // 当一个类的成员变量没有修饰的时候，默认是public进行修饰
  name = "张三";
  // 设置private在外界不能访问
  private age = 10;
  protected sex = "男";
  say() {
    console.log("我的名字：" + this.name);
  }
}

var p = new Person();
p.say();
p.name;

// 创建子类
class Child extends Person {
  eat() {
    // 访问父类的方法,用super
    // 不能访问父类的private属性
    super.say();
    // 可以访问protected属性的
    console.log(super.sex);
  }
  // 静态方法不需要实例对象就可以调用
  // 静态方法中不能用 this
  static test(){
      console.log("test")
  }
}

var c = new Child();
c.eat();
// 子类继承了父类，子类就可以访问到父类的公开的属性和方法
c.name;
// 可以直接调用静态方法
Child.test()
```

## 泛型

```ts
function getArr<T>(length: number, value: T): Array<T> {
  let arr = [];
  for (var i = 0; i < length; i++) {
    arr[i] = value;
  }
  return arr;
}

var strArr: string[] = getArr<string>(6, "1");
// 不传类型的时候，根据数字类型倒推
var numArr: number[] = getArr(6, 1);


// 接口中使用泛型
interface IgetArr {
  <T>(name: string, value: T): Array<T>;
}

let fun: IgetArr;
fun = function(name: string, value: T): Array<T> {
  return [];
};

var s: number[] = fun("张三", 1);
```