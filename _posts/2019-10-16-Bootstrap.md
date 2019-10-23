---
layout:     post                   
title:      Bootstrap
subtitle:   前端框架               
date:       2019-10-16               
author:     极客小祥                      
header-img: img/text/WEB.jpg   
catalog: true              
tags:                                
    - WEB
---

# Bootstrap
<hr/>

1. 支持响应式布局：**同一套页面兼容不同分辨率设备**
2. 下载：点击-->[Bootstrap](https://v3.bootcss.com)
3. 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>Bootstrap HelloWorld</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">


    <!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
    <script src="js/jquery-3.4.1.min.js"></script>
    <!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
    <script src="js/bootstrap.min.js"></script>
</head>
<body>
<h1>Hello World</h1>

</body>
</html>
```

# 响应式布局
<hr/>

* 实现：依赖**栅格系统**，将一行平均分为**12个格子**，可以指定元素占几个格子
* 步骤：
    1. **定义容器**，相当于\(table\)
        1. **container**： 两边有留白
        2. **container-fluid**：100%宽度
    2. **定义行**，相当于\(tr\)，样式是**row**
    3. **定义元素**，指定该元素在不同设备上所占的格子数目，样式是**col-设备代号-格子数目**
        * 设备代号
            1. **xs**：超小屏幕\(<768px\)
            2. **sm**：小屏幕\(>=768px\)
            3. **md**：中等屏幕\(>=992px\)
            4. **lg**：大屏幕\(>=1200px\)
    4. **注意**：
        1. 一行中格子数**超过12，自动换行**
        2. 栅格类属性**向上兼容**
        3. **向下不兼容**，如果设置的设备宽度小于了设置的栅格类属性的设备代码最小值，**会一个元素占满一整行**


# CSS样式和JS插件
<hr/>

1. **全局CSS样式**：
    * 按钮：class="btn btn-default"
    * 图片：
        *  class="img-responsive"：图片在任意尺寸都占100%
        *  图片形状
        ```html
        <img src="..." alt="..." class="img-rounded">：方形
        <img src="..." alt="..." class="img-circle"> ： 圆形
        <img src="..." alt="..." class="img-thumbnail"> ：相框
        ```
    * 表格
        * **table**
        * **table-bordered**
        * **table-hover**
    * 表单
        * 给表单项添加：class="form-control" 
2. **组件**：
    * 导航条
    * 分页条
3. **插件**：
    * 轮播图

CSS教程查看--->[BootstrapCSS教程](https://v3.bootcss.com/css/)<br/>
JavaScript教程--->[BootstrapJavaScript教程](https://v3.bootcss.com/javascript/)