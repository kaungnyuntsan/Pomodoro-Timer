import { StatusBar } from "expo-status-bar";
import { SectionList, StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(2);

  // useEffect(() => {
  //   if (second >= 0) {
  //     const intervalID = setInterval(() => setSecond(second - 1), 1000);
  //     return () => clearInterval(intervalID);
  //   } else if (minute > 0) {
  //     setMinute(minute - 1);
  //     // setSecond(59);
  //     setSecond(9);
  //   } else if (minute === 0) {
  //     setSecond(0);
  //   }
  //   console.log(`second : ${second}`);
  //   console.log(`minute : ${minute}`);
  // }, [second, minute]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {minute < 10 ? "0" + minute : minute} :{" "}
        {second < 10 ? "0" + second : second}{" "}
      </Text>
      <Button title="start" onPress={() => console.log(second)} />
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
