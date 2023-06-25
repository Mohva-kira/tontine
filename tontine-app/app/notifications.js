import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { useGetNotificationsQuery } from '../reducers/api/notificationApi'
import { store } from "./store";
import { Provider, useSelector } from "react-redux";
import { COLORS, icons, images, SIZES } from "../constants";
import styles from '../components/common/header/screenheader.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useUpdateNotificationMutation } from '../reducers/api/notificationApi';
import { useAddNotificationMutation } from '../reducers/api/notificationApi';
import ToastManager, { Toast } from 'toastify-react-native'
import { useRouter } from 'expo-router';

const Notifications = () => {
  return (
    <Provider store={store}>
      <NotificationsWrapper />
    </Provider>
  )
}

const NotificationsWrapper = () => {
  const user = useSelector((state) => state.user)
  const isFocused = useIsFocused()
  const [currentUser, setCurrentUser] = useState(null)
  const [updateNotif] = useUpdateNotificationMutation()
  const [addNotif] = useAddNotificationMutation()

  const router = useRouter()

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
  const { data, isLoading, isSuccess, isFetching, isError, refetch } = useGetNotificationsQuery(user?.user?.user.id || currentUser?.user.id)

  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  };



  // Formater les donnees pour le module timeline
  const formatData = () => {
    let result = []
    for (i = 0; i < data?.data.length; i++) {
      if (!data?.data[i].attributes.lu) {
        result.push(
          {
            time: new Date(data?.data[i]?.attributes.createdAt).toLocaleDateString('fr', options),
            title: `${data?.data[i]?.attributes.title} à la tontine " ${data?.data[i]?.attributes.tontine.data.attributes.name} " `,
            description: data?.data[i]?.attributes.description
          }
        )
      }
    }
    console.log('result', result)
    return result
  }

  const sendData = async () => {

    let lu = true
    const updateData = { data: { id: data?.data[0].id, lu } }
    const newNotif = { data: { title: 'Demande accpeté', lu: false, from: user?.user.id || currentUser?.user.id, to: data?.data[0].attributes.from.data.id, tontine: data?.data[0].attributes.tontine.data.id, description: 'Votre demande de participation a été accepter' } }

    console.log('data to send', updateData)
    try {
      await updateNotif(updateData)
        .unwrap()
        .then(data => { console.log('added', data) })
        .catch(e => console.log('error', e))


      await addNotif(newNotif)
        .unwrap()
        .then(data => { console.log('added', data); Toast.success('Notification envoyé!') })
        .catch(e => console.log('error', e))



    } catch (error) {

    }
  }

  const formatedData = formatData()
  useEffect(() => {

    getData()
    refetch()
    // setTimeout(() => checkProfile(), 3000)



  }, [isFocused])
  return (
    <SafeAreaView>
      <View>
        <ToastManager />


        {console.log('la data user', data)}
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : isError ? (
          <Text> Something went wrong </Text>
        ) : formatedData.length === 0 ? (
          <>
            <Text> Vous n'avez aucune notification</Text>
            {/* <TouchableOpacity onPress={() => router.push("/accountList")}>
              <Text style={styles.headerBtn}> Voir les Tontines</Text>
            </TouchableOpacity> */}
          </>
        ) : (
          <View style={{ marginTop: SIZES.xLarge, }} >
            <Timeline
              data={formatedData}
              circleSize={20}
              circleColor='rgb(45,156,219)'
              circleStyle={{ marginLeft: 5 }}
              lineColor='rgb(45,156,219)'
              timeContainerStyle={{ minWidth: 52, marginTop: -5, marginLeft: 5 }}
              timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
              descriptionStyle={{ color: 'gray' }}
              options={{
                style: { paddingTop: 5 }
              }}
              isUsingFlatlist={true}
              innerCircle={'dot'}
              onEventPress={() => data?.data[0]?.attributes.type === 'Demande' ? router.push(`/demande/${data?.data[0]?.attributes.from.data.id}`) : sendData()}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}


export default Notifications