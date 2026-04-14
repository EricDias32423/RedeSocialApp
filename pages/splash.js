import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({ navigation }) {

    useEffect(() => {
        const checkTokenAndNavigate = async () => {
            try {
                // Verificar se existe token salvo
                const token = await AsyncStorage.getItem('@auth_token');
                const userData = await AsyncStorage.getItem('@user');
                
                // Aguardar 2 segundos para mostrar a splash (opcional)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Redirecionar com base no token
                if (token && userData) {
                    // Token existe, vai para Home
                    navigation.replace("Home");
                } else {
                    // Token não existe, vai para Login
                    navigation.replace("Login");
                }
            } catch (error) {
                console.log("Erro ao verificar token:", error);
                // Em caso de erro, vai para Login
                navigation.replace("Login");
            }
        };

        checkTokenAndNavigate();
    }, []);

    return (
        <View style={style.colorback}>
            <Image source={require('../assets/logo.png')} style={style.imglogo} />
        </View>
    );
}

const style = StyleSheet.create({
    colorback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F8F9FA',
    },
    imglogo: {
        height: 350,
        width: 350,
    }
});