var express=require("express");
var http=require("http");
var app=express();
var server=http.createServer(app);
var io=require("socket.io")(server);
var path = require ('path');



app.set('views', path.join(__dirname +'../views'));
app.use(express.static(path.join(__dirname + '../public')));
app.set("view engine", "ejs");


app.get("/", function(req,res){
  res.render("index");
});

io.on("connection", function(socket){
  console.log("Usuario conectado");
  socket.on("disconnect",function(){
    console.log("Usuario desconectado");
  });
  socket.on("chat message",function(msg){
    console.log(msg);
    socket.broadcast.emit("chat message",msg);
  })
});

server.listen(process.env.PORT || 8080,function(){
  console.log("Coneccion lista");
});
