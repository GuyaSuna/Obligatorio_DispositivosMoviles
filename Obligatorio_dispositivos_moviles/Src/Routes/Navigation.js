import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from '../Componentes/Menu';
import PaginaPrincipal from '../Screen/PaginaPrincipal'

import { Button , Icon} from 'react-native';
import User from '../Screen/Usuarios/User';
import Insumos from '../Screen/Insumos/Insumos';
import Observaciones from '../Screen/Observaciones/Observaciones'
import Tratamientos from '../Screen/Tratamientos/Tratamientos'
import Zonas from '../Screen/Zonas/Zonas';



const Stack = createStackNavigator();

const screenOptions = {
    headerStyle: {
        backgroundColor: "#f4511e",
      },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontWeight: "bold",
    }
}

const Navigation = () => {
  return (
    <NavigationContainer>
            <Stack.Navigator >  
                
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
          component={Insumos}
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
          name="Zonas"
          component={Zonas}
          options={{
            title: "Zonas",
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

export default Navigation
