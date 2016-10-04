#include <ArduinoJson.h>
#include <stdlib.h>

const int ledPinArmed = 12;
const int ledPinDisarmed = 13;
int incomingByte = 0;

const int buttonArmed = 9;
const int buttonDisarmed = 8;
const int buzzerAlarm = 11;
const int sensorPir = 10;

int stateSensor;
int stateArmed = 0;
int stateDisarmed = 0;
double fixedLat = -23.561991;
double fixedLong = -46.587174;

StaticJsonBuffer<400> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

void setup() {
  pinMode(ledPinArmed, OUTPUT);
  pinMode(ledPinDisarmed, OUTPUT);
  pinMode(buzzerAlarm, OUTPUT);

  pinMode(buttonArmed, INPUT);
  pinMode(buttonDisarmed, INPUT);
  pinMode(sensorPir, INPUT);

  root["deviceId"] = "0x14100000-0x2341-0x8036";
  root["sensorPir"] = stateSensor;
  root["carBlocked"] = false;
  root["triggeredAlarm"] = false;
  getRandomLatLong();
}

void lockCar() {
  digitalWrite(ledPinArmed, HIGH);
  digitalWrite(ledPinDisarmed, LOW);
  root["carBlocked"] = true;
  getRandomLatLong();
}

void unlockCar() {
  digitalWrite(ledPinArmed, LOW);
  digitalWrite(ledPinDisarmed, HIGH);
  root["triggeredAlarm"] = true;
  getRandomLatLong();
}

void getSequentialLatLong() {
  fixedLat = fixedLat - 0.000002;
  fixedLong = fixedLong - 0.000002;

  JsonArray& latlong = root.createNestedArray("latlong");
  if (latlong.success()) {
    latlong.add(fixedLat, 6);
    latlong.add(fixedLong, 6);
  } else {
    jsonBuffer = StaticJsonBuffer<400>();
    JsonObject& root = jsonBuffer.createObject();
    root["deviceId"] = "0x14100000-0x2341-0x8036";
    root["sensorPir"] = stateSensor;
    root["carBlocked"] = false;
    root["triggeredAlarm"] = false;
    getRandomLatLong();
  }
}

void getRandomLatLong() {
  int quantity = 16;
  double latitude[] = { -23.561991, -23.566724, -23.574201, -23.573426, -23.576948, -23.561991, -23.566724, -23.574201, -23.573426, -23.576948, -23.561991, -23.566724, -23.574201, -23.573426, -23.576948, -23.561991, -23.566724, -23.574201, -23.573426, -23.576948};
  double longitude[] = { -46.587174, -46.621592, -46.623517, -46.623809, -46.623031, -46.587174, -46.621592, -46.623517, -46.623809, -46.623031, -46.587174, -46.621592, -46.623517, -46.623809, -46.623031, -46.587174, -46.621592, -46.623517, -46.623809, -46.623031};
  int r = rand() % quantity;

  fixedLat = latitude[r];
  fixedLong = longitude[r];
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
  getRandomLatLong();
}

void loop() {
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();

    if (incomingByte == 76) {
      // SEND L(OKED)
      if (!root["carBlocked"]) {
        lockCar();
      }
    } else if (incomingByte == 85) {
      // SEND U(NLOCKED)
      if (root["carBlocked"]) {
        unlockCar();
      }
    } else if (incomingByte == 82) {
      // SEND R(ESET)
      resetAlarm();
    }

    // say what you got:
    // Serial.print("I received: ");
    // Serial.println(incomingByte, DEC);
  }

  stateArmed = digitalRead(buttonArmed);
  if (stateArmed == HIGH) {
    lockCar();
  }

  stateDisarmed = digitalRead(buttonDisarmed);
  if (stateDisarmed == HIGH && root["carBlocked"]) {
    unlockCar();
  }

  if (root["carBlocked"] && root["triggeredAlarm"]) {
    tone(buzzerAlarm, 2000);

    if (stateArmed == HIGH) {
      resetAlarm();
    }
  }

  stateSensor = digitalRead(sensorPir);
  root["sensorPir"] = stateSensor;

  if (root["sensorPir"] == HIGH && root["carBlocked"]) {
    unlockCar();
  }

  getSequentialLatLong();
  root.printTo(Serial);
  Serial.println();
  Serial.flush();
  delay(2000);
}