import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity, TextInput } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import io from 'socket.io-client';

 // Replace with your server's hostname or IP address and port number


 const SOCKET_SERVER_URL ='http://192.168.0.105:12345';
 const socket = io(SOCKET_SERVER_URL);
export default function App() {



  const [initialTouchPosition, setInitialTouchPosition] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState('http://192.168.0.105:5000');




  const handleInputChange = (text) => {
    setInputValue(text);
  };

  
  
  
  const handleTouchStart = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setInitialTouchPosition({ x: locationX, y: locationY });
  };






  const handleTouchMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const deltaX = locationX - initialTouchPosition.x; // Calculate change in X position
    const deltaY = locationY - initialTouchPosition.y; // Calculate change in Y position
    initialTouchPosition.x=locationX;
    initialTouchPosition.y=locationY;

    socket.emit('touch',JSON.stringify({
      touchData: { x: deltaX, y: deltaY } // Send the change in X and Y positions
    }));
  };


 
 
 
 
  useEffect(() => {
    const sendDataToServer = async (gyroData) => {

      socket.emit('gyro',JSON.stringify({
        gyroData: gyroData// Send the change in X and Y positions
      }));
    };

    const gyroscopeListener = Gyroscope.addListener((gyroData) => {
      sendDataToServer(gyroData);
    });

    return () => {
      gyroscopeListener.remove();
    };
  }, []);

 
  const handleFire = () => {
 socket.emit('fire','a');
  };

 
 
  const handleScope = () => {
    // Send a request to the server indicating the "Scope" button was pressed (left-click)
     socket.emit('scope','a')
  };

 const movementA=(key)=>{
   socket.emit('movement','a');
 }
 
 const movementW=(key)=>{
  socket.emit('movement','w');
}
const movementS=(key)=>{
  socket.emit('movement','s');
}
const movementD=(key)=>{
  socket.emit('movement','d');
}

  return (
    <View style={styles.container} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>


      <View style={styles.joystick}>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity  onPress={movementA} style={styles.wasd} >
            <Text style={{ color: '#FF0000' }}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={movementS} style={styles.wasd}>
            <Text style={{ color: '#FF0000' }}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={movementD} style={styles.wasd}>
            <Text   style={{ color: '#FF0000' }}>D</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={movementW} style={styles.wasd}>
          <Text  style={{ color: '#FF0000' }}>W</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity  style={{backgroundColor:'blue',height:25,width:25}}>
        <Text >?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleScope} style={styles.scope}>
        <Text>SCOPE</Text>
      </TouchableOpacity>

      <TouchableOpacity   onPress={handleFire} style={styles.fire}>
        <Text >FIRE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight:150,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joystick: {
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wasd: {
    margin: 2,
    backgroundColor: 'yellow',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  scope: {
    marginTop: 250,
    marginLeft:120,
    width: 70,
    height: 70,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  fire: {
    marginTop:10,
    marginLeft:120,
    backgroundColor: 'red',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
