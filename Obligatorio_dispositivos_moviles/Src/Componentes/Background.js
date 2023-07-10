import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

const Background = ({ children }) => {
  let backgroundImageSource =
    "https://s2.best-wallpaper.net/wallpaper/iphone/1311/Green-nature-branch-leaves-bokeh_iphone_320x480.jpg";

  return (
    <ImageBackground
      style={styles.background}
      source={{ uri: backgroundImageSource }}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  backgroundImage: {
    opacity: 0.5,
  },
});

export default Background;
