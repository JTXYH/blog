---
layout:     post
title:      Centos升级Ruby
subtitle:   使用rvm
date:       2020-01-02
author:     极客小祥
header-img: img/text/LINUX.jpg
catalog: true
tags: 
    - LINUX
---

# 1、安装Ruby

```shell
yum install -y rubygems ruby-devel
```

# 2、删除原来的rubygems仓库

```shell
gem sources --remove https://rubygems.org/
```

# 3、添加aliyun的rubygems仓库

```shell
gem sources -a https://mirrors.aliyun.com/rubygems/
```

# 4、查看rubygems仓库

```shell
gem sources -l
```

# 5、导入密钥

```shell
curl -sSL https://rvm.io/mpapis.asc | gpg --import -
curl -sSL https://rvm.io/pkuczynski.asc | gpg --import -
```

# 6、安装稳定版

```shell
\curl -sSL https://get.rvm.io | bash -s stable
```

# 7、执行

```shell
source /etc/profile.d/rvm.sh
```

# 8、查看可安装的ruby的版本

```shell
rvm list known
```

# 9、安装

```shell
rvm install 3.3
```

# 10、查看是否安装成功

```shell
ruby -v
```