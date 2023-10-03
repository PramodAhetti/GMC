import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity, TextInput } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import io from 'socket.io-client';


 // Replace with your server's hostname or IP address and port number

export default function App() {



  const SOCKET_SERVER_URL ='http://192.168.0.105:12345';
  const socket = io(SOCKET_SERVER_URL);

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
    // // Send the change in X and Y positions to the server
    // fetch(inputValue+'/touch', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     touchData: { x: deltaX, y: deltaY } // Send the change in X and Y positions
    //   }),
    // });
    socket.emit('touch',JSON.stringify({
      touchData: { x: deltaX, y: deltaY } // Send the change in X and Y positions
    }));
  };


  useEffect(() => {
    const sendDataToServer = async (gyroData) => {
      fetch(inputValue+'/gyro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gyroData:gyroData// Send the change in X and Y positions
        }),
      });
    };

    const gyroscopeListener = Gyroscope.addListener((gyroData) => {
      // sendDataToServer(gyroData);
    });

    return () => {
      gyroscopeListener.remove();
    };
  }, []);

  const handleFire = () => {
    // Send a request to the server indicating the "Fire" button was pressed (right-click)
    fetch(inputValue+'/fire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'fire',
      }),
    });
  };

  const handleScope = () => {
    // Send a request to the server indicating the "Scope" button was pressed (left-click)
    fetch(inputValue+'/scope', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'scope',
      }),
    });
  };

  return (
    <View style={styles.container} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <TouchableOpacity   onPress={handleScope} style={styles.fire}>
        <Text  color="#FF0000" >SCOPE</Text>
      </TouchableOpacity>
      <TextInput id='localip' placeholder='localip'></TextInput>
      <TouchableOpacity   onPress={handleFire} style={styles.button}>
        <Text color="#FF0000" >FIRE</Text>
      </TouchableOpacity>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleInputChange}
        value={inputValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom:0,
    width: 100, // Set the width of the button
    height: 100, // Set the height of the button
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  fire: {
   marginBottom:400,
   backgroundColor:"red",
   width: 100, // Set the width of the button
   height: 100,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 10,
  },
   coordinatesText: {
    marginTop: 20,
    fontSize: 16,
  }
});
