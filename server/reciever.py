import socket
import pyautogui
import json

# Set up the server socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(('0.0.0.0', 12345))
server_socket.listen(5)

print("Server is listening for incoming connections...")

# Accept client connections
client_socket, addr = server_socket.accept()
print('Client connected:', addr)

while True:
    data = client_socket.recv(1024).decode('utf-8')
    if not data:
        break
    
    # Parse JSON data
    try:
        parsed_data = json.loads(data)
        event_type = parsed_data.get('event')
        event_data = parsed_data.get('data', {})
        print(event_data)
        if event_type == 'gyro':
            gyro_data = event_data.get('gyroData', {})
            cur = pyautogui.position()
            target_x = cur[0] - gyro_data.get('x', 0) * 60
            target_y = cur[1] + gyro_data.get('y', 0) * 60
            pyautogui.moveTo(target_x, target_y)

        elif event_type == 'movement':
            key = event_data.get('key', '')
            pyautogui.press(key)

        elif event_type == 'touch':
            touch_data = event_data.get('touchData', {})
            x, y = touch_data.get('x', 0), touch_data.get('y', 0)
            cur = pyautogui.position()
            pyautogui.moveTo(cur[0] + y * 3, cur[1] - x * 3)

        elif event_type == 'fire':
            pyautogui.click(button='left')

        elif event_type == 'scope':
            pyautogui.click(button='right')

    except json.JSONDecodeError:
        print('Error decoding JSON data:', data)

client_socket.close()
