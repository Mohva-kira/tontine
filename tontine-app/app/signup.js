import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Background from "./Background";
import { Field } from "../components";
import { useRegisterMutation } from "../reducers/api/authApi";
import { Provider } from "react-redux";
import SelectDropdown from 'react-native-select-dropdown'
import { store } from "./store";
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { Ionicons } from '@expo/vector-icons';


const SignupSchema = Yup.object().shape({
  number: Yup.string()
    .min(8, 'Saisissez un numero de téléphone correcte')
    .max(10, 'Saisissez un numero de téléphone correcte')
    .matches(/^[0-9]+$/, 'Seulement les chiffres sont autorisé')
    .required('Saisissez votre numéro de téléphone'),
  password: Yup.string()
    .required('Mot de passe requis')
    .min(8, 'Le mot de passe doit être 8 charactère au minimum')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Doit être au minimum 8 charactères, au moins un charactère en majuscule, un chiffre au minimum et un charactère spécial'),
  confirmPassword: Yup.string()
    .required('La confirmation de mot de passe est obligatoire !!')
    .oneOf([Yup.ref('password')], 'Votre mot de passe ne correspond pas')
    .min(8)


})

const Signup = () => {

  return (
    <Provider store={store}>
      <SignupWrapped />
    </Provider>
  )
}

const SignupWrapped = () => {
  const router = useRouter()

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading }] = useRegisterMutation();
  const [pays, setPays] = useState('')
  const [ind, setInd] = useState('')
  const [marginBt, setMarginBt] = useState(10)
  const [passwordVisible, setPasswordVisible] = useState(true)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true)
  const { height, width } = Dimensions.get('window');
  const countries = ["Côte d'Ivoire", "Senegal", "Mali"]
  const sendData = async () => {
    const randomMail = `${username}@gmail.com`

    try {
      await register({ username, email: email, password, phone_number: phone, pays, ind, activated: false })
        .unwrap()
        .then((payload) => {
          console.log('fulfilled', payload)
          router.push("/terms")

        },)
        .catch((error) => console.log('rejected', error))



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
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,

          headerTitle: " Inscrption ",
        }}
      />
      <ScrollView showVerticalScrollIndicator={false}>
        <Formik initialValues={{
          number: '',
          password: '',
          confirmPassword: ''
        }}
          validationSchema={SignupSchema}
        >

          {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
            <View
              style={{
                alignItems: "center",
                width: (width > height) ? height : width,
                height: (height < width) ? width : height
              }}
            >
              <Text
                style={{
                  color: COLORS.secondary,
                  fontSize: 64,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                Inscription
              </Text>

              <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}> Créer un compte </Text>
              <View
                style={{
                  backgroundColor: COLORS.lightWhite,
                  width: (width > height) ? height : width,
                  height: (height < width) ? width : height,
                  borderTopLeftRadius: 100,
                  paddingTop: 50,
                  alignItems: "center",

                  alignSelf: 'flex-start',
                  paddingBottom: marginBt
                }}
              >

                <SelectDropdown
                  defaultValueByIndex={0}
                  data={countries}
                  onSelect={(selectedItem, index) => {

                    setPays(selectedItem)

                    if (selectedItem === "côte d'ivoire") {
                      setInd('+225')
                    } else if (selectedItem === "Senegal") {
                      setInd('+221')
                    } else if (selectedItem === "Mali") {
                      setInd('+223')
                    }
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }}
                />

                <Field placeholder="email " onFocus={() => setMarginBt(400)} onBlur={() => { setFieldTouched('email'); setMarginBt(0) }} onChange={e => { handleChangeText(e, setEmail) }} onChangeText={handleChange('email')} value={values.email} />
                {touched.email && errors.email && (
                  <Text style={{ color: 'red', width: '70%' }}> {errors.email} </Text>
                )}


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
                <View style={{ width: '130%', alignItems: 'center', flexDirection: 'row', paddingLeft: 120 }}>

                  <Field placeholder="Conifrmer mot de passe"
                    onFocus={() => setMarginBt(400)}
                    onBlur={() => { setFieldTouched('confirmPassword'); setMarginBt(20) }}

                    onChange={e => { handleChangeText(e, () => { }) }}
                    onChangeText={handleChange('confirmPassword')}
                    secureTextEntry={confirmPasswordVisible}
                    value={values.confirmPassword} />

                  <TouchableOpacity style={{ position: 'absolute', right: 120 }} onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    {confirmPasswordVisible ? <Ionicons name="eye" size={24} color="black" /> : <Ionicons name="eye-off" size={24} color="black" />}
                  </TouchableOpacity>
                </View>


                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={{ color: 'red', width: '70%' }}> {errors.confirmPassword} </Text>
                )}
                {/* <View
              style={{ alignItems: "flex-end", width: "78%", paddingRight: 16, marginBottom: 200 }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Forgot Password ?
              </Text>
            </View> */}

                <TouchableOpacity style={{ backgroundColor: isValid ? '#FE7654' : '#fbb3a1', borderRadius: 100, alignItems: 'center', width: 250 }} onPress={sendData} disabled={!isValid} >
                  <Text style={{ color: COLORS.lightWhite, fontSize: 22, fontWeight: 'bold' }}>Suivant</Text>
                </TouchableOpacity>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>Vous avez un compte ? </Text>

                  <TouchableOpacity onPress={() => router.push('/login')} >
                    <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }} > Connexion </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Background>
  );
};

export default Signup;
