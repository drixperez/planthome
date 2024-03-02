#libraries
import RPi.GPIO as GPIO
import time
import smbus
import gspread
import datetime
from oauth2client.service_account import ServiceAccountCredentials

# use the JSON key and scopes to authenticate the user for Google Sheets API
scope = [
  'https://spreadsheets.google.com/feeds',
  'https://www.googleapis.com/auth/drive'
]
credentials = ServiceAccountCredentials.from_json_keyfile_name(
  '"REDACTED"', scope)
client = gspread.authorize(credentials)

# open the greenhouse spreadsheet by its title
spreadsheet = client.open('greenhouse_data')
# choose the second sheet in the spreadsheet
worksheet = spreadsheet.get_worksheet(1)


#pass moisture limits function and make the values floats
def getMoistureLimits():
  MoistMax = worksheet.acell('C2').value
  MoistMax = float(MoistMax)
  MoistMin = worksheet.acell('D2').value
  MoistMin = float(MoistMin)
  return MoistMax, MoistMin


# Set the pin numbering system to BCM
GPIO.setmode(GPIO.BCM)
# Set up pin 21 as an output for the relay
GPIO.setup(21, GPIO.OUT) 

# Analogue to digital I2C address
bus = smbus.SMBus(1)
address = 0x48

# select the input channel
channel = 0
#start pump off
GPIO.output(21, GPIO.LOW)

def getMoisture():
  start_time = time.time()
  #the while loop gives the capacitor 5 seconds to stabilise its voltage
  while time.time() - start_time < 5:
    # Read the value from the input channel
    value = bus.read_byte_data(address, channel)
    # convert the value to voltage
    voltage = value / 255.0 * 3.3
    # wait for 1 second
    time.sleep(1)
  # convert the voltage to a relative moisture
  moisture = (voltage - 2.7952941176470585) / (2.743529411764706-2.7952941176470585) * 100
  #dry 2.7952941176470585
  #wet 2.743529411764706
  return (moisture)

while True:
  #retrieve moisture and limits from functions
  moisture = getMoisture()
  print('moisture: ', moisture)
  MoistMax, MoistMin = getMoistureLimits()
  print('max: ',MoistMax, 'min: ', MoistMin)
  #if under the minimum moisture, turn on the pump
  if moisture < MoistMin:
    GPIO.output(21, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(21, GPIO.LOW)
    print('increasing...')
  now = datetime.datetime.now()
  hour = now.hour
  minute = now.minute
  #if a new hour begins,log sensor reading in spreadsheet
  if minute == 0:
    row = hour + 2
    worksheet.update_cell(row, 2, moisture)
