import socketio
import json
import threading
import pyautogui

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

# Function to handle client connections
@sio.event
def connect(sid, environ):
    print('Client connected:', sid)

# Function to handle 'touch' event
@sio.event
def touch(sid, data):
    try:
        touch_data = json.loads(data)
        x = touch_data['touchData']['x']
        y = touch_data['touchData']['y']
        new_x = pyautogui.position()[0] + x * 14
        new_y = pyautogui.position()[1] + y * 14
        pyautogui.moveTo(new_x, new_y)
    except Exception as e:
        print('Error handling touch event:', str(e))

# Function to handle 'gyro' event
@sio.event
def gyro(sid, data):
    try:
        gyro_data = json.loads(data)
        # Handle gyro data if needed
    except Exception as e:
        print('Error handling gyro event:', str(e))

# Function to handle 'movement' event
@sio.event
def movement(sid, data):
    try:
        key = data
        # Handle movement event based on the key received ('a', 'w', 's', 'd')
        # For example, you can use pyautogui.press(key) to simulate key press
    except Exception as e:
        print('Error handling movement event:', str(e))

# Function to handle 'fire' event
@sio.event
def fire(sid, data):
    try:
        data=data
        # Handle fire event
        # For example, you can use pyautogui.click(button='left') to simulate left-click
    except Exception as e:
        print('Error handling fire event:', str(e))

# Function to handle 'scope' event
@sio.event
def scope(sid, data):
    try:
        data=data
        # Handle scope event
        # For example, you can use pyautogui.click(button='right') to simulate right-click
    except Exception as e:
        print('Error handling scope event:', str(e))

# Function to handle client disconnections
@sio.event
def disconnect(sid):
    print('Client disconnected:', sid)

# Start the server
if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 12344)), app)
