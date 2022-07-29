import axios from "axios";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import tw from "tailwind-react-native-classnames";
import { API_URL } from "../../constants";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import Button from "../../shared/UI/Button";
import ErrorText from "../../shared/UI/ErrorText";
import Toast from "react-native-toast-message";

type Props = {
  navigation: any;
};

const Register = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [registering, setRegistering] = useState(false);

  async function registerNewUser() {
    setRegistering(true);
    try {
      const response = await axios({
        method: "POST",
        url: `${API_URL}/users/register`,
        data: {
          name,
          email,
          password,
          phone,
        },
      });

      if (response.status === 201) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Registration succeeded",
          text2: "Please, login into your account",
        });
        props.navigation.navigate("Login");
      } else {
        setError("Invalid credentials, try again.");
      }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please, try again",
      });
      console.log("Catch: " + error);
    } finally {
      setTimeout(() => {
        setRegistering(false);
      }, 500);
    }
  }

  const handleSubmit = async () => {
    if (
      email.trim() === "" ||
      name.trim() === "" ||
      phone.trim() === "" ||
      password.trim() === ""
    ) {
      setError("Please fill in all the fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (phone.length < 10) {
      setError("Invalid phone number.");
      return;
    }

    registerNewUser();
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={100}
      enableOnAndroid={true}
    >
      <FormContainer title="Register">
        <View style={tw`justify-between w-full flex-1`}>
          <View style={tw`w-full`}>
            <Input
              placeholder="Enter name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder="Enter email"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input
              placeholder="Enter password"
              value={password}
              onFocus={() => setError("")}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Input
              placeholder="Enter phone number"
              value={phone}
              onFocus={() => setError("")}
              keyboardType="numeric"
              onChangeText={(text) => setPhone(text)}
            />

            <ErrorText error={error} />
            <View style={tw`w-full`}>
              <Button
                disabled={registering}
                text="Register"
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
          <View style={tw`mt-8 items-center w-full mb-4`}>
            <Button
              text="Login"
              className={tw`mb-2 bg-blue-400`}
              onPress={() => props.navigation.navigate("Login")}
            />
            <Pressable onPress={() => props.navigation.navigate("Login")}>
              <Text style={tw`text-center text-lg text-gray-600 underline`}>
                Already have an account
              </Text>
            </Pressable>
          </View>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Register;
