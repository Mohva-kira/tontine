import { TextInput } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: COLORS.primary,
        paddingHorizontal: 10,
        width: '70%',
        height: 60,
        backgroundColor: 'rgb(220, 220, 220)',
        marginVertical: 10,
      
        
      }}
      placeholderTextColor={COLORS.primary}
    ></TextInput>
  );
};

export default Field;
