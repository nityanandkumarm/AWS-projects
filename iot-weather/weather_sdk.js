var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: './weather-private.pem.key',
   certPath: './weather-certificate.pem.crt',
     caPath: './AmazonRootCA1.pem',
   clientId: 'weatherClient',
       host: 'a1amrx5imizunx-ats.iot.us-east-1.amazonaws.com'
 });

 device
  .on('connect', function() {
    console.log('connected-weather-device');
    device.subscribe('weather');

    device.publish('weather', JSON.stringify({'thingId':"iot_sensor", 'deviceSite':001, 
    'deviceId':"ACT01", 'deviceTemperature':60, 'co2Level':1000, 'airPressure':1004, 'humidity':96, 
    'atmTemperature':25, 'airSpeed':10}));

    function myRandomiser(start, end){
        return Math.floor(start + (Math.random()*(end-start)));
    }

    function weatherDataTimeSeries(){
        let data = {};
        data['thingId'] = "iot_sensor"

        //device identifiers
        data['deviceSite'] = 001
        data['deviceId'] = "ACT01"

        //for device health
        data['deviceTemperature'] = myRandomiser(5, 50)
        //for device-filter status
        data['co2Level'] = myRandomiser(400, 1000)

        //factors for predicting or monitoring weather
        data['airPressure'] = myRandomiser(998, 1004)
        data['humidity'] = myRandomiser(70, 96)
        data['atmTemperature'] = myRandomiser(25, 50)
        data['airSpeed'] = myRandomiser(2,10)

        device.publish('weather', JSON.stringify(data));
        console.log("Sent: " + JSON.stringify(data));
    }
    setInterval(weatherDataTimeSeries, 10000);
  });