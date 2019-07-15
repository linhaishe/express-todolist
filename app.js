var express = require('express');

//导入三个路由，get,post,deleted
var todoController = require('./controllers/todoController');

var app = express();

//设置模版引擎
app.set('view engine', 'ejs');

//使用静态文件，设置public作为根目录
app.use(express.static('./public'));

//引用路由，将app传递过来
todoController(app);

//监听在3000端口
app.listen(3000);

console.log('You are listening to port 3000');

//mvc架构 model view controller
//controller 代表请求相关的内容控制器
//models 处理数据相关
//view 视图相关
