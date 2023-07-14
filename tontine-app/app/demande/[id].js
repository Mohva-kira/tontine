import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { WelcomeCard } from '../../components'
import { useGetProfilesQuery } from '../../reducers/api/profileApi'
import { Provider } from 'react-redux'
import { store } from '../store'
import { useSearchParams, Stack, useRouter } from 'expo-router'
import { SIZES, FONT, COLORS } from '../../constants'
import { useGetNotificationsQuery } from '../../reducers/api/notificationApi'
import { useSelector } from 'react-redux'
import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
    Payment
} from "../../components";
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import ToastManager, { Toast } from 'toastify-react-native'
import {icons} from '../../constants'


const Demande = () => {
    return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

                <DemandeWrapper />

            </SafeAreaView>
        </Provider>
    )
}


const tabs = ["Infromations", "Tontine",];

const DemandeWrapper = () => {

    const user = useSelector((state) => state.user)
    const isFocused = useIsFocused()
    const router = useRouter()
    const params = useSearchParams()
    const { data, isLoading, isFetching, isSucces, isError, refetch } = useGetProfilesQuery(params?.id)
    const { data: notifData } = useGetNotificationsQuery(params?.id)
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [currentUser, setCurrentUser] = useState(null)

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@user')
           
            if (jsonValue) {
                setCurrentUser(JSON.parse(jsonValue))
            }
            return jsonValue
        } catch (e) {
            // error reading value

            console.log('error', e)
        }
    }

    const displayTabContent = () => {
        switch (activeTab) {
            case "Infromations":
                return (
                    <Specifics
                        title="Infromations"
                        points={data?.data[0] ?? ["N/A"]}
                    />
                );
            case "Tontine":
                return (
                    <JobAbout info={notifData?.data[0]?.attributes.tontine.data.attributes ?? "Aucune donnée fournis"} />
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

    const sendData = async () => {

        let lu = true
        const updateData = { data: { id: data?.data[0]?.id, lu } }
        const newNotif = { data: { title: 'Demande accpeté', lu: false, from: user?.user?.id || currentUser?.user.id, to: notifData?.data[0]?.attributes.from.data?.id, tontine: notifData?.data[0]?.attributes.tontine.data?.id, description: 'Votre demande de participation a été accepter' } }
            console.log('la data', newNotif)
        try {
            await updateNotif(updateData)
                .unwrap()
                .then(data => { Toast.success('Notification mise a jour!')  })
                .catch(e => console.log('error', e))


            await addNotif(newNotif)
                .unwrap()
                .then(data => { Toast.success('Notification envoyé!') })
                .catch(e => console.log('error', e))



        } catch (error) {

        }
    }

    useEffect(() => {

        getData()
        refetch()
        // setTimeout(() => checkProfile(), 3000)



    }, [isFocused])

    return (
        <View>
      {console.log('id', params.id)}
      {console.log('notif', notifData)}
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

          headerTitle: "Demande de participation",
        }}
      />
   
            <WelcomeCard profile={data?.data[0]} />
         
            <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {displayTabContent()}

            <TouchableOpacity
                style={{
                    backgroundColor: "#FE7654",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",

                    borderRadius: 16,
                    marginTop: 20,
                    width: "70%",
                }}
                onPress={sendData}
            >
                <Text style={styles.applyBtnText}>Valider la participation</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: SIZES.small,
        backgroundColor: "#FFF",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    likeBtn: {
        width: 55,
        height: 55,
        borderWidth: 1,
        borderColor: "#F37453",
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    likeBtnImage: {
        width: "40%",
        height: "40%",
        tintColor: "#F37453",
    },
    applyBtn: {
        flex: 1,
        backgroundColor: "#FE7654",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: SIZES.medium,
        borderRadius: SIZES.medium,
    },
    applyBtnText: {
        fontSize: SIZES.medium,
        color: COLORS.white,
        fontFamily: FONT.bold,
    },
});


export default Demande