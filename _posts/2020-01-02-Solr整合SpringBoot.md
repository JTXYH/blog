---
layout:     post
title:      Solr整合SpringBoot
subtitle:   整合Solr
date:       2020-01-02
author:     极客小祥
header-img: img/text/JAVA.jpg
catalog: true
tags: 
    - JAVA
---

# 引入pom

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-solr</artifactId>
</dependency>
```

# 设置application.yml

```yml
spring:
  data:
    solr:
      host: http://192.168.1.210:8983/solr
```

# 使用

#### 1、service接口

```java
public interface IUserService {
    // 添加
    String add();
    // 查询
    SolrDocumentList selectData(String condition);
}
```

#### 2、service实现

```java
@Service
public class UserServiceImpl implements IUserService{

    @Autowired
    SolrClient solrClient;

    @Override
    public String add() {
        // 用SolrInputDocument把数据拼装成solr可以用的格式
        SolrInputDocument document = new SolrInputDocument();
        document.addField("bookName","《java数据结构》");
        document.addField("bookPrice","32.9");
        document.addField("bookAmount","32");
        try {
            // 存入solr客户端对象中
            solrClient.add("jtxyh",document);
            // 提交
            solrClient.commit("jtxyh");
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "error";
    }

    @Override
    public SolrDocumentList selectData(String condition) {
        // 创建一个query对象
        SolrQuery queryCondition = new SolrQuery();
        // 设置检索的条件
        queryCondition.setQuery(condition);
        try {
            // 提交检索条件，需要指明检索的库，返回QueryResponse对象，存储的是solr返回的所有数据信息
            QueryResponse queryResponse = solrClient.query("jtxyh",queryCondition);
            SolrDocumentList results = queryResponse.getResults();
            // lambda表达式
            results.forEach(System.out::println);
            return results;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

#### 3、Handler

```java
@RestController
public class UserHandler {

    @Autowired
    private IUserService userService;

    // 添加
    @GetMapping("add")
    public String add(){
        return userService.add();
    }

    // 查询
    @GetMapping("select/{condition}")
    public SolrDocumentList selectData(@PathVariable("condition") String condition){
        return userService.selectData(condition);
    }
}
```