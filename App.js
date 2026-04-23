// App.js
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import CadastroScreen from './pages/CadastroScreen';
import Home from './pages/Home';
import splash from './pages/splash';
import cep from './pages/cep';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="splash"
        screenOptions={{
          headerShown: false, // Esconde o header em todas as telas
        }}
      >
        <Stack.Screen name="splash" component={splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="cep" component={cep} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}