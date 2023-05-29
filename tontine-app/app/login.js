import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Background from "./Background";
import { Field } from "../components";
import { useLoginMutation } from "../reducers/api/authApi";
import { Provider } from "react-redux";
import { store } from "./store";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

  return (
    <Provider store={store}> 
      <LoginWappred /> 
    </Provider>
  )
}

const LoginWappred = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPasssword] = useState('')
  const [login, isLoading] = useLoginMutation()

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
     
    } catch (e) {
      // saving error
      console.log('error', e)
    }
  }


  const sendData = async () => {
      try {
        console.log({identifier: username, password})

        await login({identifier: username, password})
          .unwrap()
          .then(data => {console.log('connected', data); router.push('/dashboard'); storeData(data) })
          .catch(error => console.log('rejected', error))

          
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <Background>
      <ScrollView showVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            width: 460,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 64,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            Login
          </Text>
          <View
            style={{
              backgroundColor: COLORS.white,
              height: 700,
              width: 460,
              borderTopLeftRadius: 100,
              paddingTop: 100,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 40,
                color: COLORS.primary,
                fontWeight: "bold",
              }}
            >
              {" "}
              Bienvenue{" "}
            </Text>

            <Text
              style={{
                color: COLORS.gray,
                fontSize: 19,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Connectez vous 
            </Text>
            <Field onChangeText={setUsername} placeholder="Nom d'utilisateur / Numero de télephone " />
            <Field onChangeText={setPasssword} placeholder="Mot de passe" secureTextEntry={true} />
            <View
              style={{ alignItems: "flex-end", width: "78%", paddingRight: 16, marginBottom: 200 }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Mot de passe oublié? ?
              </Text>
            </View>

            <TouchableOpacity style={{backgroundColor: '#FE7654', borderRadius: 100, alignItems: 'center', width: 250}} onPress={sendData} >
              <Text style={{color: COLORS.lightWhite, fontSize: 22, fontWeight: 'bold'}}>Connexion</Text>
            </TouchableOpacity>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>Pas de compte ? </Text>

                <TouchableOpacity onPress={() => router.push("/signup")}>
                  <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 16}} > S'inscrire </Text>
                </TouchableOpacity>

            </View>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default Login;
