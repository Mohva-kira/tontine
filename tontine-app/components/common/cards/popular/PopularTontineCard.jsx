import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";

import styles from "./populartontinecard.style";

import { checkImageURL } from "../../../../util";

const PopularTontineCard = ({ item, selectedTontine, handleCardPress, payments, currentUser }) => {



  const tontinePayments = payments?.filter(pay => item?.id === pay?.attributes.tontine.data.id &&  pay?.attributes.user.data?.id === currentUser?.user.id) 


  const calculatePaymentDone = () => {
    let result = 0
    

    for (i=0; i <= tontinePayments?.length; i++) {
      if(tontinePayments[i]?.attributes?.amount) 
          result = result + parseInt(tontinePayments[i]?.attributes?.amount)
    
      

        }
 
  return  result  
}

const calculatePaymentDue = () => {
  let result = 0
    

  for (i=0; i <= tontinePayments?.length; i++) {


    if(tontinePayments[i]?.attributes?.amount) 
        result = result + parseInt(tontinePayments[i]?.attributes?.amount)
  
    

      }
return item?.attributes?.amount_collect - result  
}

  return (
    <TouchableOpacity
      style={styles.container(selectedTontine, item)}
      onPress={() => handleCardPress(item)}
      >
  
      <TouchableOpacity style={styles.logoContainer(selectedTontine, item)}>
        <Image
          source={{
            uri: checkImageURL(item.tontine_logo)
              ? item.tontine_logo
              : item.type == "account" ? "https://icons-for-free.com/iconfiles/png/512/wallet+icon-1320190636366256884.png" : "https://cdn-icons-png.flaticon.com/512/2331/2331941.png" ,
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.attributes.name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedTontine, item)} numberOfLines={1}>
          {item?.type === "account" ? parseInt(item.solde).toLocaleString('fr')   + " FCFA"  : "Effectué : " + calculatePaymentDone(item).toLocaleString('fr') + " FCFA" }
        </Text>
        <Text style={styles.location}>{item?.type !== "account" ? "Restant : " + calculatePaymentDue().toLocaleString('fr')  + " FCFA"  : ""} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularTontineCard;
