import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./payment.style";
import { icons } from "../../../constants";
import Popup from "../../popup/Popup";
import Field from "../../field/Field";
import ToastManager, { Toast } from "toastify-react-native";
import { useGetHandsQuery } from "../../../reducers/api/handsApi";

const Payment = ({ tontine, functionPay, handsFunction, user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { data: hands, isLoading, refetch, isSuccess } = useGetHandsQuery()
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const myHands = hands?.data.find(hand => hand?.attributes.tontine.data.id === tontine?.data.id && hand?.attributes.user.data.id === user?.user.id  ) 

  const amountToPay = (myHands?.attributes.hands *  tontine?.data.attributes.cotisation).toString()

  const sendData = async () => {
  
    const paymentData = { data : { amount: amountToPay, mode: 'Mobile Payment', tontine: tontine?.data.id, user: user?.user.id, type: 'prelevement' } }


    try {
      await functionPay(paymentData)
        .unwrap()
        .then((data) => {
          console.log("updated data", data);
          Toast.success("Paiement reussie!");
          setTimeout(() => {
            toggleModal();
          }, 3000);
        })
        .catch((error) => console.log("error", error));

    
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    refetch()
  
  }, [])
  

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
        <Text style={styles.applyBtnText}>Payer la cotisation</Text>
      </TouchableOpacity>

      
      
      <Popup modalVisible={modalVisible} tontine={tontine} setModalVisible={setModalVisible}>
        <ToastManager />
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 20,
          }}
        >
          Votre participation est de {myHands?.attributes.hands } bras
        </Text>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          Montant
        </Text>
       <Text style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 35,
            marginBottom: 5,
          }}>{( myHands?.attributes.hands *  tontine?.data.attributes.cotisation).toLocaleString('fr') + ' Fcfa' }</Text>
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
          <Text style={styles.applyBtnText}>Payer</Text>
        </TouchableOpacity>
      </Popup>
    </View>
  );
};

export default Payment;
