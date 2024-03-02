#libraries
import RPi.GPIO as GPIO
import time
import gspread
import board
import adafruit_dht
import datetime
from oauth2client.service_account import ServiceAccountCredentials
 
# use the JSON key and scopes to authenticate the user to access the Google Sheets API
scope = [
  'https://spreadsheets.google.com/feeds',
  'https://www.googleapis.com/auth/drive'
]
credentials = ServiceAccountCredentials.from_json_keyfile_name(
  '"REDACTED"', scope)
client = gspread.authorize(credentials)

# open the greenhouse spreadsheet by its title in drive
spreadsheet = client.open('greenhouse_data')
# choose the second sheet in the spreadsheet
worksheet = spreadsheet.get_worksheet(1)


#pass environmental limits function and make the values floats
def getHeatLimits():
  heatMax = worksheet.acell('A2').value
  heatMax = float(heatMax)
  heatMin = worksheet.acell('B2').value
  heatMin = float(heatMin)
  return heatMax, heatMin

# Set the pin numbering system to BCM
GPIO.setmode(GPIO.BCM)
# Set up pin 21 as an relay output
GPIO.setup(21, GPIO.OUT)
#declare that the pin4 input is a dht22 via adafruit_dht library
dhtDevice = adafruit_dht.DHT22(board.D4, use_pulseio=False)


while True:
  try:
    #get tempertaure
    temperature = dhtDevice.temperature
    print('temperature: ',temperature)
    #retrieve limits from function
    heatMax, heatMin = getHeatLimits()
    print('max: ', heatMax, 'min: ', heatMin)
    #pause for 2.1s so as to need exceed 30 api requests per second
    time.sleep(2.1)
    #get the time
    now = datetime.datetime.now()
    hour = now.hour
    minute = now.minute
    #WHILE under the required temp run heater
    GPIO.output(21, GPIO.LOW)
    while temperature < heatMin:
      print('temperature: ',temperature)
      GPIO.output(21, GPIO.HIGH)
      print('increasing...')
      #if the time shows that a new hour has begun, write data to spreadsheet
      if minute == 0:
        row = hour + 2
        worksheet.update_cell(row, 3, temperature)
    #2ND branch for updating speadsheet every new hour incase the code is running the temperature increasing loop during the new hour
    if minute == 0:
      row = hour + 2
      worksheet.update_cell(row, 3, temperature)
  #if dht takes too long to report values, wait 2s and retry
  except RuntimeError as error:
    time.sleep(2.0)
  #if there are exceptions, report them
  except Exception as error:
    dhtDevice.exit()
    raise error
