import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Vibration,
  Modal,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [workTime, setWorkTime] = useState(2);
  const [breakTime, setBreakTime] = useState(1);

  const [inputWorkTime, setInputWorkTime] = useState(workTime.toString());
  const [inputBreakTime, setInputBreakTime] = useState(breakTime.toString());

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(workTime);
  const [isStart, setIsStart] = useState(false);
  const [isWorking, setIsWorking] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isStart) {
      const intervalID = setInterval(() => {
        if (minutes >= 0 && seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0 && seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          // setSeconds(5);
        } else if (minutes === 0) {
          Vibration.vibrate([1000, 1000, 1000]);
          setIsStart(false);
          setIsWorking(!isWorking);
          setMinutes(isWorking ? breakTime : workTime);
          setSeconds(0);
        }
      }, 1000);
      return () => clearInterval(intervalID);
    }
    // console.log("effect run");
  }, [isStart, seconds, minutes]);

  const resetTimer = () => {
    isWorking ? setMinutes(workTime) : setMinutes(breakTime);
    setSeconds(0);
    setIsStart(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        // transparent={modalVisible}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={() => {
          setInputWorkTime(workTime.toString());
          setInputBreakTime(breakTime.toString());
          setModalVisible(!modalVisible);
        }}
        visible={modalVisible}
      >
        {/* <Modal transparent={modalVisible} presentationStyle="pageSheet"> */}
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.titletext}> Work Time (minutes):</Text>

          <TextInput
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
            autoFocus
            maxLength={3}
            keyboardType="number-pad"
            value={inputWorkTime}
            onChangeText={setInputWorkTime}
          ></TextInput>
          <Text style={styles.titletext}> Break Time (minutes):</Text>

          <TextInput
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
            maxLength={3}
            keyboardType="number-pad"
            value={inputBreakTime}
            onChangeText={setInputBreakTime}
          ></TextInput>
          <Button
            title="change"
            onPress={() => {
              setIsStart(false);
              setMinutes(parseInt(inputWorkTime));
              setSeconds(0);
              setWorkTime(parseInt(inputWorkTime));
              setBreakTime(parseInt(inputBreakTime));
              setModalVisible(!modalVisible);
            }}
          />
        </SafeAreaView>
      </Modal>
      <View style={{ width: 200 }}>
        <Text style={styles.titletext}>Pomodoro Timer</Text>
        <View style={{ borderWidth: 1, width: 100 }}>
          <Button
            title="edit timer"
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
        <Text style={styles.titletext}>Work Time : {workTime} minutes</Text>

        <Text style={styles.titletext}>Break Time : {breakTime} minutes</Text>
        <Text style={styles.titletext}>
          Currently {isWorking ? "working" : "take a break"}!
        </Text>
      </View>
      <View style={styles.timer}>
        <Text style={styles.text}>
          {minutes < 10 ? "0" + minutes : minutes} :{" "}
          {seconds < 10 ? "0" + seconds : seconds}{" "}
        </Text>

        <View style={styles.button}>
          <Button title="start" onPress={() => setIsStart(true)} />
        </View>
        <View style={styles.button}>
          <Button title="stop" onPress={() => setIsStart(false)} />
        </View>
        <View style={styles.button}>
          <Button title="reset" onPress={resetTimer} />
        </View>
      </View>
      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
  },
  text: {
    fontSize: 30,
  },
  timer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titletext: {
    fontSize: 17,
  },
  // press: {
  //   borderWidth: 1,
  //   margin: 10,
  //   padding: 5,
  // },
  button: {
    margin: 5,
  },
});
