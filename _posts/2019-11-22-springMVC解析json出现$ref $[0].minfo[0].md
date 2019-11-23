---
layout:     post                    
title:      springMVC解析json出现$ref $[0].minfo[0]
subtitle:   other
date:       2019-11-22
author:     极客小祥                     
header-img: img/text/OTHER.jpg
catalog: true
tags:
    - OTHER
---

# 解析json时出现
![出现问题.png](https://i.loli.net/2019/11/22/qBvDmNuWeibTtwK.png)

* 是因为使用**fastjson**出现的问题，查询出来是因为**循环引用的时候fastjson会把这个对象解析为引用**

* 解决：

```xml
    配置一个这个bean
	<bean id="disableCircularReferenceDetect" class="org.springframework.beans.factory.config.FieldRetrievingFactoryBean">
    	<property name="staticField" value="com.alibaba.fastjson.serializer.SerializerFeature.DisableCircularReferenceDetect" />
	</bean>

    配置fastjson的时候配置这个属性
    <bean class="com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter">
        <property name="features">
            <list>
                <ref bean="disableCircularReferenceDetect" />
            </list>
        </property>
    </bean>
```