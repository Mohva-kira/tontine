
import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Button,
    Platform,

} from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Background from "./Background";
import { Field } from "../components";
import RadioGroup, { Radio } from "react-native-radio-input/Components/main";
import DatePicker from "react-native-datepicker-expo";
import { useAddProfileMutation } from "../reducers/api/profileApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-redux";
import { store } from "./store";
import ToastManager, { Toast } from 'toastify-react-native'
import { Alert } from "react-native";
import { useForgetPasswordMutation } from "../reducers/api/authApi";


const ForgotPassword = () => {

    return (
        <Provider store={store}>
            <ForgotPasswordWrapper />
        </Provider>
    )
}

const ForgotPasswordWrapper = () => {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [prenom, setPrenom] = useState("");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [pays, setPays] = useState("");
    const [ville, setVille] = useState('');
    const [email, setEmail] = useState('');

    const [addProfile, { isLoading }] = useAddProfileMutation()
    const [currentUser, setCurrentUser] = useState(null)

    const [forgetPassword] = useForgetPasswordMutation()



    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@TontineAdded', jsonValue)

        } catch (e) {
            // saving error
            console.log('error', e)
        }
    }


    const today = new Date();





    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@user')
            console.log('getData', jsonValue)
            if (jsonValue) {
                setCurrentUser(JSON.parse(jsonValue))
            }
            return jsonValue
        } catch (e) {
            // error reading value

            console.log('error', e)
        }
    }



    const sendData = async () => {

        const data = { email: phone + '@gmail.com' }
        storeData(data)

        console.log('data to send', data)
        try {
            await forgetPassword(data)
                .unwrap()
                .then(data => {
                    console.log('added', data);
                    const message = `Vérifier vos SMS  pour modifier votre mot de passe.`;
                    Toast.success(message)
                })
                .catch(e => console.log('error', e))



        } catch (error) {

        }
    }

    useEffect(() => {
        getData()

    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ToastManager />
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,

                    headerTitle: "Mot de passe oublié",
                }}
            />
            <ScrollView showVerticalScrollIndicator={false}>
                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: COLORS.white,

                            width: 420,
                            borderTopLeftRadius: 100,
                            paddingTop: 50,
                            alignItems: "center",
                        }}
                    >


                        <Text
                            style={{
                                color: COLORS.gray2,
                                fontSize: 34,
                                fontWeight: "bold",
                                marginVertical: 10,
                            }}
                        >
                            Mot de passe oublié
                        </Text>
                        <Field
                            placeholder="Numero de telephone"
                            onChangeText={(num) => setPhone(num)}
                        />




                        <TouchableOpacity
                            style={{
                                backgroundColor: "#FE7654",
                                borderRadius: 100,
                                alignItems: "center",
                                width: 250,
                            }}
                            onPress={sendData}
                        >
                            <Text
                                style={{
                                    color: COLORS.lightWhite,
                                    fontSize: 22,
                                    fontWeight: "bold",
                                }}
                            >
                                Envoyer le code
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ForgotPassword