import React from "react";

const Menu = () => {
  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>USUARIOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ZONAS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>INSUMOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>OBSERVACIONES</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>TRATAMIENTOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Componente 6</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
