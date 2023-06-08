import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MySingleButton = ({
    title = "Mi botón",
    btnColor = "red",
    onPress = () => console.log("click"),
}) => {
    return (
        <TouchableOpacity style = {[styles.button, {backgroundColor: btnColor}]} onPress = {onPress}>
            <View style = {styles.container}>
<Text style = {style.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}













const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flex:1,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        padding: 10,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,
    },
    text: {
        color: 'white',
    }
