import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import tw from "tailwind-react-native-classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { API_URL } from "../../constants";
import { loginUser } from "../../features/user/userSlice";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import Button from "../../shared/UI/Button";
import ErrorText from "../../shared/UI/ErrorText";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  navigation: any;
};

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { loading, user } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  useFocusEffect(() => {
    if (user._id) {
      props.navigation.navigate("User Profile");
    }
  });

  const handleSubmit = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setError("Please fill in all the fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    dispatch(
      loginUser({
        email: email,
        password: password,
        setError: setError,
        navigation: props.navigation,
      })
    );
  };

  return (
    <FormContainer title="Login">
      <View style={tw`justify-between w-full flex-1`}>
        <View style={tw`w-full`}>
          <Input
            onFocus={() => setError("")}
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
          <ErrorText error={error} />
          <View style={tw`w-full`}>
            <Button
              disabled={loading}
              text="Login"
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
        <View style={tw`mt-8 items-center w-full mb-4`}>
          <Button
            text="Register"
            className={tw`mb-2 bg-blue-400`}
            onPress={() => props.navigation.navigate("Register")}
          />
          <Pressable onPress={() => props.navigation.navigate("Register")}>
            <Text style={tw`text-center text-lg text-gray-600 underline`}>
              Don't have an account
            </Text>
          </Pressable>
        </View>
      </View>
    </FormContainer>
  );
};

export default Login;
