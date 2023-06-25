import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import { HomeFooter } from "../components";
import Background from "./Background";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AccountList, TransactionsList } from "../screens";
import Sidebar from "../components/sidebar/Sidebar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";


const Home = () => {
  const router = useRouter();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
      console.log('getData', jsonValue)
      
        const user = JSON.parse(jsonValue) 
        const userToken = jwtDecode(user.jwt)
        const expirationTime = userToken.exp;

          // Vérifiez si le jeton est expiré
          if (new Date(expirationTime * 1000) > new Date()) {
            router.push('/dashboard');
          } else {
            setIsLoading(false);
          }
      return jsonValue
    } catch (e) {
      // error reading value
  
      console.log('error', e)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <Background>
      <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,

            headerTitle: " Bienvenue dans Ivoire Tontine ",
          }}
        />
        <View
          style={{
            padding: SIZES.medium,
            paddingBottom: 100,
            marginHorizontal: 60,
            marginVertical: 200,
          }}
        >
  
          <Image
            source={require("../assets/images/logo.png")}
            style={{
              width: 250,
              height: "100%",
              paddingBottom: 30,
              alignContent: "center",
              justifyContent: "center",
            }}
          />
          <Text style={{ color: "white", fontSize: 34 }}>Ivoire Tontine</Text>
        </View>
          
      </Background>
      <HomeFooter />

    </>
  );
};

export default Home;
