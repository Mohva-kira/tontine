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