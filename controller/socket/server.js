const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const robot=require('robotjs')
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('gyro',(GyroData)=>{
    GyroData=JSON.parse(GyroData);
    const { gyroData } = GyroData;

    const cur = robot.getMousePos();
    const targetX = cur.x - gyroData.x *60;
    const targetY = cur.y + gyroData.y * 60;
  
    robot.moveMouse(targetX, targetY);

  })

  socket.on('movement',(key)=>{
        key=key.toString('utf-8');
        console.log(key);
        robot.keyTap(key);
  });

  socket.on('touch',(touchData)=>{
    touchData=JSON.parse(touchData);
    const { x, y } = touchData.touchData;
    const cur=robot.getMousePos();
  
    robot.moveMouse(cur.x+y*3,cur.y-x*3);

  })
  socket.on('fire',(data)=>{

    robot.mouseClick('left');
  });
  socket.on('scope',(data)=>{
    robot.mouseClick('right');
  });
  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 12345;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
