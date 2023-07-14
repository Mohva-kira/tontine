import Reac, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Background from "./Background";
import { Field } from "../components";
import RadioGroup, { Radio } from "react-native-radio-input/Components/main";




const Terms = () => {
  const router = useRouter()
  const [read, setRead] = useState(0)
  const { height, width } = Dimensions.get('window');

  getChecked = (value) => {
    // value = our checked value

    setRead(value)
  }

  return (
    <Background>
      <ScrollView showVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            width: (width > height) ? height : width,
            height: (height < width) ? width : height
          }}
        >
          <Text
            style={{
              color: COLORS.gray2,
              fontSize: 44,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            Conditions
          </Text>

          <Text style={{ color: COLORS.gray2, fontSize: 19, fontWeight: 'bold', marginBottom: 20, width: '70%' }}> Veuillez lire et Accepter les conditions  </Text>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: (width > height) ? height : width,
              height: (height < width) ? width : height,
              borderTopLeftRadius: 100,
              paddingTop: 50,
              alignItems: "center",
            }}
          >
            <RadioGroup getChecked={getChecked} RadioGroupStyle={{ flexDirection: "row" }}>
              <Radio iconName={"lens"} label={"J'accèpte"} value={1} />
              <Radio iconName={"lens"} label={"Je refuse"} value={0} />


            </RadioGroup>
            {/* <Field  onChangeText={setText} placeholder="Confirmation" /> */}


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

            <TouchableOpacity style={{ backgroundColor: read ? '#FE7654' : '#fbb3a1', borderRadius: 100, alignItems: 'center', width: 250, marginTop: 20 }} onPress={() => {
            
              router.push('/login')

            }}

              disabled={read === 0}>
              <Text style={{ color: COLORS.lightWhite, fontSize: 22, fontWeight: 'bold' }}>Terminer</Text>
            </TouchableOpacity>

            {!read &&

              <TouchableOpacity style={{ backgroundColor: '#FE7654', borderRadius: 100, alignItems: 'center', width: 250, marginTop: 20 }} onPress={() => {
                router.push('/signup')

              }}

                disabled={read === 1}>
                <Text style={{ color: COLORS.lightWhite, fontSize: 22, fontWeight: 'bold' }}>Annuler</Text>
              </TouchableOpacity>

            }

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", width: '70%' }}>En terminant, vous confirmez être d'accord avec nos termes de contrat et notre politique de fonctionnement</Text>

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
