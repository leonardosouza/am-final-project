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

void loop() { 
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();

    if(incomingByte == 76) {
      // SEND L(OKED)
      Serial.println("LOCK CAR");
      digitalWrite(ledPinArmed, HIGH);
      root["sensorArmed"] = true;
      root["currentLatitude"] = "-23.566999";
      root["currentLongitude"] = "-46.6338";
    } else if(incomingByte == 85) {
      // SEND U(NLOCKED)
      Serial.println("UNLOCK CAR");
      digitalWrite(ledPinArmed, LOW);
      digitalWrite(ledPinDisarmed, HIGH);
      root["triggeredAlarm"] = true;
    } else if(incomingByte == 82) {
      // SEND R(ESET)
      
      tone(buzzerAlarm, 3000);
      delay(500);
      tone(buzzerAlarm, 4000);
      delay(500);
      tone(buzzerAlarm, 3000);
      delay(500);
      noTone(buzzerAlarm);
      digitalWrite(ledPinDisarmed, LOW);
      digitalWrite(ledPinArmed, LOW);
      root["triggeredAlarm"] = false;
      root["sensorArmed"] = true;
      root["currentLatitude"] = "";
      root["currentLongitude"] = "";
    }
  
    // say what you got:
    Serial.print("I received: ");
    Serial.println(incomingByte, DEC);
  }
   
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