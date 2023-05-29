import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../util";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Company = ({ companyLogo, date, name, cotisation }) => {

  const strToDate = new Date(date)
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{name}</Text>
      </View>
      <View style={styles.companyInfoBox}>
      <View style={styles.locationBox}>
      <MaterialCommunityIcons name="whistle-outline" size={24} color="black" />
        </View>
        <Text style={styles.companyName}>{ strToDate.toLocaleDateString('fr')} / </Text>
        <View style={styles.locationBox}>
        <MaterialCommunityIcons
            name="piggy-bank-outline"
            size={24}
            color="black"
          /> 
        </View>

        <Text style={styles.locationName}>{Number(cotisation).toLocaleString("en") + " FCFA"}</Text>
      </View>
    </View>
  );
};

export default Company;
