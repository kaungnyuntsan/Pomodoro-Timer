import { StatusBar } from "expo-status-bar";
import { SectionList, StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const workTime = 2;
  const breakTime = 5;

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(workTime);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    if (isStart) {
      const intervalID = setInterval(() => {
        if (minutes >= 0 && seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0 && seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(5);
        } else if (minutes === 0) {
          setIsStart(false);
          // resetTimer(breakTime);
          setMinutes(breakTime);
          setSeconds(0);
        }
      }, 1000);
      return () => clearInterval(intervalID);
    }
    console.log("effect run");
  }, [isStart, seconds, minutes]);

  const resetTimer = () => {
    setMinutes(workTime);
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {minutes < 10 ? "0" + minutes : minutes} :{" "}
        {seconds < 10 ? "0" + seconds : seconds}{" "}
      </Text>
      <Button
        title="start"
        onPress={() => {
          setIsStart(true);
        }}
      />
      <Button title="stop" onPress={() => setIsStart(false)} />

      <Button title="reset" onPress={resetTimer} />
      <Button
        title="console sec"
        onPress={() => console.log(`seconds : ${seconds}`)}
      />
      <Button
        title="console min"
        onPress={() => console.log(`minutes : ${minutes}`)}
      />
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
});
