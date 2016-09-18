#include <ArduinoJson.h>
#include <stdlib.h>

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
StaticJsonBuffer<1000> jsonBuffer;
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
  getRandomLatLong(); 
}

void lockCar() {
  digitalWrite(ledPinArmed, HIGH);
  digitalWrite(ledPinDisarmed, LOW);
  root["carBlocked"] = true;
  //root["dateTime"] = Datetime.now();
}

void unlockCar() {
  digitalWrite(ledPinArmed, LOW);
  digitalWrite(ledPinDisarmed, HIGH);
  root["triggeredAlarm"] = true;
  getRandomLatLong();
}

void getRandomLatLong() {
  int quantity = 4;
  double latitude[] = {-23.561991, -23.566724, -23.574201, -23.573426, -23.576948};
  double longitude[] = {-46.587174, -46.621592, -46.623517, -46.623809, -46.623031};
  int r = rand() % quantity;

  JsonArray& latlong = root.createNestedArray("latlong");
  latlong.add(latitude[r], 6);
  latlong.add(longitude[r], 6);
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
  delay(5000);
}