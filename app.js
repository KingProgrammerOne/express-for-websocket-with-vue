
const express = require('express'); // import express dependency

const app = express();          //instance

var counter=0;                  //valiable to count second
var start_flag=0;               //flage for start/stop of counting ,initial=stop , 0: stop, 1:start

const server = app.listen(3001, function() {

    console.log('server running on port 3001'); //display server

});


const io = require('socket.io')(server);    //import socket dependency

io.on('connection', function(socket) {

   console.log(socket.id)   

   socket.on('SEND_MESSAGE', function(data) {   //if message == 'SEND_MESSAGE' , socket read request data

    if(data.cmd=="button")   start_flag=!start_flag;    //{"cmd": "button"} -----> start , or stop?

    if(data.cmd=="zero")  {
      counter=0;    //{"cmd": "zero"} -----> counter=0 
      io.emit('MESSAGE', {count:0});    //emit {"count":counting counter valiable } on 'Message' 
    } 

   });
});

function timer1() {

    if (counter>999) start_flag=0;
    if(start_flag)      //start_flag==start ------> count & emit !
    {
        counter++;
        console.log(`second => ${counter}`);

        io.emit('MESSAGE', {count:counter});    //emit {"count":counting counter valiable } on 'Message'
    }
}
  
setInterval(timer1, 1000);  //in-built function to run every 1 second