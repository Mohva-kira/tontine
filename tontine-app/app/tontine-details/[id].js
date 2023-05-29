import React, { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
  Payment
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import { useGetJobByNameQuery } from "../../reducers/api/jobApi";
import { store } from "../store";
import { Provider } from "react-redux";
import { useGetTontineDetailsQuery } from "../../reducers/api/tontineApi";
import { useAddHandsMutation } from "../../reducers/api/handsApi";
import { useUpdateTontineMutation } from "../../reducers/api/tontineApi";
import { useAddPaymentMutation } from "../../reducers/api/paymentApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from 'toastify-react-native'



const tabs = ["Apropos", "Qualifications", "Responsibilities"];

const JobDetailsWrapper = () => {
  return (
    <Provider store={store}>
      <JobDetails />
    </Provider>
  );
};

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { data, isLoading, error, isFetching, isSuccess, refetch } = useGetTontineDetailsQuery(params?.id)

  const [addHands] = useAddHandsMutation()
  const [updateTontine] = useUpdateTontineMutation()
  const [addPayment] = useAddPaymentMutation()
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentUser, setCurrentUser] = useState(null)

  const today = new Date()
  const nextDueDate = data?.data.attributes.nextDueDate ?  new Date(data?.data.attributes.nextDueDate) : undefined


  // const accountData = {
  //   data: [
  //     {
  //       id: "41254454",
  //       title: "Compte Courant",
  //       solde: "259400",
  //       type: "account",
  //     },
  //     {
  //       id: "41254455",
  //       title: "Versement Périodique",
  //       payment_done: "40000",
  //       payment_pending: "200000",
  //       date_debut : "25-03-2023",
  //       date_fin : "25-03-2024",
  //       tontine_name : "Familiale",
  //       bras: "1",
  //       nb_people: "10",
  //       cotisation: "20000",
  //       periodicite: "5",
  //       highlights: {
  //         Qualifications: ["Avoir un revenue mensuel minimum", "Agé entre 25 et 55 ans", "Avoir au moins 3 etoiles", "Ne pas avoir de tontine en impayé"],
  //         Responsibilities: ["Toutes personnes inscrite dans cette tontine est tenu de payer la cotisation dans les délai",  "Tout impayé sera punis d'une mauvaise note", "Participer à cette tontine vous engage à payer la cotisation"],
  //         Description: " Tontine familliale en d'autre terme le balimaya, une tontine classique."
  //       }
  //     },
  //     {
  //       id: "41254458",
  //       title: "Versement Périodique",
  //       payment_done: "25000",
  //       payment_pending: "150000",
  //       date_debut: "20-03-2023",
  //       date_fin: "20-05-2024",
  //       tontine_name : "Familiale",
  //       bras: "1",
  //       nb_people: "15",
  //       cotisation: "10000",
  //       periodicite: "4",
  //       highlights: {
  //         Qualifications: { title: "mm", points: [1,2,3] },
  //         Responsibilities: "Toutes personnes inscrite dans cette tontine est tenu de payer la cotisation dans les délai sous peine de se voir sanctoinner d'une mauvaise note.",
  //         Description: " Tontine familliale en d'autre terme le balimaya, une tontine classique."
  //       }

  //     },
  //     {
  //       id: "41254459",
  //       title: "Versement Périodique",
  //       payment_done: "100000",
  //       payment_pending: "1500000",
  //       date_debut : "10-04-2023",
  //       date_fin : "10-04-2024",
  //       tontine_name : "L'entre aide",
  //       bras: "1",
  //       nb_people: "15",
  //       cotisation: "50000",
  //       periodicite: "6",
  //       highlights: {
  //         Qualifications: { title: "mm", points: [1,2,3] },
  //         Responsibilities: "Toutes personnes inscrite dans cette tontine est tenu de payer la cotisation dans les délai sous peine de se voir sanctoinner d'une mauvaise note.",
  //         Description: " Tontine familliale en d'autre terme le balimaya, une tontine classique."
  //       }
  //     },
  //     {
  //       id: "41254460",
  //       title: "Versement Périodique",
  //       payment_done: "150000",
  //       payment_pending: "220000",
  //       date_debut : "25-03-2023",
  //       date_fin : "25-03-2024",
  //       tontine_name : "Familiale",
  //       bras: "1",
  //       nb_people: "10",
  //       cotisation: "20000",
  //       periodicite: "8",
  //       highlights: {
  //         Qualifications: { title: "mm", points: [1,2,3] },
  //         Responsibilities: "Toutes personnes inscrite dans cette tontine est tenu de payer la cotisation dans les délai sous peine de se voir sanctoinner d'une mauvaise note.",
  //         Description: " Tontine familliale en d'autre terme le balimaya, une tontine classique."
  //       }
  //     },
  //     {
  //       id: "41254461",
  //       payment_done: "150000",
  //       payment_pending: "220000",
  //       date_debut : "25-03-2023",
  //       date_fin : "25-03-2024",
  //       tontine_name : "Tous pour 1",
  //       bras: "2",
  //       nb_people: "10",
  //       cotisation: "40000",
  //       periodicite: "2",
  //       highlights: {
  //         Qualifications: { title: "mm", points: [1,2,3] },
  //         Responsibilities: "Toutes personnes inscrite dans cette tontine est tenu de payer la cotisation dans les délai sous peine de se voir sanctoinner d'une mauvaise note.",
  //         Description: " Tontine familliale en d'autre terme le balimaya, une tontine classique."
  //       }

  //     },


  //   ],
  // };
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



  const [refreshing, setResfreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setResfreshing(true);
    refetch();
    setResfreshing(false);
  });

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data.data[1]?.highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "Apropos":
        return (
          <JobAbout info={data?.data?.attributes ?? "Aucune donnée fournis"} />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilités"
            points={data.data[1]?.highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };
  const checkDueDate = async () => {
    console.log('data data', nextDueDate)
    if (new Date(data?.data.attributes.nextDueDate) < today) {

      const lastDueDate = nextDueDate
      const dataToSend = { data: { id: data?.data.id, lastDueDate : new Date(lastDueDate), nextDueDate: nextDueDate ? data?.data.attributes.periodicite === 'Hebdomadaire' ? nextDueDate.setDate(nextDueDate.getDate() + 7) : nextDueDate.setMonth(nextDueDate.getMonth() + 1) : new Date(data.data.attributes.date_debut) } }
      await updateTontine(dataToSend)
        .unwrap()
        .then(() => console.log('tontine echanche mise a jour'))
        .catch((e) => console.log('error', e))
      alert('date depasser')
      console.log('data', dataToSend)
    }
  }

  useEffect(() => {
    console.log('due date', data?.data.attributes.nextDueDate)


    getData()
    refetch()


  }, [])

  useEffect(() => {

    checkDueDate()


  }, [data])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ToastManager />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),

          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          RefreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text> Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text> No data </Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data.data[1]?.employer_logo}
                name={data?.data?.attributes.name}
                date={data?.data?.attributes.date_debut}
                cotisation={data?.data?.attributes.cotisation}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        {data?.data?.attributes.members.data.find(user => user.id === currentUser?.user.id) ?
          <Payment tontine={data} user={currentUser}  functionPay={addPayment} />
          :
          <JobFooter tontine={data} user={currentUser} updateFunction={updateTontine} handsFunction={addHands} refetch={refetch} members={data?.data.attributes.members.data} />
        }

      </>


    </SafeAreaView>
  );
};

export default JobDetailsWrapper;
