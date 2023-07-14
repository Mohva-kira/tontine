import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ children, component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  const router = useRouter()

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
     
      if (jsonValue) {
        setCurrentUser(jsonValue)
      }
      return jsonValue
    } catch (e) {
      // error reading value

      console.log('error', e)
    }
  }


  function parseJwt (token) {
    
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');

        const user = JSON.parse(userData)
        if (!user) {
          router.push('login');
        } else {
           
          // Décodez le jeton pour obtenir la date d'expiration
          const decodedToken = jwt_decode(user.jwt);
          const expirationTime = decodedToken.exp;

          // Vérifiez si le jeton est expiré
          if (new Date(expirationTime * 1000) < new Date()) {
            router.push('login');
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
        router.push('login');
      }
    };

    checkTokenValidity();
  }, []);
   

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return  <>{ children}</>;
};

export default ProtectedRoute;
