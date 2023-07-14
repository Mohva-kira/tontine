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
import { useAddTontineMutation } from "../reducers/api/tontineApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-redux";
import { store } from "./store";
import ToastManager, { Toast } from 'toastify-react-native'



const addTontine = () => {
  
  return (
    <Provider store={store}> 
      <AddTontineWrapper /> 
    </Provider>
  )
}


const AddTontineWrapper = () => {

  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [people, setPeople] = useState(null);
  const [cotisation, setCotisation] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalAmountFees, setTotalAmountFees] = useState(null);
  const [logisticFee, setLogisticFee] = useState(null);
  const [adminFee, setAdminFee] = useState(5);
  const [periodicite, setPeriodicite] = useState(null)
  const [addTontine, {isLoading}] = useAddTontineMutation() 
  const [currentUser, setCurrentUser] = useState(null)
  const [accessCode, setAccessCode] = useState(null)


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
    let laDate = new Date(date);

    if (periodicite === "Hebdomadaire") {
      let weeksToMonth = Number(people) * 7 / 30

      setEndDate(new Date(laDate.setMonth(laDate.getMonth() + weeksToMonth)));
    } else {
      setEndDate(new Date(laDate.setMonth(laDate.getMonth() + Number(people))));

    }
  };

  changeCotisation = (amount) => {
    setCotisation(amount);
    setTotalAmount(Number(amount) * Number(people));
  };

  calculateFee = (fee) => {
    setLogisticFee(fee)
    setTotalAmountFees(totalAmount - (totalAmount / 100) * Number(fee) - (totalAmount / 100) * adminFee);
  };

  getChecked = (value) => {
    // value = our checked value
  
    setPeriodicite(value)
  }
  
  
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

  const makeAccessCode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    

    setAccessCode(result)
   
}

  const sendData = async () => {
   
    let status = 'En attente'
    const data = {data: {name, cotisation, periodicite, nb_people: people, date_debut: date, date_fin: endDate, amount_collect: totalAmount, owner: currentUser?.user.id, location: 'Abidjan', status, access_code: accessCode, nextDueDate: date, logistic_fees: logisticFee} }
    storeData(data)

  
    try {
        await addTontine(data)
          .unwrap()
          .then(data =>{   Toast.success('Tontine créer avec succès!'); setTimeout(() => {  router.push("/invite");  }, 3000)  })
          .catch(e => console.log('error', e))

          
          
    } catch (error) {
      
    }
  }

  useEffect(()  => {
    getData()
    makeAccessCode(8)
  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <ToastManager />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,

          headerTitle: " Créer une tontine ",
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
              Créer une tontine
            </Text>
            <Field
              placeholder="Tontine name"
              onChangeText={(name) => setName(name)}
            />
            <Field
              placeholder="Nombre de personne"
              onChangeText={(nb) => setPeople(nb)}
              keyboardType="numeric"
            />

            <Text style={{ paddingBottom: 10 }}> Périodicité </Text>

            <RadioGroup getChecked={getChecked} RadioGroupStyle={{ flexDirection: "row" }}>
              <Radio iconName={"lens"} label={"Hebdomadaire"} value={"Hebdomadaire"} />
              <Radio iconName={"lens"} label={"Mensuel"} value={"Mensuel"} />

            </RadioGroup>

            <Field
              placeholder="Cotisation mensuel"
              onChangeText={(amount) => { changeCotisation(amount); changeDate(date) }}

              keyboardType="numeric"
            />
            {/* <RadioGroup
              getChecked={this.getChecked}
              RadioGroupStyle={{ flexDirection: "row" }}
            >
              <Radio iconName={"lens"} label={"1 Bras"} value={"1"} />
              <Radio iconName={"lens"} label={"2 Bras"} value={"2"} />
            </RadioGroup> */}
            <Text style={{ paddingBottom: 10 }}> Date de début </Text>
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
            {endDate && (
              <>
                <Text> Date de fin </Text>
                <DatePicker
                  style={{ width: 300 }}
                  date={endDate}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate={endDate}
                  maxDate={endDate}
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
                />
              </>
            )}

            <Field
              placeholder="Frais logistique, en pourcentage"
              keyboardType="numeric"
              onChangeText={(fee) => calculateFee(fee)}
            />
            {/* <Field placeholder="Date de debut" type="date" />
            <Field placeholder="Date de fin" type="date" /> */}

            {totalAmount && (
              <>
                <Text style={{ fontSize: 18, color: COLORS.gray }} >Montant à encaisser par les participants</Text>
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: COLORS.secondary }}>{totalAmountFees ? totalAmountFees.toLocaleString('en') + " FCFA" : totalAmount.toLocaleString('en') + " FCFA"}</Text>
              </>
            )}

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
                Créer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default addTontine;
