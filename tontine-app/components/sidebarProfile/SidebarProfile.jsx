import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SidebarProfile = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleNavigate = (screenName) => {
    setIsOpen(false);
    router.push(`/${screenName}`);
  };

  const logOut = () => {
    setIsOpen(false);
    AsyncStorage.removeItem('@user')
    router.push('/login')

  }

  return (
    <View style={[styles.container, { left: isOpen ? 0 : -200 }]}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setIsOpen(false)}
      >
        <AntDesign
          style={styles.closeButtonText}
          name="close"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("/profile/1")}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={logOut}
      >
        <Text style={styles.buttonText}>Deconnexion</Text>
      </TouchableOpacity>

      {/* <Collapsible collapsed={isCollapsed}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate("addTontine")}
        >
          <Text style={styles.collapseButtonText}>Créer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate("tontineList")}
        >
          <Text style={styles.collapseButtonText}>Liste des tontines</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate("accountList")}
        >
          <Text style={styles.collapseButtonText}>Mes tontines</Text>
        </TouchableOpacity>
      </Collapsible> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>  handleNavigate("transactionsList")}
      >
        <Text style={styles.buttonText}>Mes Transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 200,
    backgroundColor: "#fff",
    padding: 20,
    zIndex: 999,
    elevation: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#999",
  },
  button: {
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#333",
  },
  collapseButtonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
});

export default SidebarProfile;
