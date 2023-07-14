import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Linking, SafeAreaView } from "react-native";

import styles from "./payment.style";
import { COLORS, icons } from "../../../constants";
import Popup from "../../popup/Popup";
import Field from "../../field/Field";
import ToastManager, { Toast } from "toastify-react-native";
import { useGetHandsQuery } from "../../../reducers/api/handsApi";
import RadioGroup, { Radio } from "react-native-radio-input/Components/main";
import om from "../../../assets/images/om_logo.png";
import moov from "../../../assets/images/Moov_Africa_logo.png";

const Payment = ({ tontine, functionPay, handsFunction, user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { data: hands, isLoading, refetch, isSuccess } = useGetHandsQuery();
  const [payMode, setPayMode] = useState(null);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const myHands = hands?.data.find(
    (hand) =>
      hand?.attributes.tontine.data.id === tontine?.data.id &&
      hand?.attributes.user.data.id === user?.user.id
  );

  const amountToPay = (
    myHands?.attributes.hands * tontine?.data.attributes.cotisation
  ).toString();

  const sendData = async () => {
    const paymentData = {
      data: {
        amount: amountToPay,
        mode: "Mobile Payment",
        tontine: tontine?.data.id,
        user: user?.user.id,
        type: "prelevement",
      },
    };

    try {
      await functionPay(paymentData)
        .unwrap()
        .then((data) => {
     
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

  const getChecked = (value) => {
    // value = our checked value

    setPayMode(value);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} > 
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

      <Popup
        modalVisible={modalVisible}
        tontine={tontine}
        setModalVisible={setModalVisible}>
        <ToastManager />
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 20,
          }}>
          Votre participation est de {myHands?.attributes.hands} bras
        </Text>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 5,
          }}>
          Montant
        </Text>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 35,
            marginBottom: 5,
          }}>
          {(
            myHands?.attributes.hands * tontine?.data.attributes.cotisation
          ).toLocaleString("fr") + " Fcfa"}
        </Text>

        <View
          style={{
           
            justifyContent: "center",
            width: '100%',
            marginTop: 70,
          }}>
     

         

          <TouchableOpacity
            onPress={() => getChecked("om")}
            style={{
              flexDirection: "row",
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
              backgroundColor: payMode === "om" ? "#FF957A" : COLORS.gray2,
              width: "100%",
            }}>
            <Image source={om} style={{ width: 100, height: 75 }} />
            <Text style={{color: payMode === "om" ? 'white' : 'black', fontSize: 18}}>Orange Money</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => getChecked("moov")}
            style={{
              flexDirection: "row",
              marginTop: 10,
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
              backgroundColor: payMode === "moov" ? "#FF957A" : COLORS.gray2,
              width: "100%",
            }}>
            <Image source={moov} style={{ width: 75, height: 75 }} />
            <Text style={{color: payMode === "moov" ? 'white' : 'black', fontSize: 18}}>Moov Money</Text>
          </TouchableOpacity>
        </View>
   
        <TouchableOpacity
          style={{
            backgroundColor: payMode === null ? "#fbb3a1" : "#FE7654",
            height: 50,
            justifyContent: "center",
            alignItems: "center",

            borderRadius: 16,
            marginTop: 20,
            width: "70%",
          }}
          onPress={sendData}
          disabled={payMode === null}
          >
          <Text style={styles.applyBtnText}>Payer</Text>
        </TouchableOpacity>

      </Popup>
    </View>
    </SafeAreaView>
  );
};

export default Payment;
