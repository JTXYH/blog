---
layout:     post
title:      Excel和Word操作
subtitle:   Java操作Excel和Word
date:       2019-12-13
author:     极客小祥
header-img: img/text/JAVA.jpg
catalog: true
tags: 
    - JAVA
---

# Excel操作

* **需要使用的Jar**

```xml
<dependency>
    <groupId>dom4j</groupId>
    <artifactId>dom4j</artifactId>
    <version>1.6.1</version>
</dependency>
<dependency>
    <groupId>net.sourceforge.jexcelapi</groupId>
    <artifactId>jxl</artifactId>
    <version>2.6.12</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>3.17</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-excelant</artifactId>
    <version>3.17</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-scratchpad</artifactId>
    <version>3.17</version>
</dependency>
<dependency>
    <groupId>org.apache.xmlbeans</groupId>
    <artifactId>xmlbeans</artifactId>
    <version>2.6.0</version>
</dependency>
```

#### 1、Excel读操作

```java
public static List<CommBrand> readExcel(InputStream inputStream) {
List<CommBrand> datas = new ArrayList<>();
// 如果不传inputStream就自定义一个路径
// InputStream input = new FileInputStream("E:\myexcel.xlsx");
try {
    Sheet sheet = null;
    Iterator<Row> iterator = null;   "迭代器"
    Workbook workbook = WorkbookFactory.create(inputStream);
    sheet = workbook.getSheetAt(0);
    iterator = sheet.iterator();
    for (int i = 0; i < sheet.getLastRowNum(); i++) {
        while (iterator.hasNext()) {         "遍历每一行"
            Row nextRow = iterator.next();
            if (nextRow.getRowNum() < 1) {
                continue;
                "nextRow.getRowNum()就是获取行数，由表中看出第一行(getRowNum()=0)为表头，直接跳过"
            }
            "从第二行开始是有用的数据，要保存早数据库，第二行：nextRow.getRowNum()=1"
            Iterator<Cell> cellIterator = nextRow.cellIterator();
            "实体类"
            CommBrand commBrand = new CommBrand();
            while (cellIterator.hasNext()) {
                "遍历每一行的每一列"
                Cell cell = cellIterator.next();
                switch (cell.getColumnIndex()) {
                    case 0:
                        "第一列(brandName)"
                        "将单元格内容设置为String类型，也可以这样写cell.setCellType(Cell.CELL_TYPE_STRING);"
                        cell.setCellType(Cell.CELL_TYPE_STRING);
                        commBrand.setBrandName(cell.getStringCellValue());
                        break;
                    case 1:   "第二列(brandUrl)"
                        cell.setCellType(Cell.CELL_TYPE_STRING);
                        commBrand.setBrandUrl(cell.getStringCellValue());
                        break;
                    case 2:   "第三列(brandDesc)"
                        cell.setCellType(Cell.CELL_TYPE_STRING);
                        commBrand.setBrandDesc(cell.getStringCellValue());
                        break;
                }
            }
            "存储到list集合中"
            datas.add(commBrand);
            if(commBrand.getBrandName() == null){
                break;
            }
        }
    }
} catch (Exception e) {
    e.printStackTrace();
}
return datas;
}

"调用"
public static void main(String[] args){
    List<CommBrand> commBrands = ReadCommBrandExcelUtil.readExcel(inputStream);
}
```

#### 2、Excel写操作

```java
private static void write(List<Map<String,String>> list, String[] headers, OutputStream out) {
    Workbook wb = new XSSFWorkbook();
    "遍历数据集，把数据写入到wb对象"

    Sheet sheet = wb.createSheet("员工表");
    Row row = sheet.createRow(0);
    "表头"
    int cellindex=0;
    for (String head:headers){
        Cell cell = row.createCell(cellindex);
        cell.setCellValue(head);
        cellindex++;
    }

    "数据行"
    int rowIndex= 1;
    for(Map<String,String> map:list){
        Row trow = sheet.createRow(rowIndex);
        for(int c=0;c<headers.length;c++){
            Cell cell = trow.createCell(c);
            String key = headers[c];
            String cellValue = map.get(key);
            cell.setCellValue(cellValue);
        }
        rowIndex++;
    }

    try {
        wb.write(out);
    } catch (IOException e) {
        e.printStackTrace();
    }
}

"调用"
public static void main(String[] args) throws FileNotFoundException {
        List<Map<String,String>> list = new ArrayList<>();
        Map<String,String> map = new HashMap<>();
        map.put("序号","1");
        map.put("姓名","张三");
        map.put("性别","男");
        map.put("生日","2015-11-11");
        list.add(map);

        String path ="D:/aaa.xlsx";
        OutputStream out = new FileOutputStream(path);
        String[] headers = {"序号","姓名","性别","生日"};
        write(list,headers,out);
    }
```

# Word操作

* **需要的Jar**

```xml
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.23</version>
</dependency>
<dependency>
    <groupId>com.lowagie</groupId>
    <artifactId>itext</artifactId>
    <version>2.1.7</version>
</dependency>
<dependency>
    <groupId>com.lowagie</groupId>
    <artifactId>itext</artifactId>
    <version>2.1.7</version>
</dependency>
```

#### 1、Word写操作

1. 创建**xml模板文件**
2. 使用**freemarker语法**进行配置

```java
public void write(OutputStream outputStream){
    Configuration c = new Configuration();
    c.setDefaultEncoding("UTF-8");
    "指定模板配置文件所在的文件夹路径"
    c.setClassForTemplateLoading(WriteDeliverInfoToWord.class,"/io/jtxyh/util");
    "指定模板配置文件的名称"
    Template template = c.getTemplate("极客小祥.xml");
    // 使用输出流，用于前端下载
    // OutputStreamWriter w = new OutputStreamWriter(outputStream,"UTF-8");
    "指定一个输出了路径和名字"
    Writer w = new FileWriter("D:/极客小祥.docx");
    template.process(myMap,w);
}
```