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
