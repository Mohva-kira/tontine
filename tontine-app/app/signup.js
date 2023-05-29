import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Background from "./Background";
import { Field } from "../components";
import { useRegisterMutation } from "../reducers/api/authApi";
import { Provider } from "react-redux";
import SelectDropdown from 'react-native-select-dropdown'
import { store } from "./store";
import { Formik, Form } from "formik"
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  number: Yup.number()
          .min(8, 'Minimum 10 chiffres')
          .max(10, 'Maximum 10 chiffres')
          .required('Saisissez votre numéro de téléphone'),
  password: Yup.string()
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

  const countries = ["Côte d'Ivoire", "Senegal", "Mali"]
  const sendData = async () => {
    const randomMail = `${username}@gmail.com`
    console.log(username, password, phone, randomMail, pays, ind)
    try {
      await register({ username, email: randomMail, password, phone_number: phone, pays, ind })
        .unwrap()
        .then((payload) => {
          console.log('fulfilled', payload)
          router.push("/terms")

        },)
        .catch((error) => console.log('rejected', error))

      console.log('done')

    } catch (error) {
      console.log(error)
    }
  }

    const handleChangeText = (text, func) => {
      setUsername(text)
      func

    }


  return (

    <Background>
      <ScrollView showVerticalScrollIndicator={false}>
        <Formik initialValues={{
          number: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={SignupSchema}
        >

          {({values,errors,touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
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
              Inscription
            </Text>

            <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}> Créer un compte </Text>
            <View
              style={{
                backgroundColor: COLORS.white,
                height: 700,
                width: 460,
                borderTopLeftRadius: 100,
                paddingTop: 50,
                alignItems: "center",
              }}
            >

              <SelectDropdown
                defaultValueByIndex={0}
                data={countries}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
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

              <Field placeholder="Numero de télephone / Username" onChangeText={ handleChange('number')} value={values.number} />
               {errors.number && (
                <Text> {errors.number} </Text>
               )}
              <Field placeholder="Mot de passe" onChangeText={setPassword} secureTextEntry={true} />
              <Field placeholder="Conifrmer mot de passe" secureTextEntry={true} />

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

              <TouchableOpacity style={{ backgroundColor: '#FE7654', borderRadius: 100, alignItems: 'center', width: 250 }} onPress={sendData} >
                <Text style={{ color: COLORS.lightWhite, fontSize: 22, fontWeight: 'bold' }}>Suivant</Text>
              </TouchableOpacity>

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Vous avez un compte ? </Text>

                <TouchableOpacity onPress={() => router.push('/terms')} >
                  <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }} > Connexion </Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
          ) }
        </Formik>
      </ScrollView>
    </Background>
  );
};

export default Signup;
