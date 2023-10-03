from flask import Flask, request, jsonify
import pyautogui

app = Flask(__name__)

GYRO_SENSITIVITY_X = 40
GYRO_SENSITIVITY_Z = 40
MOUSE_SENSITIVITY = 3

@app.route('/gyro', methods=['POST'])
def handle_gyro():
    data = request.get_json()
    gyro_data = data.get('gyroData', {})
    cur_x, cur_y = pyautogui.position()
    target_x = cur_x - gyro_data.get('x', 0) * GYRO_SENSITIVITY_X
    target_y = cur_y + gyro_data.get('z', 0) * GYRO_SENSITIVITY_Z
    pyautogui.moveTo(target_x, target_y)
    return 'Cursor Moved'

@app.route('/fire', methods=['POST'])
def handle_fire():
    print('Fire button pressed')
    pyautogui.click(button='left')
    return 'Fire button pressed'

@app.route('/touch', methods=['POST'])
def handle_touch():
    data = request.get_json()
    touch_data = data.get('touchData', {})
    cur_x, cur_y = pyautogui.position()
    new_x = cur_x + touch_data.get('y', 0) * MOUSE_SENSITIVITY
    new_y = cur_y - touch_data.get('x', 0) * MOUSE_SENSITIVITY
    pyautogui.moveTo(new_x, new_y)
    return 'Cursor Moved'

@app.route('/scope', methods=['POST'])
def handle_scope():
    print('Scope button pressed')
    pyautogui.click(button='right')
    return 'Scope button pressed'

if __name__ == '__main__':
    app.run(port=5000)
