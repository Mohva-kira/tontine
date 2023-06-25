import { View, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
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
import { Provider, useSelector } from "react-redux";
import { ProtectedRoute } from "../components";
import { useGetProfilesQuery } from "../reducers/api/profileApi";
import { useGetSingleProfileQuery } from "../reducers/api/profileApi";
import { useRootNavigationState } from "expo-router";
import { useIsFocused } from '@react-navigation/native';



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
  const isFocused = useIsFocused();
  const user = useSelector((state)  => state.user)
  const { data: profiles, isLoading, isSuccess, isError, isFetching, refetch } = useGetProfilesQuery(user?.user?.user.id || currentUser?.user.id, { refetchOnMountOrArgChange: true })


 
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

  const checkProfile =  () => {
  
     getData()
   
      if( !user && !currentUser  &&  profiles?.data.length === 0){
          console.log('le profile', profiles)
        router.push("/addProfile") 

    }
  
  }

  isLoading && <ActivityIndicator />

  //  if (isFocused) {
  //   refetch()
  //  }


  useEffect(() => {
    
    checkProfile()   
  
  }, [profiles])

  useEffect(() => { 

    getData()
    refetch()
    // setTimeout(() => checkProfile(), 3000)
       
 

  }, [isFocused, isSuccess])


  return (

    <ProtectedRoute>
      {console.log('yo profiles', profiles)}

      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.menu}
                dimension="60%"
                handlePress={() => { setIsOpen(true), setProfileIsOpen(false)}}
              />
            ),
            headerRight: () => (
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10}}>
              <ScreenHeaderBtn
                iconUrl={images.notif}
                dimension="60%"
                handlePress={() => { setIsOpen(false), setProfileIsOpen(false) , router.push('/notifications') }}
              />
               <ScreenHeaderBtn
                iconUrl={images.profile}
                dimension="60%"
                handlePress={() => { setIsOpen(false), setProfileIsOpen(true) }}
              />
              </View>
            ),

            headerTitle: "",
          }}
        />
        {console.log('current user', currentUser)}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <SidebarProfile profile={profiles?.data[0]} setProfile={setProfile} setCurrentUser={setCurrentUser} isOpen={profileIsOpen} setIsOpen={setProfileIsOpen} />

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

            <WelcomeCard profile={profiles?.data[0]} />

            <PopularTontines currentUser={user?.user || currentUser} />
            <Nearbyjobs currentUser={user?.user || currentUser} />
          </View>
        </ScrollView>
      </SafeAreaView>

    </ProtectedRoute>
  );
};

export default Dashboard;
