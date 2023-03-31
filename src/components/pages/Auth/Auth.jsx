import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Card from "../../HOC/Card/Card";
import LoginForm from "../../LoginForm/LoginForm";
import SignUpForm from "../../SignUpForm/SignUpForm";
import { StyleSheet, View, ScrollView, Text } from "react-native";

const card = {
  title: "Welcome !",
  content: "Please log in",
};

export default function Auth() {
  const [login, setIsLogin] = useState(true);

  function toggleLogin() {
    setIsLogin(!login);
  }

  return (
    <ScrollView style={styles.container}>
      <Card title={card.title} content={login ? "Login" : "Subscribe"}>
        {login ? <LoginForm /> : <SignUpForm />}
        <TouchableOpacity style={styles.button} onPress={toggleLogin}>
          <Text>{login ? "Not a member yet ? Subscribe here" : "Login"}</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 300,
  },

  button: {
    alignItems: "center",
    margin: 20,
    padding: 10,
    color: "#333",
  },
});
