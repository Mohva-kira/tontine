import React from 'react'
import { View, Text } from 'react-native'

import styles from './about.style'

const About = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Détails de la tontine</Text>

      <View style={styles.container}>

        <Text style={styles.contextText}>Montant à collecter : {info.amount_collect.toLocaleString('fr') + ' Fcfa'}</Text>
        <Text style={styles.contextText}>Emplacement : {info.location}</Text>
        <Text style={styles.contextText}>Nombre maximum de participants : {info.nb_people}</Text>
        <Text style={styles.contextText}>Périodicité : {info.periodicite}</Text>
        <Text style={styles.contextText}>Prochaine echéance : { new Date(info.nextDueDate).toLocaleDateString('fr')}</Text>
      </View>
    </View>
  )
}

export default About