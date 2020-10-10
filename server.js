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
        { id: '1', title: 'product A'},
        { id: '2', title: 'product B'},
        { id: '3', title: 'product C'},
        { id: '4', title: 'product D'},
    ])
    })
/* // 接口太多的话可以模块化
如何访问静态文档？https://www.bilibili.com/video/BV1gt411S7ah
程序进行处处理，首先创建一个静态资源 public/index.html
第二步把之前的'/'首页代码注释掉art+shift+A
第三步进行静态文件托管 */
//app.use(express.static('public'))//简单配置就是传入静态文件public中的index.html
//app.use('/static',express.static('public'))//url必须加static才能访问public
//跨域请求https://www.bilibili.com/video/BV1gt411S78C
//怎么就算跨域呢？跨域就是说该页面是3000端口的内容，却要请求该服务器其他端口的内容
//例如1主机的3000端口是主页，主页中有对4400端口的某资源进行访问的行为
app.use('/',express.static('public'))//修改回来
//先进行安装npm i cors app.use(require('cors')())//解决跨域问题
app.use(require('cors')())//解决跨域问题


//如何从数据库获取，代码里面没有死的数据
//代码里面需要分离出活动的数据下面这个例子就是写死的数据




//所以这里需要进行安装mongdb然后再安装npm i mongoose
const mongoose = require('mongoose')
//就可以链接数据库了 const mongoose = require('mongoose')引入一个mongoose的驱动
mongoose.connect('mongodb://localhost:27017/express-test',{ useNewUrlParser: true })

const Product = mongoose.model('Product',new mongoose.Schema({
   title: String, 
}))

/* app.get('/prodects2', async function(req,res){
    //res.send ('ok')
    res.send(await Product.find())
    }) */
//用await的product.find的方法查找所有数据
//测试一种方式去写相当于往数据库中插入了三条数据但一般不这么写
/* Product.insertMany([
    {title: '产品1'},
    {title: '产品2'},
    {title: '产品3'},
]) *///可以看到都有一个id作为数据的唯一标识
/* app.get('/prodects2', async function(req,res){
    //res.send ('ok')
    const data = await Product.find().limit(2)
    res.send(data)
    }) */
 app.get('/prodects2', async function(req,res){
    //res.send ('ok')
    //const data = await Product.find().skip(1).limit(2)
    /* const data = await Product.find().where({
        title: '产品2'
    }) */
    const data = await Product.find().sort({
    _id: -1//1
    })
    res.send(data)
    }) 
//另一个接口详情页http://localhost:3000/prodects2/id
app.get('/prodects2/:id', async function(req,res){
    const data = await Product.findById(req.params.id)
    res.send(data)
    }) 
//https://www.bilibili.com/video/BV1Kt411r7gR
//一个产品的新增接口录入数据
app.use(express.json())//允许expres提交处理的数据
app.post('/products2',async function(req,res){
    //const data = {}
    const data = req.body
    const product2 = await Product.create(data)
    res.send(product2)
})
