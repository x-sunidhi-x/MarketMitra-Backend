#include <DHT22.h>

DHT22 dht22(2);

void setup() {
    Serial.begin(9600);

}

void loop() {
       if(dht22.getTemperature()>25) 
        Serial.println(dht22.getTemperature());
       
        // Serial.println(dht22.getHumidity());
        

}