import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Splash({navigation}){

    useEffect(()=>{

        const time = setTimeout(()=>{

            navigation.replace("Login")

        },3000)

        return ()=>clearTimeout(time);
    },[])
    

    return(
        <View style={style.colorback}>

            <Image source={require('../assets/logo.png')} style={style.imglogo}/>

        </View>

    )
} 

const style = StyleSheet.create({
    colorback: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'#F8F9FA',
    },

    imglogo: {
        height: 350,
        width: 350, 
    }
})


