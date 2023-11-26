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
  const workTime = 2;
  const breakTime = 1;

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
        onRequestClose={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
      >
        {/* <Modal transparent={modalVisible} presentationStyle="pageSheet"> */}
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.titletext}> Work Time :</Text>

          <TextInput
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
            autoFocus
            keyboardType="number-pad"
            // value={"2"}
            onChangeText={() => {}}
          ></TextInput>
          <Button
            title="change"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </SafeAreaView>
      </Modal>
      <View>
        <Text style={styles.titletext}>Pomodoro Timer</Text>
        <Text style={styles.titletext}>Work Time : {workTime} minutes</Text>
        <Button
          title="edit"
          onPress={() => {
            setModalVisible(true);
          }}
        />
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
