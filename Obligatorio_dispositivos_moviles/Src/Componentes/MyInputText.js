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
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#d3d3d3",
    borderWidth: 2,
    padding: 10,
  },
  input: {
    color: "gray",
  },
});
