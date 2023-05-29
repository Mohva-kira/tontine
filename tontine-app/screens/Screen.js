import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'

const Screen = () => {
  return (
    <View>
      <SafeAreaView>
        <TouchableOpacity>
            
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#161927",
        fontSize: 20,
        fontWeight: "500"
    }
})