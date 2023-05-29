import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./accountcard.style";

import { checkImageURL } from "../../../../util";

import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tooltip from "react-native-walkthrough-tooltip";

const AccountCard = ({
  account,
  handleCardPress,
  hands,
  payments,
  currentUser,
}) => {
  const [isPeriodVisible, setIsPeriodVisible] = useState(false);
  const [isCotisationVisible, setIsCotisationVisible] = useState(false);
  const [isHandsVisible, setIsHandsVisible] = useState(false);

  const myHand = hands?.data.find(
    (hand) =>
      hand?.attributes.tontine?.data.id === account.id &&
      hand?.attributes.user?.data.id === currentUser?.user.id
  );
  const myPayments = payments?.data.filter(
    (pay) =>
      pay.attributes.user.data.id === currentUser?.user.id &&
      pay.attributes.tontine.data.id === account.id
  );

  const calculatePaymentDone = () => {
    let result = 0;

    for (i = 0; i <= myPayments?.length; i++) {
      if (myPayments[i]?.attributes?.amount)
        result = result + parseInt(myPayments[i]?.attributes?.amount);
    }
   
    return result;
  };

  const calculatePaymentDue = () => {
    let result = 0;

    for (i = 0; i <= myPayments?.length; i++) {
      if (myPayments[i]?.attributes?.amount)
        result = result + parseInt(myPayments[i]?.attributes?.amount);
    }
   
    return account?.attributes?.amount_collect - result;
  };



  return (
    <TouchableOpacity
      style={styles.container(account)}
      onPress={handleCardPress}
    >
      <View style={styles.detailContianer}>
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={{
              uri: checkImageURL(account.image)
                ? account.image
                : account.type === "account"
                ? "https://icons-for-free.com/iconfiles/png/512/wallet+icon-1320190636366256884.png"
                : "https://cdn-icons-png.flaticon.com/512/2331/2331941.png",
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>

        <Tooltip
          isVisible={isPeriodVisible}
          content={
            <Text> Périodicité : {account.attributes.periodicite} </Text>
          }
          placement="top"
          onClose={() => setIsPeriodVisible(!isPeriodVisible)}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => setIsPeriodVisible(!isPeriodVisible)}
          >
            <Text style={styles.detailText}>
              <Entypo name="back-in-time" size={24} color="black" />{" "}
            </Text>
          </TouchableOpacity>
        </Tooltip>

        <Tooltip
          isVisible={isHandsVisible}
          content={<Text> Bras : {myHand?.attributes.hands} </Text>}
          placement="top"
          onClose={() => setIsHandsVisible(!isHandsVisible)}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => setIsHandsVisible(!isHandsVisible)}
          >
            <Text style={styles.detailText}>
              {account.bras == "1" ? (
                <>
                  <MaterialCommunityIcons
                    name="human-greeting"
                    size={24}
                    color="black"
                  />{" "}
                  {account.bras}
                </>
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="human-handsup"
                    size={24}
                    color="black"
                  />{" "}
                  {account.bras}
                </>
              )}
            </Text>
          </TouchableOpacity>
        </Tooltip>

        <Tooltip
          isVisible={isCotisationVisible}
          content={<Text> coitsation </Text>}
          placement="top"
          onClose={() => setIsCotisationVisible(!isCotisationVisible)}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => setIsCotisationVisible(!isCotisationVisible)}
          >
            <Text style={styles.detailText}>
              <MaterialCommunityIcons
                name="piggy-bank-outline"
                size={24}
                color="black"
              />{" "}
              {account.attributes.cotisation}
            </Text>
          </TouchableOpacity>
        </Tooltip>
      </View>

      <Text style={{ marginLeft: 20 }}> {account.attributes.name} </Text>

      <View style={styles.textContainer}>
        <Text style={styles.tontineName}>
          {account.type === "account"
            ? "Montant en caisse"
            : " Versement effectué"}
        </Text>
        <Text style={styles.tontineAmount}>
          {account.type === "account"
            ? parseInt(account.solde).toLocaleString("fr") + " FCFA"
            : calculatePaymentDone().toLocaleString("en") + " FCFA"}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.tontineName}>
          {account.type === "account" ? "" : "Versement Restant"}
        </Text>
        <Text style={styles.tontineAmount}>
          {account.type === "account"
            ? ""
            : calculatePaymentDue().toLocaleString("en") + " FCFA"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccountCard;
