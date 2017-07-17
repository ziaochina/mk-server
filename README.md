# mk-server

## 特点

- 这是一个基于nodejs, hapi, sequelize, node-zookeeper-dubbo的开源项目  
- 实现了webapi框架、IoC依赖注入、RPC远程调用、数据库访问、事务、身份授权，

## 适用人员

nodejs开发人员，后台webapi开发人员

## 运行example

```
$ cd example
$ npm install
$ npm start
浏览器访问http://127.0.0.1:8000/v1/user/ping?i=helloworld
