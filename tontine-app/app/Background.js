import { View, Text, ImageBackground, SafeAreaView } from 'react-native'
import { COLORS, icons, images, SIZES } from "../constants";
import React from 'react'

const Background = ({children}) => {
  return (
    <SafeAreaView >
    <View>
    
      <ImageBackground source={require("../assets/images/background.jpg")} style={{height: '100%'}} />
      <View style={{position: "absolute"}}>
        {children}
      </View>
    </View>
    </SafeAreaView>
  )
}

export default Background