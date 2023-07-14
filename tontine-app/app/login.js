import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Background from "./Background";
import { Field } from "../components";
import { useLoginMutation } from "../reducers/api/authApi";
import { Provider } from "react-redux";
import { store } from "./store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ToastManager, { Toast } from 'toastify-react-native'
import { Formik, Form } from "formik"
import * as Yup from 'yup'


const SignupSchema = Yup.object().shape({
  number: Yup.string()
    .min(8, 'Saisissez un numero de téléphone correcte')
    .max(10, 'Saisissez un numero de téléphone correcte' )
    .matches(/^[0-9]+$/, 'Seulement les chiffres sont autorisé')
    .required('Saisissez votre numéro de téléphone'),
  password: Yup.string()
    .required('Mot de passe requis')
    .min(8, 'Le mot de passe doit être 8 charactère au minimum')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Doit être au minimum 8 charactères, au moins un charactère en majuscule, un chiffre au minimum et un charactère spécial'),


})

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
  const [password, setPassword] = useState('')
  const [login, isLoading] = useLoginMutation()
  const [marginBt, setMarginBt] = useState(0)
  const [passwordVisible, setPasswordVisible] = useState(true)
  const {height, width} = Dimensions.get('window');

  const storeData = (value) => {
    try {
      const jsonValue = JSON.stringify(value)


    } catch (e) {
      // saving error
      console.log('error', e)
    }
  }


  const sendData = async () => {
    try {


      await login({ identifier: username, password })
        .unwrap()
        .then(data => {
          AsyncStorage.setItem('@user', JSON.stringify(data)); router.push('/dashboard');
          
        })
        .catch(error => {



          Toast.error('Numéro de telephone ou mot de passe incorrect')

     
        })


    } catch (error) {

      console.log(error)
    }
  }

  const handleChangeText = (event, func) => {
    const { name, type, text } = event.nativeEvent;

    func(text)
    // handleChange('number')

  }

  return (

    <Background>
      <SafeAreaView style={{ flex: 1 }}>
        <ToastManager/>
        <ScrollView showVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: "center",
              width: (width>height) ? height : width,
              height: (height<width) ? width : height

            }}
          >
            <Formik initialValues={{
          number: '',
          password: '',
          
        }}
          validationSchema={SignupSchema}
        >

{({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (

         
            <View
              style={{
                backgroundColor: COLORS.white,
                width: (width>height) ? height : width,
                height: 700,
                borderTopLeftRadius: 100,
                bottom: 0,
                position: 'absolute',
                alignItems: "center",


                alignSelf: 'flex-start',

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
              <Field placeholder="Numero de télephone " onFocus={() => setMarginBt(400)} onBlur={() => { setFieldTouched('number'); setMarginBt(0) }} onChange={e => { handleChangeText(e, setUsername) }} onChangeText={handleChange('number')} value={values.number} />

              {touched.number && errors.number && (
                  <Text style={{ color: 'red', width: '70%' }}> {errors.number} </Text>
                )}
              <View style={{ width: '130%', alignItems: 'center', flexDirection: 'row', paddingLeft: 120 }}>
              <Field placeholder="Mot de passe"
                    onFocus={() => setMarginBt(400)}
                    onBlur={() => {
                      setFieldTouched('password');
                      setMarginBt(20)
                    }}
                    onChange={e => { handleChangeText(e, setPassword) }}
                    onChangeText={handleChange('password')}
                    secureTextEntry={passwordVisible}
                    value={values.password} />

                <TouchableOpacity style={{ position: 'absolute', right: 120 }} onPress={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <Ionicons name="eye" size={24} color="black" /> : <Ionicons name="eye-off" size={24} color="black" />}
                </TouchableOpacity>

              </View>
              {touched.password && errors.password && (
                  <Text style={{ color: 'red', width: '70%' }}> {errors.password} </Text>
                )}
              <View
                style={{ alignItems: "flex-end", width: "78%", paddingRight: 16, marginBottom: 50 }}
              >

                <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Mot de passe oublié?
                  </Text>
                </TouchableOpacity>

              </View>

              <TouchableOpacity style={{ backgroundColor: isValid ? '#FE7654' : '#fbb3a1', borderRadius: 100, alignItems: 'center', width: 250 }} onPress={sendData} disabled={!isValid}  >
                <Text style={{ color: COLORS.lightWhite, fontSize: 22, fontWeight: 'bold' }}>Connexion</Text>
              </TouchableOpacity>

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Pas de compte ? </Text>

                <TouchableOpacity onPress={() => router.push("/signup")}>
                  <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }} > S'inscrire </Text>
                </TouchableOpacity>

                

              </View>
            </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>

  );
};

export default Login;
