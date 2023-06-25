import React from "react";
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
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";

import { store } from "../store";
import { Provider } from "react-redux";
import {WelcomeCard} from "../../components";
import { useGetSingleProfileQuery } from "../../reducers/api/profileApi";
const tabs = [ "Informations", "Historiques"];

const ProfileDetailWrapper = () => {
  return (
    <Provider store={store}>
      <ProfileDetails />
    </Provider>
  );
};

const ProfileDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const {data, isLoading, IsFetching, isError} = useGetSingleProfileQuery(params.id)
  const [activeTab, setActiveTab] = useState(tabs[0]);
  // const isLoading = false;
  // const error = null;

  // const accountData = {
  //   data: [
  //     {
  //       id: "41254455",
  //       firstname: "Patrick",
  //       lastname: "Kouakou",
  //       age: "35",
  //       location : "Rivera",
  //       tontines : [1,2,3,4],
  //       tontine_name : "Familiale",
  //       bras: "1",
  //       nb_people: "10",
  //       cotisation: "20000",
  //       periodicite: "5",
  //       highlights: {
  //         Qualifications: ["35 ans", "Employé par orange", "Ingénieur en informatique", "0 Mauvaise Note"],
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
  // console.log("details !:", accountData.data);

  const [refreshing, setResfreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setResfreshing(true);
    refetch();
    setResfreshing(false);
  });

  const displayTabContent = () => {
    switch (activeTab) {
      case "Informations":
        return (
          <Specifics
            title="Mes infos"
            points={data.data ?? ["N/A"]}
          />
        );
      case "A propos":
        return (
          <JobAbout info={data.data[0]?.highlights?.Description ?? "No data provided"} />
        );
      case "Historiques":
        return (
          <Specifics
            title="Mes transactions"
            points={data.data[0]?.highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {console.log('data profile', data)}
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
          ) : isError ? (
            <Text> Something went wrong</Text>
          ) : data?.data.length === 0 ? (
            <Text> No data </Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              {/* <Company
                companyLogo={accountData.data[1]?.employer_logo}
                jobTitle={accountData.data[0]?.tontine_name}
                companyName={accountData.data[1]?.date_debut}
                cotisation={accountData.data[1]?.cotisation}
              /> */}
              <WelcomeCard profile={data.data} />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        {/* <JobFooter url={accountData?.data[0].job_google_link ?? 'https://careers.google.com/jobs/results'} /> */}
      </>

      
    </SafeAreaView>
  );
};

export default ProfileDetailWrapper;
