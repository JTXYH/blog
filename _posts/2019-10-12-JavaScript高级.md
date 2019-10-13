---
layout:     post                    
title:      JavaScript高级
subtitle:   最流行的脚本语言               
date:       2019-10-10               
author:     极客小祥                      
header-img: img/text/19-10-10.jpg   
catalog: true              
tags:                                
    - WEB
---

# BOM：
<hr>

1. 概念：**Browser Object Model(浏览器对象模型)**，将浏览器的各个组成部分**封装为对象**
2. 组成：
    * **Window**：窗口对象
    * **Navigator**：浏览器对象
    * **Screen**：显示器屏幕对象
    * **History**：历史记录对象
    * **Location**：地址栏对象

#### 1、Window
* **特点**：
    1. Window对象**不需要创建**，可以直接使用。**window.方法名();**
    2. window引用可以省略。**方法名();**
* **方法**：
    * 与**弹出框有关**的方法
        1. **alert(内容)**：显示一段消息和一个确认按钮的**警告框**
        2. **confirm(内容)**：显示一段消息和确认按钮和取消按钮的**对话框**
            * 如果点击**确定**则方法返回**true**
            * 如果点击**去下***则方法返回**false**
        3. **prompt()**：显示可提示用户输入的**对话框**
            * 返回值：获取用户**输入的值**
    * 与**开发关闭有关**的方法：
        1. **close()**：关闭浏览器窗口，谁调用就关谁
        2. **open(可以写新窗口的地址)**：打开一个新的浏览器窗口，**返回新的window对象**
    * 与**定时器有关**的方法：
        1. **setTimeout("函数()",毫秒数)**：在指定毫秒数后执行函数，只**执行一次**，返回一个**id**，用于取消定时器
        2. **clearTimeout(定时器id)**：取消**setTimeout()**方法设置的timeout
        3. **setInterval("函数()",毫秒数)**：在指定毫秒数后执行函数，**一直执行**，返回一个**id**，用于取消定时器
        4. **clearInterval(定时器id)**：取消**setInterval()**方法设置的timeout
* **属性**：
    1. **获取其他BOM对象**：
        * history
        * location
        * Navigator
        * Screen
    2. **获取DOM对象**
        * document

#### 2、Location
* 创建(获取)：
    1. **window.location**
    2. **location**
* 方法：
    1. **reload()**：重新加载当前文档(刷新)
* 属性：
    1. **href**：设置或返回完整的URL

#### 3、History
* 创建(获取)：
    1. **window.history**
    2. **history**
* 属性：**length**，返回**当前窗口**历史列表中的URL数量
* 方法：
    1. **back()**：加载**前一个**URL
    2. **forward()**：加载**下一个**URL
    3. **go(参数)**：加载某一个具体页面
        * 参数如果是**正数**，表示前进几个历史记录，**负数**，表示后退几个历史记录

# DOM：
<hr>

* 概念：**Document Object Model(文档对象模型)**，将标记语言文档的各个组成部分**封装为对象**。可以使用这些对象，对标记语言文档进行**CRUD**操作
* W3C DOM标准模型：
    1. **核心DOM**-针对任何结构化文档
        * **Document**：文档对象
        * **Element**：元素对象
        * **Attribut**：属性对象
        * **Text**：文本对象
        * **Comment**：注释对象
        * **Node**：节点对象，其他几个的**父对象**
    2. **XML DOM**-针对XML文档
    3. **HTML DOM**-针对HTML文档

#### 1、核心DOM模型
* **Document**：文档对象
    1. 创建(获取)：在html dom模型中使用**window对象来获取**
        * **window.document**
        * **document**
    2. 方法：
        1. **获取Element对象**
            * **getElementById()**：根据id获取元素对象
            * **getElementsByTagName()**：根据元素名称获取所有元素对象，**返回数组**
            * **getElementsByClassName()**：根据class获取所有元素对象，**返回数组**
            * **getElementsByName()**：根据name属性值获取所有元素对象，**返回数组**
        2. **创建其他DOM对象**

* **Element**：元素对象
* **Node**：节点对象

#### 2、HTML DOM

# 事件
<hr>

* 功能：**某些组件被执行了某系操作后，触发某些代码的执行**
* 绑定事件：
    1. **直接在html标签上，指定事件的属性(操作)，属性值就是js代码**
    2. **通过js获取元素对象，指定事件属性，设置一个函数**

