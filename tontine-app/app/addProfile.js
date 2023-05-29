import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Platform,
  
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Background from "./Background";
import { Field } from "../components";
import RadioGroup, { Radio } from "react-native-radio-input/Components/main";
import DatePicker from "react-native-datepicker-expo";
import { useAddProfileMutation } from "../reducers/api/profileApi"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-redux";
import { store } from "./store";
import ToastManager, { Toast } from 'toastify-react-native'



const addProfile = () => {
  
  return (
    <Provider store={store}> 
      <AddProfileWrapper /> 
    </Provider>
  )
}


const AddProfileWrapper = () => {

  const router = useRouter();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [pays, setPays] = useState("");
  const [ville, setVille] = useState('');
  const [email, setEmail] = useState('');

  const [addProfile, {isLoading}] = useAddProfileMutation() 
  const [currentUser, setCurrentUser] = useState(null)



  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@TontineAdded', jsonValue)
     
    } catch (e) {
      // saving error
      console.log('error', e)
    }
  }


  const today = new Date();

  changeDate = (date) => {
    setDate(date);
    
  };

 
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
      console.log('getData', jsonValue)
      if (jsonValue) {
        setCurrentUser(JSON.parse(jsonValue)) 
      }
      return jsonValue
    } catch (e) {
      // error reading value
  
      console.log('error', e)
    }
  }



  const sendData = async () => {
   
    const data = {data: {nom, prenom, pays, ville, date_naissance: date, email, user: currentUser?.user.id} }
    storeData(data)

    console.log('data to send',data)
    try {
        await addProfile(data)
          .unwrap()
          .then(data =>{ console.log('added', data);  Toast.success('Profile enregistré!'); setTimeout(() => {  router.push("/dashboard");  }, 3000)  })
          .catch(e => console.log('error', e))

          
          
    } catch (error) {
      
    }
  }

  useEffect(()  => {
    getData()

  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <ToastManager />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,

          headerTitle: " Ajouter profile",
        }}
      />
      <ScrollView showVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,

              width: 420,
              borderTopLeftRadius: 100,
              paddingTop: 50,
              alignItems: "center",
            }}
          >


            <Text
              style={{
                color: COLORS.gray2,
                fontSize: 34,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              Profile
            </Text>
            <Field
              placeholder="Nom"
              onChangeText={(name) => setNom(name)}
            />
            <Field
              placeholder="Prenom"
              onChangeText={(text) => setPrenom(text)}
             
            />
             <Field
              placeholder="Pays"
              onChangeText={(text) => setPays(text)}
             
            />
             <Field
              placeholder="Ville"
              onChangeText={(text) => setVille(text)}
             
            />

            <Text style={{ paddingBottom: 10 }}> Date de naissance </Text>
            <DatePicker
              style={{ width: 300 }}
              date={date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate={today}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => changeDate(date)}
            />
           

            <Field
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
          
         

            <TouchableOpacity
              style={{
                backgroundColor: "#FE7654",
                borderRadius: 100,
                alignItems: "center",
                width: 250,
              }}
              onPress={sendData}
            >
              <Text
                style={{
                  color: COLORS.lightWhite,
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Enregistrer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default addProfile;
