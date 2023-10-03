
const express=require('express');
const cors=require('cors')
const morgan=require('morgan');
const app=express();
const robot=require('robotjs');

app.use(cors());
//display routes hit
app.use(morgan('dev'));





//body parser 
app.use(express.json());



const GYRO_SENSITIVITY_X = 40;
const GYRO_SENSITIVITY_Z = 40;

app.post('/gyro', (req, res) => {
  const { gyroData } = req.body;
  console.log(gyroData);
  const cur = robot.getMousePos();
  const targetX = cur.x - gyroData.x * GYRO_SENSITIVITY_X;
  const targetY = cur.y + gyroData.z * GYRO_SENSITIVITY_Z;

  robot.moveMouse(targetX, targetY);
  res.send('Cursor Moved');
});

app.post('/fire', (req, res) => {
  // Handle the "Fire" button press (right-click)
  console.log('Fire button pressed');
  robot.mouseClick('left');
  res.send('Fire button pressed');
});



 // Adjust this value based on your desired smoothing effect
const MouseSens=3;
app.post('/touch', (req, res) => {
  const { x, y } = req.body.touchData;
  const cur=robot.getMousePos();

  robot.moveMouse(cur.x+y*MouseSens,cur.y-x*MouseSens);

  res.send('Cursor Moved');
});



app.post('/scope', (req, res) => {
  // Handle the "Scope" button press (left-click)
  console.log('Scope button pressed');
  robot.mouseClick('right');
  res.send('Scope button pressed');
});


const PORT=5000;
app.listen(PORT,()=>{
    console.log('server start at port:',PORT)
})