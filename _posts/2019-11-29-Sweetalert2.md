---
layout:     post
title:      Sweetalert2
subtitle:   web的弹窗组件
date:       2019-11-29
author:     极客小祥
header-img: img/text/WEB.jpg
catalog: true
tags:
    - WEB
---

# 简介
* 一个漂亮的、响应式的、可定制的和可访问（WAI-ARIA）的JAVASCRIPT弹窗
* 无论是在电脑、手机还是平板上，SweetAlert2都会在页面上自动居中显示
* 官网：**[Sweetalert2](https://sweetalert2.github.io/#examples)**
* 导入CDN链接：

    ```html
    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/limonte-sweetalert2/8.11.8/sweetalert2.all.js"></script>
    ```

# 弹窗

* **普通**

    ```javascript
    // 第一个是标题，第二个是第二行显示的字，第三个是图标
    // 必须按照顺序写！
    Swal.fire("失败", "已取消删除", "error");
    Swal.fire('成功','已成功删除','success');
    ```

* **高级**

    ```javascript

    "大的提示框"

    Swal.fire({
    "显示的图标 有：success，error，warning，info，question"
    type: 'warning',
    "显示时间"
    timer:1300,
    "提示信息标题"
    title: "你确定要删除"+tbData2.uname+"吗？",
    "是否显示取消按钮"
    showCancelButton: true,
    "确定按钮的颜色"
    confirmButtonColor: '#3085d6',
    "取消按钮的颜色"
    cancelButtonColor: '#d33',
    "确定按钮显示的字"
    cofirmButtonText: '确定删除！',
    // 取消按钮显示的字
    cancelButtonText: '取消'
        }).then((result) => {
            "如果点击了确定按就执行这里面的逻辑"
            if (result.value) {
                Swal.fire('成功',tbData2.uname+'已成功删除','success');
                "删除数据"
                $.post("/02mavenWeb/uinfo/delete",{"uid":tbData2.uid},function(){
                    "重载表格"
                    table.ajax.reload( null, false );
                });
            "点击了取消按钮就执行这里面的逻辑"
            }else {
                Swal.fire("失败", "已取消删除", "error");
            }
        })


    "小提示框"
    Swal.fire({
        toast: true,
        title:"标题",
        "自定义图标宽度"
        width:300,
        showConfirmButton: false,
        "显示时间"
        timer:1300,
        "图标"
        type:"success"
    });
    ```
