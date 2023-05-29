import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./welcomecard.style";
import { useRouter } from "expo-router";
import { checkImageURL } from "../../../../util";
import { Entypo } from '@expo/vector-icons'; 

const WelcomeCard = ({ profile }) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push('/profile/1')}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(profile?.attributes?.image)
              ? user?.image
              : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Image.png",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {profile?.attributes.nom + " " + profile?.attributes.prenom } 
      
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {/* {item.job_title} */}
          Niveau Gold
        </Text>
        <Text style={styles.location}>
          {/* {item.job_country}  */}
         <Entypo name="star-outlined" size={24} color="yellow" /> 45  
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default WelcomeCard;
