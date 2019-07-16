var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');

// mongoose.connect('mongodb://hfpp2012:hfpp2012@ds151068.mlab.com:51068/todos',{ useNewUrlParser: true });
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://user1-heather:lcx@!9670itsmyfreecluster-5fqa0.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("todolist").collection("todo");
//   // perform actions on the collection object
//   client.close();
// });

// mongoose.connect(uri);

mongoose.connect("mongodb+srv://user1-heather:heather01@itsmyfreecluster-5fqa0.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true })
    .then(()=>{
        console.log("Connected to mongo database");
    })
    .catch((err)=>{
        console.log("Error connecting mongo database",err);
    });


var todoSchema = new mongoose.Schema({
  //数据的模版类型
  item: String
});

// 使用schema的模版，名叫Todo
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'buy flowers'}).save(function(err) {
//   if (err) throw err;
//   console.log('item saved');
// });
//
// var data = [ {item: 'get milk'}, {item: "walk dog"}, {item: 'kick some coding ass'} ];;

module.exports = function(app) {
  //请求列表时需要的路由
  app.get('/todo', function(req, res) {
    //todo指的是mongogoose.model
    //{}代表取出所有数据
    Todo.find({}, function(err, data) {
      if (err) throw err;
      //渲染数据，将data响应到ejs文件中的todos中
      res.render('todo', { todos: data });
    });
  });

  //发送时接收的路由
  app.post('/todo', urlencodedParser, function(req, res) {
    var itemOne = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  //删除时需要用的路由
  app.delete('/todo/:item', function(req, res) {
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    //根据唯一id进行删除会更好
    Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}

//mongodb存储的是json
