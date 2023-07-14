import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useState, useEffect } from "react";
import styles from "../components/home/nearby/nearbyjobs.style";

import { COLORS, SIZES } from "../constants";
import NearbyJobCard from "../components/common/cards/nearby/NearbyJobCard";
import { useGetPaymentQuery } from "../reducers/api/paymentApi";
import { store } from "./store";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const transactionsList = () => {
  return (
    <Provider store={store}> 
      <TransactionsListWrapper /> 
    </Provider>
  )
}

const TransactionsListWrapper = () => {
  const router = useRouter();
  const {data, isLoading, isFetching, isSuccess, isError} = useGetPaymentQuery()
  const [currentUser, setCurrentUser] = useState(null)

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
      if (jsonValue){
        setCurrentUser(JSON.parse(jsonValue))
      }
    } catch(e) {
      // error reading value

      console.log('error', e)
    }
  }

  
  
  
   useEffect(()=> {
    getData()
   }, [])

  // const transactionData = {
  //   data: [
  //     {
  //       id: "123456",
  //       month: "Mars",
  //       date: "31-2022",
  //       amount: "1000000",
  //       tontine_name: "En famille",
  //       type: "prelevement",
  //       payed: true,
  //     },
  //     {
  //       id: "123457",
  //       month: "Juin",
  //       date: "25-2022",
  //       amount: "200000",
  //       tontine_name: "Yopougon Millionnaire",
  //       type: "prelevement",
  //       payed: true,
  //     },
  //     {
  //       id: "123458",
  //       month: "Janvier",
  //       date: "15-2023",
  //       amount: "50000",
  //       tontine_name: "Ma voiture",
  //       type: "prelevement",
  //       payed: true,
  //     },
  //     {
  //       id: "123459",
  //       month: "Fevrier",
  //       date: "05-2023",
  //       amount: "125000",
  //       tontine_name: "Ma tontine",
  //       type: "prelevement",
  //       payed: true,
  //     },
  //     {
  //       id: "123480",
  //       month: "Aout",
  //       date: "22-2022",
  //       amount: "350000",
  //       tontine_name: "La famille",
  //       type: "retrait",
  //       payed: true,
  //     },
  //     {
  //       id: "123481",
  //       month: "Septembre",
  //       date: "09-2022",
  //       amount: "60000",
  //       tontine_name: "Balimaya",
  //       type: "prelevement",
  //       payed: true,
  //     },
  //     {
  //       id: "123486",
  //       month: "Decembre",
  //       date: "15-2022",
  //       amount: "2000000",
  //       tontine_name: "Yopougon Millionnaire",
  //       type: "retrait",
  //       payed: true,
  //     },
  //     {
  //       id: "123483",
  //       month: "Aout",
  //       date: "22-2022",
  //       amount: "350000",
  //       tontine_name: "La famille",
  //       type: "prelevement",
  //       payed: true,
  //     },
  //   ],
  // };
  // const isLoading = false;
  // const error = null;

 const myTransactions = data?.data.filter(tran => tran.attributes.user.data.id === currentUser?.user.id)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,

          headerTitle: " Mes transactions",
        }}
      />
      <ScrollView showVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Transactions</Text>
            </View>

            <View style={styles.cardsContainer}>
              <Text>Historiques</Text>
              {isLoading ? (
                <ActivityIndicator size="large" colors={COLORS.primary} />
              ) : isError ? (
                <Text> Something went wrong </Text>
              ) : myTransactions?.length === 0 ? (
                <>
                <Text> Vous n'avez pas encore effectué de transaction</Text>
                </>
              ) : (
                myTransactions?.map((transac) => (
                  <NearbyJobCard
                    transac={transac}
                    key={`nearby-job-${transac?.id}`}
                    handleNavigate={() =>
                      router.push(`/#`)
                    }
                  />
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default transactionsList;
