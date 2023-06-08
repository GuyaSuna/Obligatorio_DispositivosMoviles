import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const MySingleButton = ({
  title = "My Button",
  btnColor = "red",
  onPress = () => console.log("click"),
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: btnColor }]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MySingleButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
    padding: 10,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
});
