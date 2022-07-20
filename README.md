## 项目介绍
### 项目背景
  **对于高校研究生群体来讲，论文的查找浏览与发表是不可或缺的一部分。目前就计算机领域而言，国内的论文分享与获取平台以知网、万方等为主，但是此类平台每年会征收高额的管理费用，且下载费用高昂，上传者甚至下载自己的论文也需要付费，而且论文下载产生的盈利并不能使上传者受益。
  /n
  **对于以arXiv为代表国际论文下载与分享平台秉承开源的思想，下载论文与上传论文均为免费资源，但是arXiv学术风过于浓厚，且缺乏讨论社区，并且论文是上传在cornell大学的服务器上缺乏文件的私密性，如果是未发表的论文或其他资源则不可轻易上传。
  
  **不仅仅是正式的发表论文，有很多学习笔记在整理后都可以在非正式的论文论坛中分享，但是目前仍然缺少这样集论文管理、分享、下载、讨论为一体的平台。
  
  **科研激励可以极大促进科研工作者的生产积极性，如果论文或者其他资料的付费下载可以直接支付给上传者，那么上传者将会更积极的产出更多内容。
### 项目简介
  **本项目是基于web3与filecoin等技术开发的论文分享、讨论、下载、管理平台PaperChain，PaperChain使用钱包地址登录，用户可以制作自己的头像与主页背景等。用户可以在PaperChain论坛发布学术话题等内容，其余用户可以对发布的内容进行点赞和评论，打造一个学术讨论社区。
  **PaperChain借助Filecoin/IPFS永久上传储存内容的特点使得用户可以将自己的论文或者其余任何学术资料上传至Filecoin，PaperChain通过以太坊智能合约像用户收取上传时较低的管理费用，为保证用户上传资料的隐私性，每个用户都需提供自己的Web3.storageToken，如果用户无法提供，则PaperChain可以代为存储在公用仓库中。
  **PaperChain在论文讨论社区的基础上，包括了论文资源下载社区，PaperChain通过智能合约给每一个上传至Filecoin的文件都赋予ID，用户可以根据下载社区用户分享Filecoin/IPFS地址与其余用户分享的ID来进行下载，下载将会产生费用，绝大部分费用直接支付给上传者，少部分作为平台费用。
### 项目技术
用户上传文件存储：Web3.storage IPFS Filecoin
网站数据：Moralis
交易：Solidity ethers Truffle
搭建：React 
### 项目速览
##### 登录界面（建议使用MeataMask）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658287823881-0da5c374-1379-40ff-a43b-a00fa1a97ffd.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=422&id=uaaa1bc50&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1428&originWidth=2285&originalType=binary&ratio=1&rotation=0&showTitle=false&size=121048&status=done&style=none&taskId=u88d82ca4-5971-40a9-9a56-a43768f8087&title=&width=676)
##### 社区界面展示
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658288149819-dac453bd-291c-48c7-af23-f9f275a68ea3.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=354&id=u54ddc9f8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1342&originWidth=2443&originalType=binary&ratio=1&rotation=0&showTitle=false&size=648610&status=done&style=none&taskId=u430efedf-0965-4905-896c-c94aa072ded&title=&width=645)
##### 个人资料界面展示
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658288226017-435af5ce-c166-4aab-a6ec-3f6450b10b24.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=423&id=u3920082f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1284&originWidth=1895&originalType=binary&ratio=1&rotation=0&showTitle=false&size=853543&status=done&style=none&taskId=ubd7808d8-fd61-4df9-ae58-67facccc611&title=&width=624)
##### 个人主页展示
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658288836436-b530c013-61da-47bf-9ccc-301359376aea.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=394&id=u921d812b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1291&originWidth=2032&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1178772&status=done&style=none&taskId=u5239bb3e-70e1-47a9-add2-0c3e019ae68&title=&width=620)
##### 上传文件展示
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658288993204-2b104680-cb45-4fe3-9143-29b52744d954.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=399&id=uae1de07d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1310&originWidth=2030&originalType=binary&ratio=1&rotation=0&showTitle=false&size=481063&status=done&style=none&taskId=u2091800e-50e1-4cac-9184-712c784696d&title=&width=619)
##### 支付上传费用
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658289037146-ad5881a4-5fbc-4cee-a45c-8087cbce26f2.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=375&id=u62c3924a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1304&originWidth=2265&originalType=binary&ratio=1&rotation=0&showTitle=false&size=427966&status=done&style=none&taskId=ueadc2b06-d08b-4811-9326-9ddd713af78&title=&width=652)
##### 上传成功
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658289125120-f2ddb8ac-eb89-4df9-be9f-4b5b7d9ff0d7.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=309&id=u83fd9feb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1016&originWidth=2130&originalType=binary&ratio=1&rotation=0&showTitle=false&size=226152&status=done&style=none&taskId=u5b54dc38-4522-4fa7-a465-aa5ee9412cc&title=&width=647)
##### 查看历史上传内容
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658289166912-45646cf4-06df-42ce-95e1-63dbe24d3486.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=522&id=uad7719d4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1288&originWidth=1651&originalType=binary&ratio=1&rotation=0&showTitle=false&size=602176&status=done&style=none&taskId=u4ea488c6-d103-48d1-870d-d4734521b9d&title=&width=669)
##### 下载社区与下载工具
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658289826964-a2700928-b684-4817-8f82-48f3a3ab162c.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=391&id=ua5647fc3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1324&originWidth=2258&originalType=binary&ratio=1&rotation=0&showTitle=false&size=509657&status=done&style=none&taskId=uc52acb72-88e8-4866-a379-9b9671e1294&title=&width=667)
##### 下载付费
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658289904230-4eb9ea25-50b4-4f30-b727-d060dc0957d1.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=377&id=ub8eee6f5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1276&originWidth=2296&originalType=binary&ratio=1&rotation=0&showTitle=false&size=460650&status=done&style=none&taskId=u89912af3-73c8-4303-8754-b5d84c7c3f8&title=&width=678)
##### 下载成功
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658289965409-21b5d839-e6ce-4fcd-9062-5ec4d759ce14.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=462&id=u250d8ce5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1274&originWidth=1888&originalType=binary&ratio=1&rotation=0&showTitle=false&size=448957&status=done&style=none&taskId=u17785eea-6b23-4204-ac35-16bab239dae&title=&width=685)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658289984501-71476849-a91c-4ade-85dd-e5e230f8fc60.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=384&id=u64777301&margin=%5Bobject%20Object%5D&name=image.png&originHeight=930&originWidth=1641&originalType=binary&ratio=1&rotation=0&showTitle=false&size=92918&status=done&style=none&taskId=uac944d14-4e7b-4e71-b9a7-c523b37bc82&title=&width=677)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26756779/1658290018806-878789f3-3651-4fc7-b9bf-4b557bbcc273.png#clientId=ub2c0a0d2-a0e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=354&id=u368fdf54&margin=%5Bobject%20Object%5D&name=image.png&originHeight=731&originWidth=637&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43331&status=done&style=none&taskId=u00cd1b9b-37ed-4d6e-9616-0ab18f6f9b6&title=&width=308.8484848484849)


### 未来展望
对于论文与资料的检索部分，仍在开发中，可设置论文详细信息与条件进行检索。
社区可按学科种类与研究方向进行讨论组划分。
## 编译运行
```javascript
1、进入package.json 所在文件夹安装依赖
npm install 
2、将index.js中Moralis相关id与severurl进行提换
3、编译启动
npm start
```
