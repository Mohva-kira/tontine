import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";
import Popup from "../../popup/Popup";
import Field from "../../field/Field";
import ToastManager, { Toast } from "toastify-react-native";

const Footer = ({ tontine, updateFunction, handsFunction, user, refetch, members }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bras, setBras] = useState("1");

  const [message, setMessage] = useState(null);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const sendData = async () => {
    let arr = members.slice()
    arr.push(user?.user.id)
    console.log('les members', arr)


    const handsData = {
      data: { tontine: tontine?.data.id, user: user?.user.id, hands: bras },
    };
    console.log("user", user?.user.id);
   

    const tontineData = { data: { id: tontine?.data.id, members: arr } };
    
      console.log('hands data', handsData)
      console.log('tontine data', tontineData)
    try {
      await updateFunction(tontineData)
        .unwrap()
        .then((data) => {
          console.log("updated data", data);
          Toast.success("Vous participation en attente de validation!");
          setTimeout(() => {
            refetch()
            toggleModal();
          }, 3000);
        })
        .catch((error) => console.log("error", error));

      await handsFunction(handsData)
        .unwrap()
        .then((data) => console.log("updated data", data))
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log("error", error);
    }
  };

 
  return (
    <View style={styles.container}>
      {console.log("actual members", members)}

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
