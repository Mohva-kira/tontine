import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const router = useRouter()

  return (
    <View >
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) =>
         { setSelectedValue(itemValue); router.push(`/${itemValue}`) }

        }>
        <Picker.Item style={styles.pickerText} label="Créer une tontine" value="addTontine" />
        <Picker.Item style={styles.pickerText} label="Liste de tontines" value="liste" />
        {/* <Picker.Item label="Mes " value="option3" /> */}
      </Picker>
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

      pickerText: {
        fontSize: 20,
        color: "#333",

      },
})

export default Dropdown;