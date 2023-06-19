import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PaginaPrincipal from "../Screen/PaginaPrincipal";

import Observaciones from "../Screen/Observaciones/Observaciones";
import AltaObservaciones from "../Screen/Observaciones/AltaObservaciones";
import TodasLasObservaciones from "../Screen/Observaciones/VerTodasLasObservaciones";
import VerObservacion from "../Screen/Observaciones/VerObservacion";
import ModificarObservacion from "../Screen/Observaciones/ModificarObservaiones";



import Tratamientos from "../Screen/Tratamientos/Tratamientos";
import AltaTratamiento from "../Screen/Tratamientos/AltaTratamiento";
import VerTodosLosTratamientos from "../Screen/Tratamientos/VerTodosLosTratamientos";

import Zonas from "../Screen/Zonas/Zonas";
import AltaZona from "../Screen/Zonas/AltaZona";

import ModificarZona from "../Screen/Zonas/ModificarZona";
import TodasLasZonas from "../Screen/Zonas/TodasLasZonas";
import UnaZona from "../Screen/Zonas/UnaZona";

import Insumos from "../Screen/Insumos/Insumos";
import AltaInsumo from "../Screen/Insumos/AltaInsumo";
import BajaInsumo from "../Screen/Insumos/BajaInsumo";
import ModificarInsumo from "../Screen/Insumos/ModificarInsumo";
import TodosLosInusmos from "../Screen/Insumos/TodosLosInsumos";
import UnInsumo from "../Screen/Insumos/UnInsumo";

import ScreenUsuarios from "../Screen/Usuarios/ScreenUsuarios";
import EditUsuario from "../Screen/Usuarios/EditUsuarios";
import AltaUsuario from "../Screen/Usuarios/AltaUsuarios";
import DeleteUsuarios from "../Screen/Usuarios/DeleteUsuarios";
import TodosLosUsuarios from "../Screen/Usuarios/TodosLosUsuarios";
import UnUsuario from "../Screen/Usuarios/UnUsuario";



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
          name="ScreenUsuarios"
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
          name="EditUsuarios"
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
          component={Insumos}
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
          name="AltaInsumo"
          component={AltaInsumo}
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
          name="BajaInsumo"
          component={BajaInsumo}
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
          name="ModificarInsumo"
          component={ModificarInsumo}
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
          name="TodosLosInsumos"
          component={TodosLosInusmos}
          options={{
            headerTitle: "Ver todos los Insumos",
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
          name="UnInsumo"
          component={UnInsumo}
          options={{
            headerTitle: "Ver un Insumo",
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
          name="AltaObservaciones"
          component={AltaObservaciones}
          options={{
            title: "Alta Observaciones",
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
          name="TodasLasObservaciones"
          component={TodasLasObservaciones}
          options={{
            title: "Todas las Observaciones",
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
          name="VerObservaciones"
          component={VerObservacion}
          options={{
            title: "Una Observacion",
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
          name="ModificarObservacion"
          component={ModificarObservacion}
          options={{
            title: "Modificar Observacion",
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
         <Stack.Screen
          name="AltaTratamientos"
          component={AltaTratamiento}
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
          name="VerTodosLosTratamientos"
          component={VerTodosLosTratamientos}
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
  );
};

export default Navigation;
