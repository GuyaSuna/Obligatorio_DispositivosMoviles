import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const MyInputText = ({
  maxLength = 40,
  minLength = 0,
  onChangeText = () => console.log("change text"),
  placeholder = "placeholder",
  keyboardType = "default",
  secureTextEntry = false,
  returnKeyType = "done",
  numberOfLines = 1,
  mutiline = false,
  onSubmitEditing = () => console.log("submit editing"),
  blurOnSubmit = false,
  value = "",
  defaultValue = "",
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        maxLength={maxLength}
        minLength={minLength}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        numberOfLines={numberOfLines}
        mutiline={mutiline}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        value={value}
        defaultValue={defaultValue}
      />
    </View>
  );
};

export default MyInputText;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginLeft: 38,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 3,

    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 40,
  },
});