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

#### 5、获取所有ajax返回数据

```javascript
table.ajax.json();
```

#### 6、后端分页

```javascript
用一个变量接收，用户下面获取单行数据
table = $('#mytable').DataTable({
    language: lang,  提示信息
    autoWidth: false, 自动宽度
    destroy: true,
    processing: true,  隐藏加载提示,自行处理
    serverSide: true,  启用服务器端分页
    aLengthMenu: [5, 7, 10],  设置显示的条
    iDisplayLength: 5,   默认显示的条数
    ordering: false,  取消默认排序查询,否则复选框一列会出现小箭头
    searching: false,
    分页样式
    pagingType: "simple_numbers",  
    stateSave: false,
    设置自动序号
    fnDrawCallback: function () {  
        设置序号列
        var api = this.api();
        获取到本页开始的条数
        var startIndex = api.context[0]._iDisplayStart;
        api.column(0).nodes().each(function (cell, i) {
            cell.innerHTML = startIndex + i + 1;
        });
    },
    发起ajax请求到后台取数据
    "ajax": function (data, callback, settings) {
        $.get("<%=request.getContextPath()%>/comm/" + urlData, {
            需要往后台传递的参数写在这里,JSON格式
            "pageNum": (data.start / data.length) + 1,
            "pageSize": data.length,
            "brandName": data.search.value,
            实现同步加载，只有table加载完成后才能获取后面的数据
            async:false,
        }, function (data) {
            var returnData = {};
            if (data.total !== undefined) {
                返回数据全部记录
                returnData.recordsTotal = data.total;
                后台不实现过滤功能，每次查询均视作全部结果
                returnData.recordsFiltered = data.total;
                需要显示的数据信息
                returnData.data = data.list;
            } else {
                returnData.recordsTotal = 0;
                returnData.recordsFiltered = 0;
                returnData.data = [];
            }
            callback(returnData);
        })

    },
    自定义宽度
    "columnDefs": [
        {},
        {},
        {},
        {},
        {},
        {"width": "15%", "targets": 6}
    ],
    "columns": [         
        {"data": null},
        {"data": "commName"},
        {"data": "commTypeInfo.typeName"},
        {"data": "commBrandInfo.brandName"},
        {"data": "proModel"},
        {"data": "commColor"},
        {"defaultContent": '' }
    ]
});
```

#### 7、设置复选框

```javascript

"columnDefs": [
    {
        指定第一列，从0开始，0表示第一列，1表示第二列……
        targets: 0,
        render: function (data, type, row, meta) {
            return '<input type="checkbox" name="checklist" value="' + row.id + '" />'
        }
    },
     设置第一列和最后一列不可排序
    {"orderable": false, "targets": [0, -1]},  
    {
        "defaultContent": "",
        "targets": "_all"
    }
],
"columns": [
    {
        data: null,
        className: "text-center",
        title: "<input type='checkbox' name='checklist' id='checkall'/>"
    },


实现全选功能
$("#mytable").on('click', "#checkall", function () {
    $("input[name='checklist']").prop("checked", $(this).prop("checked"));
});

获取选中的复选框,排除复选框#checkall
var checked = $("table input[type=checkbox]:checked:not('#checkall')");
checked.each(function () {
    获取选中行数据
    var data = table.row($(this).closest('tr')).data();
})
```