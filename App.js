import { StatusBar } from "expo-status-bar";
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const workTime = 2;
  const breakTime = 1;

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(workTime);
  const [isStart, setIsStart] = useState(false);
  const [isWorking, setIsWorking] = useState(true);

  useEffect(() => {
    if (isStart) {
      const intervalID = setInterval(() => {
        if (minutes >= 0 && seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0 && seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (minutes === 0) {
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
    <View style={styles.container}>
      <Text style={styles.text}>
        {minutes < 10 ? "0" + minutes : minutes} :{" "}
        {seconds < 10 ? "0" + seconds : seconds}{" "}
      </Text>
      {/* <Pressable
        onPress={() => {
          setIsStart(true);
        }}
        style={styles.press}
      >
        <Text> start </Text>
      </Pressable> */}

      <View style={styles.button}>
        <Button title="start" onPress={() => setIsStart(true)} />
      </View>
      <View style={styles.button}>
        <Button title="stop" onPress={() => setIsStart(false)} />
      </View>
      <View style={styles.button}>
        <Button title="reset" onPress={resetTimer} />
      </View>
      {/* <Button
        title="console sec"
        onPress={() => console.log(`seconds : ${seconds}`)}
      />
      <Button
        title="console min"
        onPress={() => console.log(`minutes : ${minutes}`)}
      />

      <Button
        title="console isWorking"
        onPress={() => console.log(isWorking)}
      /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
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
