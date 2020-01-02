---
layout:     post
title:      RocketMQ整合SpringBoot
subtitle:   整合RocketMQ
date:       2020-01-02
author:     极客小祥
header-img: img/text/JAVA.jpg
catalog: true
tags: 
    - JAVA
---

# 1、创建SpringBoot项目设置pom.xml

```xml
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>4.3.0</version>
</dependency>
```

# 2、设置application.properties

```properties
# 自定义属性
# 发送/生产者的参数
jtxyh.producer.groupName=jtxyh_producer
# mq的地址
jtxyh.producer.namesrvAddr=192.168.1.210:9876

# 消费者
jtxyh.consumer.gourpName=jtxyh_consumer
jtxyh.consumer.NamesrvAddr=192.168.1.210:9876
jtxyh.consumer.topic=Topic_Jtxyh
```

# 3、设置生产者

```java
@SpringBootConfiguration// 生产者
public class MQProducerConfiguration {

    @Value("${jtxyh.producer.groupName}")
    private String groupName;
    @Value("${jtxyh.producer.namesrvAddr}")
    private String namesrvAddr;

    @Bean
    public DefaultMQProducer getRocketMQProducer(){
        DefaultMQProducer producer;
        producer = new DefaultMQProducer(this.groupName);
        producer.setNamesrvAddr(this.namesrvAddr);
        try {
            producer.start();
        } catch (MQClientException e) {
            e.printStackTrace();
        }
        return producer;
    }
}
```

# 4、设置消费者

```java
@SpringBootConfiguration// 消费者
public class MQConsumerConfiguration {

    @Value("${jtxyh.consumer.NamesrvAddr}")
    private String namesrvAddr;
    @Value("${jtxyh.consumer.gourpName}")
    private String groupName;
    @Value("${jtxyh.consumer.topic}")
    private String topic;
    @Autowired
    private GiftSendListener giftSendListener;

    @Bean
    public DefaultMQPushConsumer getRocketMQConsumer()   {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer(groupName);
        consumer.setNamesrvAddr(namesrvAddr);
        consumer.registerMessageListener(giftSendListener);
        consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET);
        try {
            consumer.subscribe(topic,"*");
            consumer.start();
        }catch (MQClientException e){
            e.printStackTrace();
        }
        return consumer;
    }
}
```

# 5、设置消费者监听器

```java
@Component // 消费者监听器
public class MQConsumeMsgListenerProcessor implements MessageListenerConcurrently {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        if(msgs == null || msgs.isEmpty()){
            return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
        }
        // 消费者 接收消息之后 如何处理
        MessageExt messageExt = msgs.get(0);
        System.out.println(messageExt.toString());
        // 返回success 否则会重新消费该消息
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
}
```

# 6、测试调用

```java
@RequestMapping("/message")
@Controller
public class MessageHandler {// 请求调用
    @Autowired
    private DefaultMQProducer defaultMQProducer;

    @RequestMapping("send")
    @ResponseBody
    public String send(){
        String msg = "Hello World!!!";
        Message sendMsg = new Message("Topic_Jtxyh","DemoTag",msg.getBytes());
        SendResult sendResult = null;
        try {
            sendResult = defaultMQProducer.send(sendMsg);
        }catch (Exception e) {
            e.printStackTrace();
        }
        return sendResult.toString();
    }
}
```