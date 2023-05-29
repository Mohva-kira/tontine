import { View, Text } from 'react-native'
import React from 'react'
import Screen from './Screen'


export const Dashboard = ({navigation}) => <Screen navigation={navigation} name="Dashboard" />
export const MessageScreen = ({navigation}) => <Screen navigation={navigation} name="MessageScreen" />
export const TransactionsList = ({navigation}) => <Screen navigation={navigation} name="TransactionsList" />
export const AccountList = ({navigation}) => <Screen navigation={navigation} name="AccountList" />
export const Login = ({navigation}) => <Screen navigation={navigation} name="Login" />
export const Signup = ({navigation}) => <Screen navigation={navigation} name="Signup" />
