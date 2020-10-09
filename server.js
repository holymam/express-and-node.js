//第一部分我做了安装git 使用github 同步vscode
//运行在服务器端
//console.log('ok')
//const msg = '你好'
//console.log(msg)

//第二部分
//定义一个接口

const express = require('express')//引用一个包为express实例

const app = express() //一个函数，执行就会返回一个应用的实例app

app.listen(3000, () => {
    console.log('App listening on port 3000!')
});
//以上可以实现实例app监听在3000端口上
//但没有返回的内容
//定义一个app.get()当客户端请求/的时候发送ok
//参考https://www.bilibili.com/video/BV1gb411c7jY
/* app.get('/',function(req,res){
//res.send ('ok')
res.send([
    { home: 'home'}
])
}) */
//npm -g install nodemon，可以不需要重启就可以参考
//https://blog.csdn.net/larpland/article/details/101349586


//试试三个接口的范例
app.get('/about',function(req,res){
    //res.send ('ok')
    res.send([
        { about: 'about'}
    ])
    })
app.get('/products',function(req,res){
    //res.send ('ok')
    res.send([
        { products1: 'products'},
        { products2: 'products'},
        { products3: 'products'},
        { products4: 'products'},
    ])
    })
/* // 接口太多的话可以模块化
如何访问静态文档？https://www.bilibili.com/video/BV1gt411S7ah
程序进行处处理，首先创建一个静态资源 public/index.html
第二步把之前的'/'首页代码注释掉art+shift+A
第三步进行静态文件托管 */
//app.use(express.static('public'))//简单配置就是传入静态文件public中的index.html
app.use('/static',express.static('public'))//url必须加static才能访问public
