import React from 'react'
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView
  
} from "react-native";
import { useRouter, Stack } from "expo-router";

import styles from "../components/home/popular/populartontine.style";
import { COLORS, SIZES } from "../constants";
import PopularTontineCard from "../components/common/cards/popular/PopularTontineCard";
import TontineCard from '../components/common/cards/tontine/TontineCard';
import { useGetTontineQuery } from '../reducers/api/tontineApi';
import { store } from './store';
import { Provider } from 'react-redux';


const tontineList = () => {
  
  return (
    <Provider store={store}> 
      <TontineListWrapper /> 
    </Provider>
  )
}


const TontineListWrapper = () => {

    const router = useRouter();
    const [selectedTontine, setSelectedTontine] = useState();
    // const stateData = useSelector(state=> state.Tontines)
  
    const { data, isLoading, error, refetch } = useGetTontineQuery();
  
    // const isLoading = false;
    // const error = null;
  
    const accountData = {
      data: [
     
        {
          id: "41254455",
          title: "Versement Périodique",
          payment_done: "40000",
          payment_pending: "200000",
          date_debut : "25-03-2023",
          date_fin : "25-03-2024",
          tontine_name : "Familiale",
          bras: "1",
          nb_people: "10",
          cotisation: "20000",
          periodicite: "5",
          logistic_fees: "5",
          admin_fees: "5"
  
        },
        {
          id: "41254458",
          title: "Versement Périodique",
          payment_done: "25000",
          payment_pending: "150000",
          date_debut: "20-03-2023",
          date_fin: "20-05-2024",
          tontine_name : "Familiale",
          bras: "1",
          nb_people: "15",
          cotisation: "10000",
          periodicite: "4",
          logistic_fees: "6",
          admin_fees: "5"
          
  
        },
        {
          id: "41254459",
          title: "Versement Périodique",
          payment_done: "100000",
          payment_pending: "1500000",
          date_debut : "10-04-2023",
          date_fin : "10-04-2024",
          tontine_name : "L'entre aide",
          bras: "1",
          nb_people: "15",
          cotisation: "50000",
          periodicite: "6",
          logistic_fees: "3",
          admin_fees: "5"
  
        },
        {
          id: "41254460",
          title: "Versement Périodique",
          payment_done: "150000",
          payment_pending: "220000",
          date_debut : "25-03-2023",
          date_fin : "25-03-2024",
          tontine_name : "Familiale",
          bras: "1",
          nb_people: "10",
          cotisation: "20000",
          periodicite: "8",
          logistic_fees: "5",
          admin_fees: "5"
  
        },
        {
          id: "41254461",
          payment_done: "150000",
          payment_pending: "220000",
          date_debut : "25-03-2023",
          date_fin : "25-03-2024",
          tontine_name : "Tous pour 1",
          bras: "2",
          nb_people: "10",
          cotisation: "40000",
          periodicite: "2",
          logistic_fees: "8",
          admin_fees: "5"
  
  
        },
        
      ],
    };

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {console.log(data)}
      <ScrollView showVerticalScrollIndicator={false}>
      <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            
            headerTitle: "Toute les Tontines ",
          }}
        />
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Liste de tontines</Text>
              
            </View> 
            <View style={styles.cardsContainer}>
            <Text >Tontines disponible</Text>
              {isLoading ? (
                <ActivityIndicator size="large" colors={COLORS.primary} />
              ) : error ? (
                <Text> {JSON.stringify(error)} Something went wrong </Text>
              ) : (
                data.data.map((item, index) => (
                  <TontineCard
                    tontine={item}
                    handleCardPress={() =>
                      router.push(`/tontine-details/${item.id}`)
                    }
                    key={index}
                  />
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default tontineList