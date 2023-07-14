import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./tontineCard.style";

import { checkImageURL } from "../../../../util";

import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Tooltip from "react-native-walkthrough-tooltip";

const TontineCard = ({ tontine, handleCardPress }) => {

  const [isPeriodVisible, setIsPeriodVisible] = useState(false);
  const [isPeopleVisible, setIsPeopleVisible] = useState(false);
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const [isFeeVisible, setIsFeeVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container(tontine)}
      onPress={handleCardPress}
    >
      <View style={styles.detailContianer}>
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={{
              uri: checkImageURL(tontine.image)
                ? tontine.image
                : tontine.attributes.type === "tontine"
                ? "https://icons-for-free.com/iconfiles/png/512/wallet+icon-1320190636366256884.png"
                : "https://cdn-icons-png.flaticon.com/512/2331/2331941.png",
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>

        <Tooltip
          isVisible={isPeriodVisible}
          content={  <Text> Périodicité : {tontine.attributes.periodicite} </Text> }
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
          isVisible={isPeopleVisible}
          content={<Text>Nombre de participant</Text>}
          placement="top"
          onClose={() => setIsPeopleVisible(!isPeopleVisible)}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => setIsPeopleVisible(!isPeopleVisible)}
          >
            <Text style={styles.detailText}>
              <>
                <Ionicons name="person-outline" size={24} color="black" />{" "}
                {tontine.attributes.nb_people}
              </>
            </Text>
          </TouchableOpacity>
        </Tooltip>

        <Tooltip
          isVisible={isAmountVisible}
          content={<Text>Montant de la cotisation</Text>}
          placement="top"
          onClose={() => setIsAmountVisible(!isAmountVisible)}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => setIsAmountVisible(!isAmountVisible)}
          >
            <Text style={styles.detailText}>
              <MaterialCommunityIcons
                name="piggy-bank-outline"
                size={24}
                color="black"
              />{" "}
              {Number(tontine.attributes.cotisation).toLocaleString("en")}
            </Text>
          </TouchableOpacity>
        </Tooltip>

        <Tooltip
          isVisible={isFeeVisible}
          content={<Text> {tontine.attributes.logistic_fees}% de frais pour la logistique + 5% de frais d'administrtion</Text>}
          placement="top"
          onClose={() => setIsFeeVisible(!isFeeVisible)}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => setIsFeeVisible(!isFeeVisible)}
          >
            <Text style={styles.detailText}>
              <Feather name="percent" size={24} color="black" />{" "}
              {tontine.attributes.logistic_fees + 5} 
            </Text>
          </TouchableOpacity>
        </Tooltip>
      </View>

      <Text style={{ marginLeft: 13 }}> {tontine.attributes.name} </Text>

      <View style={styles.textContainer}>
        <Text style={styles.tontineName}>Montant à encaisser</Text>
        <Text style={styles.tontineAmount}>
          {(
            Number(tontine.attributes.cotisation) * Number(tontine.attributes.nb_people) -
            ((Number(tontine.attributes.cotisation) * Number(tontine.attributes.nb_people)) / 100) *
              Number(tontine.attributes.logistic_fees) -
            ((Number(tontine.attributes.cotisation) * Number(tontine.attributes.nb_people)) / 100) *
              Number('5')
          ).toLocaleString("fr") + " FCFA"}
        </Text>
      </View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.tontineName}>
          
          {tontine.type === "tontine" ? "" : "Versement Restant"}
        </Text>
        <Text style={styles.tontineAmount}>
          
          {tontine.type === "tontine"
            ? ""
            : parseInt(tontine.payment_pending).toLocaleString("en") +
              " FCFA"}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default TontineCard;
