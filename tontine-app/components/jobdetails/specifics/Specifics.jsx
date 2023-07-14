import React from "react";
import { View, Text } from "react-native";

import styles from "./specifics.style";

const Specifics = ({ title, points }) => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.pointsContainer}>
        
            <View style={styles.pointWrapper} >
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>{points.attributes?.email}</Text>
             
            </View>
          
           <View style={styles.pointWrapper} >
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>Date de naissance : { new Date(points.attributes?.date_naissance).toLocaleDateString('fr') }</Text>
              
              
            </View>
            <View style={styles.pointWrapper} >
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>{points.attributes?.pays}</Text>
              <Text style={styles.pointText}>{points.attributes?.ville}</Text>
            </View>
          
        </View>
    </View>
  );
};

export default Specifics;
