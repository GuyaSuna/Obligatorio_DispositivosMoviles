import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Icon } from "react-native";

import PaginaPrincipal from "../Screen/PaginaPrincipal";
import User from "../Screen/Usuarios/User";

import Observaciones from "../Screen/Observaciones/Observaciones";
import Tratamientos from "../Screen/Tratamientos/Tratamientos";

import Zonas from "../Screen/Zonas/Zonas";
import AltaZona from "../Screen/Zonas/AltaZona";
import BajaZona from "../Screen/Zonas/BajaZona";
import ModificarZona from "../Screen/Zonas/ModificarZona";

import ScreenInsumos from "../Screen/Insumos/ScreenInsumos";
import AddInsumo from "../Screen/Insumos/AddInsumo";
import DeleteInsumo from "../Screen/Insumos/DeleteInsumo";
import EditInsumo from "../Screen/Insumos/EditInsumo";

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: "#f4511e",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PaginaPrincipal"
          component={PaginaPrincipal}
          options={{
            headerTitle: "Fruit Farm",
            headerStyle: {
              backgroundColor: "#95C117",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerBackTitleVisible: false, // Oculta el título de retroceso en iOS
          }}
        />

        <Stack.Screen
          name="Usuarios"
          component={User}
          options={{
            title: "Registrar Usuario",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Insumos"
          component={ScreenInsumos}
          options={{
            title: "Registrar Usuario",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddInsumo"
          component={AddInsumo}
          options={{
            title: "INGRESO DE INSUMOS",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteInsumo"
          component={DeleteInsumo}
          options={{
            title: "ELIMINAR INSUMOS",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="EditInsumo"
          component={EditInsumo}
          options={{
            title: "EDITAR INSUMOS",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
         
        <Stack.Screen
          name="Zonas"
          component={Zonas}
          options={{
            headerTitle: "Zonas",
            headerStyle: {
              backgroundColor: "#95C117",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerBackTitleVisible: false, // Oculta el título de retroceso en iOS
          }}
        />
         <Stack.Screen
          name="AltaZona"
          component={AltaZona}
          options={{
            headerTitle: "Alta Zonas",
            headerStyle: {
              backgroundColor: "#95C117",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerBackTitleVisible: false, // Oculta el título de retroceso en iOS
          }}
        />
         <Stack.Screen
          name="BajaZona"
          component={BajaZona}
          options={{
            headerTitle: "Baja Zonas",
            headerStyle: {
              backgroundColor: "#95C117",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerBackTitleVisible: false, // Oculta el título de retroceso en iOS
          }}
        />
         <Stack.Screen
          name="ModificarZona"
          component={ModificarZona}
          options={{
            headerTitle: "Modificar Zonas",
            headerStyle: {
              backgroundColor: "#95C117",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerBackTitleVisible: false, // Oculta el título de retroceso en iOS
          }}
        />
        <Stack.Screen
          name="Observaciones"
          component={Observaciones}
          options={{
            title: "Registrar Usuario",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Tratamientos"
          component={Tratamientos}
          options={{
            title: "Registrar Usuario",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
           
       

           </Stack.Navigator>
    </NavigationContainer>                
  )
}

export default Navigation;
