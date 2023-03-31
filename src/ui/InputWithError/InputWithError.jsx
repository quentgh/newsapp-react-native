import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";

export default function InputWithError({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  errorMsg,
  isPassword,
}) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  function togglePasseword() {
    setIsPasswordHidden(!isPasswordHidden);
  }

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && isPasswordHidden}
        ></TextInput>
        {isPassword && (
          <TouchableOpacity onPress={togglePasseword}>
            <Text style={styles.showPwd}>Show/Hide password</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.error}>{errorMsg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.8,
    borderRadius: 2,
    padding: 10,
  },

  error: {
    padding: 8,
    color: "tomato",
  },

  showPwd: {
    paddingHorizontal: 20,
    display: "flex",
    alignSelf: "flex-end",
  },
});
