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
import { COLORS, SIZES, icons, images, } from "../constants";
import { useGetTontineQuery } from "../reducers/api/tontineApi";
import { useGetPaymentQuery } from "../reducers/api/paymentApi";
import { useGetHandsQuery } from "../reducers/api/handsApi";
import { AccountCard, ScreenHeaderBtn, SidebarProfile } from "../components";
import Sidebar from "../components/sidebar/Sidebar";

// import { useGetTontineByNameQuery } from "../../../reducers/api/TontineApi";
import { useSelector } from "react-redux";
import { store } from './store';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';



const accountList = () => {

  return (
    <Provider store={store}>
      <AccountListWrapper />
    </Provider>
  )
}
const AccountListWrapper = () => {
  const router = useRouter();
  const [selectedTontine, setSelectedTontine] = useState();
  const { data: hands } = useGetHandsQuery()
  const { data: tontines, isLoading, isError, refetch } = useGetTontineQuery()
  const { data: payments } = useGetPaymentQuery()
  const [currentUser, setCurrentUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [profileIsOpen, setProfileIsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
   
      if (jsonValue) {
        setCurrentUser(JSON.parse(jsonValue))
      }
      return jsonValue
    } catch (e) {
      // error reading value

     
    }
  }
  // const stateData = useSelector(state=> state.Tontines)

  // const { data, isLoading, error, refetch } = useGetTontineByNameQuery({search: "search", query: {
  //   query: "React developer",
  //   num_pages: 1,
  // }});

  // const isLoading = false;
  // const error = null;

  const accountData = {
    data: [

      {
        id: "41254455",
        title: "Versement Périodique",
        payment_done: "40000",
        payment_pending: "200000",
        date_debut: "25-03-2023",
        date_fin: "25-03-2024",
        tontine_name: "Familiale",
        bras: "1",
        nb_people: "10",
        cotisation: "20000",
        periodicite: "5",

      },
      {
        id: "41254458",
        title: "Versement Périodique",
        payment_done: "25000",
        payment_pending: "150000",
        date_debut: "20-03-2023",
        date_fin: "20-05-2024",
        tontine_name: "Familiale",
        bras: "1",
        nb_people: "15",
        cotisation: "10000",
        periodicite: "4",


      },
      {
        id: "41254459",
        title: "Versement Périodique",
        payment_done: "100000",
        payment_pending: "1500000",
        date_debut: "10-04-2023",
        date_fin: "10-04-2024",
        tontine_name: "L'entre aide",
        bras: "1",
        nb_people: "15",
        cotisation: "50000",
        periodicite: "6",

      },
      {
        id: "41254460",
        title: "Versement Périodique",
        payment_done: "150000",
        payment_pending: "220000",
        date_debut: "25-03-2023",
        date_fin: "25-03-2024",
        tontine_name: "Familiale",
        bras: "1",
        nb_people: "10",
        cotisation: "20000",
        periodicite: "8",

      },
      {
        id: "41254461",
        payment_done: "150000",
        payment_pending: "220000",
        date_debut: "25-03-2023",
        date_fin: "25-03-2024",
        tontine_name: "Tous pour 1",
        bras: "2",
        nb_people: "10",
        cotisation: "40000",
        periodicite: "2",


      },

    ],
  };
  const myTontines = tontines?.data.filter(ton => ton.attributes.owner?.data?.id == currentUser?.user.id)
  const handleCardPress = (item) => {
    router.push(`/Tontine-details/${item.id}`);
    setSelectedTontine(item.id);
  };


  useEffect(() => {
    getData()
    refetch()


  }, [])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

     
      <ScrollView showVerticalScrollIndicator={false}>
       <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,

          headerTitle: " Mes tontines ",
        }}
      />

        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <SidebarProfile isOpen={profileIsOpen} setIsOpen={setProfileIsOpen} />

        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Portefeuille</Text>

            </View>
            <View style={styles.cardsContainer}>
              {/* <Text >Compte</Text> */}
              {isLoading ? (
                <ActivityIndicator size="large" colors={COLORS.primary} />
              ) : isError ? (
                <Text> {JSON.stringify(error)} Something went wrong </Text>
              ) : myTontines?.length === 0 ? (
                <>
                  <>
                    <Text> Vous n'avez créer aucune tontine</Text>
                    <TouchableOpacity onPress={() => router.push("/tontineList")}>
                      <Text style={styles.headerBtn}> Voir les Tontines</Text>
                    </TouchableOpacity>
                  </>
                </>
              ) : (
                myTontines.map((item, index) => (
                  <AccountCard
                    payments={payments}
                    currentUser={currentUser}
                    hands={hands}
                    account={item}
                    handleNavigate={() =>
                      router.push(`/job-details/${item.id}`)
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
  );
};

export default accountList;
