import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";
import Popup from "../../popup/Popup";
import Field from "../../field/Field";
import ToastManager, { Toast } from "toastify-react-native";
import {useAddNotificationMutation } from "../../../reducers/api/notificationApi";

const Footer = ({ tontine, updateFunction, handsFunction, user, refetch, members }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bras, setBras] = useState("1");
  const [addNotif] = useAddNotificationMutation()

  const [message, setMessage] = useState(null);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const sendData = async () => {
    let arr = members.slice()
    arr.push(user?.user.id)



    const handsData = {
      data: { tontine: tontine?.data.id, user: user?.user.id, hands: bras },
    };

   

    const tontineData = { data: { id: tontine?.data.id, members: arr } };

    const notifData = {data : {title: 'Demande de participation', lu : false, from: user?.user.id, to: tontine?.data.attributes.owner.data?.id, tontine: tontine?.data.id, description: 'Une nouvelle demande de participation', type: 'Demande' }}
    

    try {
      await updateFunction(tontineData)
        .unwrap()
        .then((data) => {
          Toast.success("Vous participation en attente de validation!");
          setTimeout(() => {
            refetch()
            toggleModal();
          }, 3000);
        })
        .catch((error) => console.log("error", error));

      await handsFunction(handsData)
        .unwrap()
        .then((data) => {})
        .catch((error) => console.log("error", error));


        await addNotif(notifData)
        .unwrap()
        .then((data) => {})
        .catch((error) => console.log("error", error));




    } catch (error) {
      console.log("error", error);
    }
  };

 
  return (
    <View style={styles.container}>
  

      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.applyBtn} onPress={toggleModal}>
        <Text style={styles.applyBtnText}>Participer</Text>
      </TouchableOpacity>

      
      
      <Popup modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <ToastManager />
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 5,
          }}
        >
          Nombre de bras
        </Text>
        <Field
          placeholder="Nombre de bras"
          onChangeText={(nb) => setBras(nb)}
          keyboardType="numeric"
          value={bras}
        />
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
          <Text style={styles.applyBtnText}>Participer</Text>
        </TouchableOpacity>
      </Popup>
    </View>
  );
};

export default Footer;
