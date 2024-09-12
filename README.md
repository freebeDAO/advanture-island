# FreeBe & 冒险者公会招募流程

## 简介
运营冒险者公会的公司是冒险者科技，大家可以上网找到。公司专注于软件生产研发的过程，因为项目资源足够丰富，因此不需要也没时间在网络上有公开的资源。如果大家想要了解，我们会邀请公会创始人，进行一次分享。

如果大家想要了解 FreeBe 社区：
1. 查看公众号：自遊民计划
2. 查看我们之前的 notion https://free-be.notion.site/FreeBe-DAO-e47ae384b5ab4f2bad3ad9001dd1e8b3
3. 到我们的线上协作空间 https://meta.free-be.xyz/member/index，看我们日常的运转过程

如果希望成为冒险公会的一员，成为有稳定收入的远程工作者，您可以填写问卷：https://tally.so/r/wvLYxv （填写社区开发者问卷，可以不填写冒险者公会问卷）
如果希望成为 FreeBe 社区的一员，您可以填写问卷：https://tally.so/r/nW0BNv
如果希望成为 FreeBe 社区开发者中的一员，您可以填写问卷：https://tally.so/r/mZl6ye

填写问卷后，筛选合格的，开启我们的冒险者考察之旅，考察规则如下，如果不希望参加考察，我们尊重您的选择。

## 考察规则：
考察方发布考察性任务，这些任务可以被多人同时认领。
任务分成三个等级
- L1 简单 100 经验值
- L2 较难 200 经验值
- L3 困难 500 经验值

完成任务的过程
1. 认领自己感兴趣的任务
2. fork 项目到自己的 github 账号下
3. 创建任务分支，完成开发，开发规范
    - 在 components 目录下创建 component，如果目录重名，加上自己的标识
    - 完成 components 的开发后，在 test 目录下创建组件的测试 demo，如果目录重名，加上自己的标识
1. 提交 pr，目标分支选择 advanture-test (不要选择 main 分支)，pr 提交信息备注自己的微信 id，和任务名称
2. code master 执行 review

## 任务列表

### 添加 Mysql

创建 DB
```
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0
docker exec -it mysql-container mysql -u root -proot -e "CREATE DATABASE \`advanture-island\`;"

```

确认数据库创建成功
```
docker exec -it mysql-container mysql -u root -proot -e "SHOW DATABASES;"
```

更新 .env 文件：
DATABASE_URL="mysql://root:root@127.0.0.1:3306/advanture-island?schema=public"

### 添加 API

```
curl -X POST http://localhost:3000/api/points \
  -H "Content-Type: application/json" \
  -d '{"x": 10, "y": 20, "group": "group1"}'

curl -X GET http://localhost:3000/api/points/1

curl -X PUT http://localhost:3000/api/points/1 \
  -H "Content-Type: application/json" \
  -d '{"x": 30, "y": 40, "group": "group2"}'
  
curl -X DELETE http://localhost:3000/api/points/1
```

  
