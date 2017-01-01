var express=require("express");
var http=require("http");
var app=express();
var server=http.createServer(app);
var io=require("socket.io")(server);
var path = require ('path');



app.set('views', path.join(process.cwd() +'/views'));
app.use(express.static(path.join(process.cwd() + '/public')));
app.set("view engine", "ejs");


app.get("/", function(req,res){
  res.render("index");
});

io.on("connection", function(socket){
  console.log("User conected");
  socket.on("disconnect",function(){
    console.log("User disconected");
  });
  socket.on("chat message",function(msg){
    console.log(msg);
    socket.broadcast.emit("chat message",msg);
  })
});

server.listen(process.env.PORT || 8080,function(){
  console.log("Coneccion lista");
});
