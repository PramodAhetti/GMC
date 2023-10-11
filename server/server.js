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
    const targetX = cur.x - gyroData.x *70;
    const targetY = cur.y + gyroData.y * 70;
  
    robot.dragMouse(targetX, targetY);

  })

  socket.on('movement',(key)=>{
        key=key.toString('utf-8');
        console.log(key);
        robot.keyTap(key);
  });

  socket.on('touch',(touchData)=>{
    console.log('touch')
    touchData=JSON.parse(touchData);
    const { x, y } = touchData.touchData;
    const cur=robot.getMousePos();
  
    robot.moveMouse(cur.x+y*14,cur.y-x*14);

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

const PORT =  12345;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const vjoy = require('vjoy');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Serve static files from the public directory
// app.use(express.static('public'));

// // Create a new vJoy device.
// const vjoyDevice = new vjoy.vJoyDevice();

// // Set the name of the vJoy device.
// vjoyDevice.SetDeviceName('My Virtual Controller');

// // Add a button to the vJoy device.
// const vjoyButton = new vjoy.vJoyButton();
// vjoyDevice.AddButton(vjoyButton);

// // Update the vJoy device.
// vjoyDevice.Update();

// // Socket.io connection handling
// io.on('connection', (socket) => {
//   console.log('Client connected');

//   socket.on('gyro', (GyroData) => {
//     GyroData = JSON.parse(GyroData);
//     const { gyroData } = GyroData;

//     const cur = vjoyDevice.GetPosition();
//     const targetX = cur.x - gyroData.y * 70;
//     const targetY = cur.y + gyroData.x * 70;

//     vjoyDevice.SetPosition(targetX, targetY);

//     // Update the vJoy device.
//     vjoyDevice.Update();
//   });

//   socket.on('movement', (key) => {
//     key = key.toString('utf-8');
//     console.log(key);

//     // Map the keyboard key to a vJoy button.
//     const vjoyButtonIndex = key.charCodeAt(0) - 65;

//     // Press the vJoy button.
//     vjoyDevice.PressButton(vjoyButtonIndex);

//     // Release the vJoy button.
//     vjoyDevice.ReleaseButton(vjoyButtonIndex);

//     // Update the vJoy device.
//     vjoyDevice.Update();
//   });

//   socket.on('touch', (touchData) => {
//     console.log('touch');
//     touchData = JSON.parse(touchData);
//     const { x, y } = touchData.touchData;
//     const cur = vjoyDevice.GetPosition();

//     vjoyDevice.SetPosition(cur.x + y * 14, cur.y - x * 14);

//     // Update the vJoy device.
//     vjoyDevice.Update();
//   });

//   socket.on('fire', (data) => {
//     // Press the vJoy button for the left mouse button.
//     vjoyDevice.PressButton(0);

//     // Release the vJoy button for the left mouse button.
//     vjoyDevice.ReleaseButton(0);

//     // Update the vJoy device.
//     vjoyDevice.Update();
//   });

//   socket.on('scope', (data) => {
//     // Press the vJoy button for the right mouse button.
//     vjoyDevice.PressButton(1);

//     // Release the vJoy button for the right mouse button.
//     vjoyDevice.ReleaseButton(1);

//     // Update the vJoy device.
//     vjoyDevice.Update();
//   });

//   // Disconnect event
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const PORT = 12345;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
