import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const Popup = ({ children, modalVisible, setModalVisible }) => {
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      {/* <TouchableOpacity onPress={toggleModal}>
        <Text>Afficher la popup</Text>
      </TouchableOpacity> */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: -20, right: 0, padding: 20 }}
            onPress={toggleModal}
          >
            <Text>Fermer</Text>
          </TouchableOpacity>

          <View style={{ backgroundColor: "white", padding: 20, width: "100%", justifyContent: "center", alignItems: "center", }}>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Popup;
