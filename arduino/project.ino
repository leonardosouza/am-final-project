#include <TinyGPS++.h>

#include <ArduinoJson.h>

const int ledPinArmed = 12;
const int ledPinDisarmed = 13;
int incomingByte = 0;

const int buttonArmed = 5;
const int buttonDisarmed = 2;
const int buzzerAlarm = 11;
const int sensorPir = 7;  

int stateSensor;
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
  pinMode(sensorPir, INPUT);
  
  root["deviceId"] = "aee5a6";
  root["sensorPir"] = stateSensor;
  root["carBlocked"] = false;
  root["triggeredAlarm"] = false;
  root["currentLatitude"] = "";
  root["currentLongitude"] = "";
}

void lockCar() {
  digitalWrite(ledPinArmed, HIGH);
  digitalWrite(ledPinDisarmed, LOW);
  root["carBlocked"] = true;
  root["currentLatitude"] = "send lat";
  root["currentLongitude"] = "send long";
}

void unlockCar() {
  digitalWrite(ledPinArmed, LOW);
  digitalWrite(ledPinDisarmed, HIGH);
  root["triggeredAlarm"] = true;
}

void offBuzzer() {
  tone(buzzerAlarm, 3000);
  delay(200);
  tone(buzzerAlarm, 4000);
  delay(200);
  tone(buzzerAlarm, 3000);
  delay(200);
  noTone(buzzerAlarm);
}

void resetAlarm() {
  offBuzzer();
  digitalWrite(ledPinArmed, LOW);
  digitalWrite(ledPinDisarmed, LOW);
  root["carBlocked"] = false;
  root["currentLatitude"] = "";
  root["currentLongitude"] = "";
  root["triggeredAlarm"] = false;
}

void loop() { 
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();

    if(incomingByte == 76) {
      // SEND L(OKED)
      if(!root["carBlocked"]) {
        lockCar();
      }
    } else if(incomingByte == 85) {
      // SEND U(NLOCKED)
      if(root["carBlocked"]) {
        unlockCar();
      }
    } else if(incomingByte == 82) {
      // SEND R(ESET)
      resetAlarm();
    }
  
    // say what you got:
    // Serial.print("I received: ");
    // Serial.println(incomingByte, DEC);
  }
   
  stateArmed = digitalRead(buttonArmed);
  if(stateArmed == HIGH) {
    lockCar();
  }

  stateDisarmed = digitalRead(buttonDisarmed);
  if(stateDisarmed == HIGH && root["carBlocked"]) {
    unlockCar();
  }

  if(root["carBlocked"] && root["triggeredAlarm"]) {
    tone(buzzerAlarm, 2000);

    if(stateArmed == HIGH) {
      resetAlarm();
    }
  }

  stateSensor = digitalRead(sensorPir);
  root["sensorPir"] = stateSensor;

  if(root["sensorPir"] == HIGH && root["carBlocked"]) {
    unlockCar();
  }
  

  root.printTo(Serial);
  Serial.println();
  delay(1000);
}