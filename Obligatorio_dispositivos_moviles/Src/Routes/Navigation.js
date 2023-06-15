import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import PaginaPrincipal from "../Screen/PaginaPrincipal";





import Observaciones from "../Screen/Observaciones/Observaciones";
import Tratamientos from "../Screen/Tratamientos/Tratamientos";



import Zonas from "../Screen/Zonas/Zonas";
import AltaZona from "../Screen/Zonas/AltaZona";

import ModificarZona from "../Screen/Zonas/ModificarZona";
import TodasLasZonas from "../Screen/Zonas/TodasLasZonas";
import UnaZona from "../Screen/Zonas/UnaZona";

import ScreenInsumos from "../Screen/Insumos/ScreenInsumos";
import AddInsumo from "../Screen/Insumos/AddInsumo";
import DeleteInsumo from "../Screen/Insumos/DeleteInsumo";
import EditInsumo from "../Screen/Insumos/EditInsumo";
import ViewAllInsumos from "../Screen/Insumos/ViewAllInsumos";
import ScreenUsuarios from "../Screen/Usuarios/ScreenUsuarios";

import AltaUsuario from "../Screen/Usuarios/AltaUsuarios";
import DeleteUsuarios from "../Screen/Usuarios/DeleteUsuarios";
import TodosLosUsuarios from "../Screen/Usuarios/TodosLosUsuarios";
import UnUsuario from "../Screen/Usuarios/UnUsuario";
import EditUsuario from "../Screen/Usuarios/EditUsuario";

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
          name="Pagina Usuarios"
          component={ScreenUsuarios}
          options={{
            title: "Pagina Usuario",
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
          name="AltaUsuarios"
          component={AltaUsuario}
          options={{
            title: "AltaUsuarios",
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
          name="TodosLosUsuarios"
          component={TodosLosUsuarios}
          options={{
            headerTitle: "Todos Los Usuarios",
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
          name="UnUsuario"
          component={UnUsuario}
          options={{
            headerTitle: "Ver Un Usuario",
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
          name="EditUsuario"
          component={EditUsuario}
          options={{
            headerTitle: "Editar Usuario",
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
          name="Insumos"
          component={ScreenInsumos}
          options={{
            title: "Insumos",
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
          name="ViewAllInsumos"
          component={ViewAllInsumos}
          options={{
            title: "INSUMOS",
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
          name="TodasLasZonas"
          component={TodasLasZonas}
          options={{
            headerTitle: "Ver Todas Las Zonas",
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
          name="UnaZona"
          component={UnaZona}
          options={{
            headerTitle: "Ver Una Zona",
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
