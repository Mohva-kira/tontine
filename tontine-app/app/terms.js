import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Background from "./Background";
import { Field } from "../components";


const Terms = () => {
  const router = useRouter()

  return (
    <Background>
      <ScrollView showVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            width: 460,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 64,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            Conditions
          </Text>

          <Text style={{color: 'white', fontSize: 19, fontWeight: 'bold', marginBottom: 20}}> Confirmer par "lu et approuvé" </Text>
          <View
            style={{
              backgroundColor: COLORS.white,
              height: 700,
              width: 460,
              borderTopLeftRadius: 100,
              paddingTop: 50,
              alignItems: "center",
            }}
          >
            
            <Field placeholder="Confirmation" />
           

            {/* <View
              style={{ alignItems: "flex-end", width: "78%", paddingRight: 16, marginBottom: 200 }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Forgot Password ?
              </Text>
            </View> */}

            <TouchableOpacity style={{backgroundColor: '#FE7654', borderRadius: 100, alignItems: 'center', width: 250}} onPress={() => {
                alert("Account created")
                router.push('/login')
                
                 }} >
              <Text style={{color: COLORS.lightWhite, fontSize: 22, fontWeight: 'bold'}}>Terminer</Text>
            </TouchableOpacity>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>En terminant, vous confirmez être d'accord avec nos termes de contrat et notre politique de fonctionnement</Text>

                {/* <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 16}} > Connexion </Text>
                </TouchableOpacity> */}

            </View>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default Terms;
