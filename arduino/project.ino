#include <ArduinoJson.h>

const int ledPinArmed = 12;
const int ledPinDisarmed = 13;
int incomingByte = 0;

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
  root["currentLatitude"] = "";
  root["currentLongitude"] = "";
}

void lockCar() {
  Serial.println("LOCK CAR");
  digitalWrite(ledPinArmed, HIGH);
  digitalWrite(ledPinDisarmed, LOW);
  root["sensorArmed"] = true;
  root["currentLatitude"] = "-23.566999";
  root["currentLongitude"] = "-46.6338";
}

void unlockCar() {
  Serial.println("UNLOCK CAR");
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
  root["sensorArmed"] = false;
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
      if(!root["sensorArmed"]) {
        lockCar();
      }
    } else if(incomingByte == 85) {
      // SEND U(NLOCKED)
      if(root["sensorArmed"]) {
        unlockCar();
      }
    } else if(incomingByte == 82) {
      // SEND R(ESET)
      resetAlarm();
    }
  
    // say what you got:
    Serial.print("I received: ");
    Serial.println(incomingByte, DEC);
  }
   
  stateArmed = digitalRead(buttonArmed);
  if(stateArmed == HIGH) {
    lockCar();
  }

  stateDisarmed = digitalRead(buttonDisarmed);
  if(stateDisarmed == HIGH && root["sensorArmed"]) {
    unlockCar();
  }

  if(root["sensorArmed"] && root["triggeredAlarm"]) {
    tone(buzzerAlarm, 2000);

    if(stateArmed == HIGH) {
      resetAlarm();
    }
  }

  root.printTo(Serial);
  Serial.println();
  delay(1000);
}