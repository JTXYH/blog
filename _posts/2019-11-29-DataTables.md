---
layout:     post
title:      DataTables  
subtitle:   web的表格组件
date:       2019-11-29
author:     极客小祥
header-img: img/text/WEB.jpg
catalog: true
tags:
    - WEB
---

# 简介
* 官网：**[DataTables](https://datatables.net/examples/)**
* 导入**CDN链接**：

    ```html
    <link href="https://cdn.bootcss.com/datatables/1.10.19/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/datatables/1.10.19/js/dataTables.bootstrap.js"></script>
    ```

# 表格布局

```html
<table id="example1" class="table table-bordered table-striped">
<thead>
<tr>
    <th>用户id</th>
    <th>用户名字</th>
    <th>用户角色</th>
    <th style="width:155px">操作</th>
</tr>
</thead>
<tbody>
</tbody>
</table>
```

#### 1、向后端发ajax

```javascript
$('#example1').DataTable({
        "发起ajax请求到后台取数据"
    	"ajax": "/02mavenWeb/uinfo/selectAll",
        "设置显示的条数"
    	"aLengthMenu": [3,5,7], 
        "默认显示的条数"
    	'iDisplayLength':3,
        "自动宽度"
        "autoWidth": false,
        "destroy": true,
        "返回的json自动解析，必须格式是 data:[数据1:xx,数据2:xx]"
        "columns": [
            { "data": "uid" },
            { "data": "uname" },
            { "data": "cname" },
            "给不需要传数据的标签设置默认值"
            {"defaultContent":'<button id="uploadCinfo" class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal1"><i class="fas fa-pencil-alt"></i>修改</button><button id="delCinfo" class="btn btn-danger btn-sm" style="float:right;"><i class="fas fa-trash"></i>删除</button>'}
        ]
});
```

#### 3、获取当前行数据

```javascript
var table = $('#example1').DataTable({"ajax": "/02mavenWeb/uinfo/selectAll"})
table.row($(this).closest('tr')).data();
```

#### 4、重载表格

```javascript
table.ajax.reload( null, false );
```