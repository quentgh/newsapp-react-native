import { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Btn from "../../ui/Btn/Btn";
import { AntDesign } from "@expo/vector-icons";
import InputWithError from "../../ui/InputWithError/InputWithError";
import { color } from "../../styles/color";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
  getEmailError,
  getPasswordError,
  getConfirmPasswordError,
  getUsernameError,
} from "../../utils/validations";
import { signUpWithEmailAndPassword } from "../../utils/requests/authentifications";
import { UserContext } from "../contexts/UserContext";

export default function SignUpForm() {
  const { setUtilisateur } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [usernameError, setUsernameError] = useState();

  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState();

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState();

  const [confirmPwd, setConfirmPwd] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState();

  function handleEmail(txt) {
    return setEmailInput(txt);
  }

  function handleUsername(txt) {
    return setUsernameInput(txt);
  }

  function handlePassword(txt) {
    return setPasswordInput(txt);
  }

  function handleConfirmPwd(txt) {
    return setConfirmPwd(txt);
  }

  function signUp() {
    setEmailError(getEmailError(emailInput));
    setPasswordError(getPasswordError(passwordInput));
    setConfirmPwdError(getConfirmPasswordError(passwordInput, confirmPwd));

    setUsernameError("");

    setUsernameError(getUsernameError(usernameInput));

    if (
      validateEmail(emailInput) &&
      validatePassword(passwordInput) &&
      validateConfirmPassword(confirmPwd, passwordInput) &&
      validateUsername(usernameInput)
    ) {
      signUpWithEmailAndPassword(emailInput, usernameInput, passwordInput).then(
        (data) => {
          setUtilisateur(data);
        }
      );
    }
  }

  return (
    <View>
      <Text style={styles.title}>Sign Up form</Text>
      <InputWithError
        value={usernameInput}
        onChangeText={handleUsername}
        placeholder="username"
        keyboardType="email-address"
        errorMsg={usernameError}
      ></InputWithError>
      <InputWithError
        value={emailInput}
        onChangeText={handleEmail}
        placeholder="email"
        keyboardType="email-address"
        errorMsg={emailError}
      ></InputWithError>
      <InputWithError
        isPassword={true}
        value={passwordInput}
        onChangeText={handlePassword}
        placeholder="password"
        keyboardType="default"
        errorMsg={passwordError}
      ></InputWithError>
      <InputWithError
        isPassword={true}
        value={confirmPwd}
        onChangeText={handleConfirmPwd}
        placeholder="password"
        keyboardType="default"
        errorMsg={confirmPwdError}
      ></InputWithError>
      <Btn action={signUp} label={"Inscription"}>
        <AntDesign name="login" size={24} color={color.lightColor} />
      </Btn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },

  title: {
    padding: 10,
    fontSize: 20,
  },
});
