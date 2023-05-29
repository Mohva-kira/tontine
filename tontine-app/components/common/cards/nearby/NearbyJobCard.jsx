import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";

import { checkImageURL } from "../../../../util";

const NearbyJobCard = ({ transac, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container(transac)}
      onPress={handleNavigate}
    >
      
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(transac.image)
              ? transac.image
              : transac.attributes.type === 'prelevement'  ? "https://cdn-icons-png.flaticon.com/512/2845/2845731.png" : "https://cdn-icons-png.flaticon.com/512/2133/2133154.png",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {transac.month}
        </Text>
        <Text style={styles.date}>{new Date(transac.attributes.createdAt).toLocaleDateString('fr') } </Text>
        <Text style={styles.jobType}>{parseInt(transac.attributes.amount).toLocaleString('fr') + " FCFA"} </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.tontineName}>{transac.attributes.tontine.data.attributes.name}</Text>
        <Text style={{ paddingLeft: 10, paddingTop: 20 }}> {!transac.attributes.type ? 'prelevement' : transac.attributes.type} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
