import React from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../../constants";

const Home = () => {
    const router = useRouter()


  return (
    <SafeAreaView>
     <Stack.Screen />
      <View style={{flex: 1, padding: SIZES.medium}}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
