import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({ url }) => {
const router = useRouter()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.applyBtn}  onPress={() => router.push('/login')}>
        {/* <Image 
          source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}

        /> */}
        <Text style={styles.applyBtnText}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.applyBtn2} 
        onPress={() => router.push('/signup')}
      >
        <Text style={styles.applyBtnText2}>Inscription</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer