#install the libraries
import board
import neopixel
import adafruit_veml7700
import gspread
import time
import datetime
from oauth2client.service_account import ServiceAccountCredentials

# use the JSON key and scopes to authenticate with the Google Sheets API
scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name('"REDACTED"', scope)
client = gspread.authorize(credentials)

# open the greenhouse spreadsheet by its title
spreadsheet = client.open('greenhouse_data')

# choose the second sheet in the spreadsheet
worksheet = spreadsheet.get_worksheet(1)

#pass environmental limits function and make the values floats
def getLightLimits():
  lightMax = worksheet.acell('E2').value
  lightMax = float(lightMax)
  lightMin = worksheet.acell('F2').value
  lightMin = float(lightMin)
  return lightMax,lightMin

# Initialize the VEML7700 sensor
#find the light sensor in the i2c grid
i2c = board.I2C() 
#setup the sensor via the adafruit librarry on the i2c pin
veml7700 = adafruit_veml7700.VEML7700(i2c)

# Initialize the WS2812b LED strip on the GPIO 18 with the neopixel library 
#state that the strip has 200 LEDS
pixels = neopixel.NeoPixel(board.D18, 200)

# Set the initial brightness of the LED strip
brightness = 0

#delay to prevent crash
time.sleep(0.5)
while True:
  #delay to make the api request less than 30 times per minute (request limit)
  time.sleep(2.1)
  # Read the current lux level from the VEML7700 sensor
  current = veml7700.light
  print('ambient light: ', current)
  lightMax, lightMin = getLightLimits()
  # Check if the current lux level is less than the required level
  if current < lightMin:
      # Increase the brightness of the LED strip
      brightness += 1
	 print('increasing...')
      # Make sure the brightness doesn't exceed 255
      if brightness > 255:
          brightness = 255
		print('MAX BRIGHTNESS')
  # Check if the current lux level is greater than the required level
  elif current > lightMax:
      # Decrease the brightness of the LED strip
      brightness -= 1
	print('decreasing...')
      # Make sure the brightness doesn't go below 0
      if brightness < 0:
          brightness = 0
	     print('MIN BRIGHTNESS')
  #update leds with new brightness
  
  print('brightness:  ', brightness)
  pixels.fill((brightness, brightness, brightness))
  pixels.show()
  now = datetime.datetime.now()
  hour = now.hour
  minute = now.minute
  #if the time shows that a new hour has begun, write data to spreadsheet
  if minute == 0:
    row = hour + 2
    worksheet.update_cell(row, 4, current)
