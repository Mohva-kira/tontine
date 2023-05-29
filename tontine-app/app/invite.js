import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Platform,
  Share

} from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Background from "./Background";
import { Field } from "../components";
import { ProtectedRoute } from "../components";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const invite = () => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Vous êtes invté à participer à la tontine ${currentTontine?.data?.name}. Le code d'invitation est: ${currentTontine?.data?.access_code}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('result', result)
          router.push('/dashboard')
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])
  const [contacts, setContacts] = useState([])
  const [currentTontine, setCurrentTontine] = useState(null)

  const onChange = () => {
    return (val) => setSelectedTeam(val)
  }

  const onMultiChange = () => {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@TontineAdded')
      console.log('getData', jsonValue)
      if (jsonValue) {
        setCurrentTontine(JSON.parse(jsonValue))
      }
      return jsonValue
    } catch (e) {
      // error reading value

      console.log('error', e)
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({});

        if (data.length > 0) {
         
          const contact = data[0];
          console.log('contact', contact);
          
          let contactMade = []

          // Limitation du nombre de contacts a 30 pour eviter les bugs 
          for (i=0;  i <= 30; i++) {

            let singleData = {id: data[i].id, item: data[i].name, number: data[i].number}
            contactMade.push(singleData)
            setContacts(oldArr => [...oldArr, singleData])
             
          }
          
        }
      }
    })();
    getData()
  }, [])

  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1 }}>
        {console.log(currentTontine)}
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,

            headerTitle: " Invitez les membres ",
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
                padding: 20
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
                Inviter les membres a la tontine
              </Text>

                  <Text style={{ fontSize: 20, paddingBottom: 10 }}> Le code d'invitation de la tontine </Text>
                   
                   <View style={{ backgroundColor:  COLORS.gray, width:320, height:50, marginBottom: 20, alignItems: "center", alignContent: 'center', alignSelf:'center'}}>
                    <Text style={{ fontSize: 20, paddingBottom: 10,  }}> {currentTontine?.data?.access_code} </Text>
                    
                  </View>

                  <View>

                  <TouchableOpacity
                style={{
                  backgroundColor: "#FE7654",
                  borderRadius: 100,
                  alignItems: "center",
                  flexDirection: 'column',
                  width: 250,
                }}
                onPress={() => onShare()}
              >
                <Ionicons name="share-social-outline" size={24} color="white" />
                <Text
                  style={{
                    color: COLORS.lightWhite,
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  Partager
                </Text>
              </TouchableOpacity>
                  </View>

                 



              <View style={{ height: 40 }} />
              <Text style={{ fontSize: 20, paddingBottom: 10 }}>Selectionnez les membres</Text>
              <SelectBox
                label="Select multiple"
                options={contacts}
                selectedValues={selectedTeams}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
              />

              <TouchableOpacity
                style={{
                  backgroundColor: "#FE7654",
                  borderRadius: 100,
                  alignItems: "center",
                  width: 250,
                }}
                onPress={() => alert('invitation envoyer')}
              >
                <Text
                  style={{
                    color: COLORS.lightWhite,
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  Inviter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  )
}

export default invite