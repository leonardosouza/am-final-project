#include <ArduinoJson.h>

const int ledPinArmed = 12;
const int ledPinDisarmed = 13;

const int buttonArmed = 4;
const int buttonDisarmed = 2;
const int buzzerAlarm = 11;

int stateArmed = 0;
int stateDisarmed = 0;
StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

void setup() {
  pinMode(ledPinArmed, OUTPUT);
  pinMode(ledPinDisarmed, OUTPUT);
  pinMode(buzzerAlarm, OUTPUT);
  
  pinMode(buttonArmed, INPUT);
  pinMode(buttonDisarmed, INPUT);
  
  root["deviceId"] = "aee5a6aa467faa454e8f27e7051dd550";
  root["sensor"] = "alarm";
  root["sensorArmed"] = false;
  root["triggeredAlarm"] = false;
}

void loop() {  
  stateArmed = digitalRead(buttonArmed);
  if(stateArmed == HIGH) {
    digitalWrite(ledPinArmed, HIGH);
    root["sensorArmed"] = true;
    root["currentLatitude"] = "-23.566999";
    root["currentLongitude"] = "-46.6338";
  }

  stateDisarmed = digitalRead(buttonDisarmed);
  if(stateDisarmed == HIGH && root["sensorArmed"]) {
    digitalWrite(ledPinArmed, LOW);
    digitalWrite(ledPinDisarmed, HIGH);
    root["triggeredAlarm"] = true;
  }

  if(root["sensorArmed"] && root["triggeredAlarm"]) {
    tone(buzzerAlarm, 2000);

    if(stateArmed == HIGH) {
      tone(buzzerAlarm, 3000);
      delay(500);
      tone(buzzerAlarm, 4000);
      delay(500);
      tone(buzzerAlarm, 3000);
      delay(500);
      noTone(buzzerAlarm);
      digitalWrite(ledPinDisarmed, LOW);
      root["triggeredAlarm"] = false;
      root["sensorArmed"] = true;
    }
  }

  root.printTo(Serial);
  Serial.println();
  delay(1000);
}