import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MyInputOpciones = ({ opciones }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Opciones:</Text>
      <View style={styles.optionsContainer}>
        {opciones.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => selectOption(option)}
            style={[
              styles.option,
              selectedOption === option && styles.selectedOption,
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.selectedText}>
        Opción seleccionada: {selectedOption || "Ninguna"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  option: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "blue",
  },
  optionText: {
    fontSize: 14,
    color: "black",
  },
  clearButton: {
    marginTop: 10,
  },
  clearButtonText: {
    color: "red",
  },
  selectedText: {
    marginTop: 10,
  },
});

export default MyInputOpciones;
