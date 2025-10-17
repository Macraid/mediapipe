#輸出"你好"的程式
print("你好")

#寫一個利用arduino控制MH-Z19C
import serial
import time

# 設定序列埠
ser = serial.Serial('/dev/ttyUSB0', 9600)
time.sleep(2)  # 等待連接穩定

# 發送指令
ser.write(b'AT+MHZ19C\r\n')

# 讀取回應
response = ser.readline()
print(response)

# 關閉序列埠
ser.close()