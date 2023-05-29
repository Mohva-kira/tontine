import { View, ScrollView, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRootNavigation, useRouter } from "expo-router";
import Sidebar from "../components/sidebar/Sidebar";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  PopularTontines,
  ScreenHeaderBtn,
  Welcome,
  WelcomeCard,
  SidebarProfile
} from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store } from "./store";
import { Provider } from "react-redux";
import {ProtectedRoute} from "../components";
import { useGetProfilesQuery } from "../reducers/api/profileApi";
import { useRootNavigationState } from "expo-router";


const Dashboard = () => {
  
  return (
    <Provider store={store}> 
      <DashboardWrapper /> 
    </Provider>
  )
}


const DashboardWrapper = (props) => {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [profile, setProfile] = useState(null)

  const {data: profiles, isLoading, isSuccess, isError, isFetching} = useGetProfilesQuery()


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

   const checkProfile = async () => {

    try {
      let myProfile = profiles?.data.find(pr => pr?.attributes?.user?.data?.id === currentUser?.user?.id)
    console.log('my profile', myProfile)

    if(!myProfile)  router.push("addProfile")

    setProfile(myProfile)

    } catch (error) {
      console.log('error', error)
    }
    


   }
   
   useEffect(()=> {

    checkProfile()
   }, [])

  return (
 
    <ProtectedRoute> 
        {console.log('yo profiles',profile ) }
   
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.menu}
                dimension="60%"
                handlePress={() => {setIsOpen(true), setProfileIsOpen(false) } }
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn 
               iconUrl={images.profile}
               dimension="60%" 
               handlePress={() => {setIsOpen(false), setProfileIsOpen(true) } }
               />
            ),

            headerTitle: "",
          }}
        />
          {console.log('current user', currentUser)}
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <SidebarProfile isOpen={profileIsOpen} setIsOpen={setProfileIsOpen} />

        <ScrollView showVerticalScrollIndicator={false}>
        
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
            }}
          >
            {/* <Welcome
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={()=> {
                if(searchTerm) {
                  console.log()
                  router.push(`/search/${searchTerm}`)
                }
              }}             
             /> */}

            <WelcomeCard profile={profile} />

            <PopularTontines />
            <Nearbyjobs />
          </View>
        </ScrollView>
      </SafeAreaView>
   
    </ProtectedRoute>
  );
};

export default Dashboard;
