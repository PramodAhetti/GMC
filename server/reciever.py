from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import json
import pyautogui

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

# Socket.io connection handling
@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('gyro')
def handle_gyro(data):
    gyro_data = json.loads(data)
    gyro_data = gyro_data.get('gyroData', {})
    # Handle gyro data processing here
    # Example: Adjust mouse position based on gyro data
    cur = pyautogui.position()
    targetX = cur[0] - gyro_data['x'] * 100
    targetY = cur[1] + gyro_data['z'] * 60
    pyautogui.moveTo(targetX, targetY)

@socketio.on('movement')
def handle_movement(key):
    key = key.decode('utf-8')
    # Handle key movement here
    # Example: Simulate key press
    pyautogui.keyDown(key)
    pyautogui.keyUp(key)

@socketio.on('touch')
def handle_touch(data):
    touch_data = json.loads(data)
    touch_data = touch_data.get('touchData', {})
    x, y = touch_data.get('x', 0), touch_data.get('y', 0)
    # Handle touch data processing here
    # Example: Adjust mouse position based on touch data
    cur = pyautogui.position()
    # Example: Move the mouse directly to the specified coordinates
    pyautogui.moveTo(cur[0] + y * 3, cur[1] - x * 3)


@socketio.on('fire')
def handle_fire(data):
    print('Fire action triggered')
    # Handle fire action here
    # Example: Simulate a mouse click
    pyautogui.click(button='left')

@socketio.on('scope')
def handle_scope(data):
    print('Scope action triggered')
    # Handle scope action here
    # Example: Simulate a mouse click
    pyautogui.click(button='right')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    # Change the host to '0.0.0.0' to make it accessible on the local network
    socketio.run(app, host='0.0.0.0', port=12345)