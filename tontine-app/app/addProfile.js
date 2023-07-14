import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,


} from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";

import { Field } from "../components";
import RadioGroup, { Radio } from "react-native-radio-input/Components/main";
import DatePicker from "react-native-datepicker-expo";
import { useAddProfileMutation } from "../reducers/api/profileApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-redux";
import { store } from "./store";
import ToastManager, { Toast } from 'toastify-react-native'
import SelectDropdown from 'react-native-select-dropdown'



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
  const [date, setDate] = useState(new Date('1989-01-01'));
  const [open, setOpen] = useState(false);
  const [pays, setPays] = useState("Côte d'Ivoire");
  const [ville, setVille] = useState('');
  const [email, setEmail] = useState('');

  const [addProfile, { isLoading }] = useAddProfileMutation()
  const [currentUser, setCurrentUser] = useState(null)


  const countries = ["Côte d'Ivoire", "Senegal", "Mali"]

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@TontineAdded', jsonValue)

    } catch (e) {
      // saving error
      console.log('error', e)
    }
  }


  const today = new Date('01/01/1900');

  changeDate = (date) => {
    setDate(date);

  };



  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
    
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

    var day = date.getDate();
    var month =  date.getMonth();
    var year =  date.getFullYear();
    var age = 18;
    var setDate = new Date(year + age, month - 1, day);
    var currdate = new Date();
   

    if (currdate >= setDate) {
      // you are above 18
    
      const data = { data: { nom, prenom, pays, ville, date_naissance: date, user: currentUser?.user.id } }
      storeData(data)
  
 
      try {
        await addProfile(data)
          .unwrap()
          .then(data => {  Toast.success('Profile enregistré!'); setTimeout(() => { router.push("/dashboard"); }, 3000) })
          .catch(e => console.log('error', e))
  
  
  
      } catch (error) {
  
      }
    } else {
       Toast.error('Vous avez moins de 18 ans')
       Toast.error('Il faut être majeure pour participer au tontine', 'center')
    }

   
  }

  useEffect(() => {
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
           <SelectDropdown
                  defaultValueByIndex={0}
                  data={countries}
                  onSelect={(selectedItem, index) => {
               
                    setPays(selectedItem)

                   
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
