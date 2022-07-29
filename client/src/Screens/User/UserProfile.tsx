import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import IUser from "./../../interfaces/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import tw from "tailwind-react-native-classnames";
import Button from "../../shared/UI/Button";
import { useAppDispatch } from "./../../app/hooks";
import { logout } from "../../features/user/userSlice";

type Props = {
  navigation: any;
};

const UserProfile = ({ navigation }: Props) => {
  const { user } = useAppSelector((store) => store.user);
  const [userProfile, setUserProfile] = useState<IUser>(user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user._id) {
      navigation.navigate("Login");
    }

    // AsyncStorage.getItem('jwt').then(res => {
    // 	axios.ge
    // })
  }, [user._id]);

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <View style={tw`w-full`}>
      <ScrollView
        contentContainerStyle={tw`w-4/5 mx-auto h-full justify-between py-6`}
      >
        <View style={tw`w-full`}>
          <Text
            style={tw`text-center text-3xl font-bold capitalize bg-gray-200 py-2`}
          >
            Profile
          </Text>
          <View style={tw`mb-5`}>
            <Text style={tw`shadow-lg bg-white py-3 px-4 text-xl`}>
              <Text style={tw`font-semibold`}>Name:</Text> {userProfile.name}
            </Text>
            <Text style={tw`shadow-lg bg-white py-3 px-4 text-xl`}>
              <Text style={tw`font-semibold`}>Email:</Text> {userProfile.email}
            </Text>
            <Text style={tw`shadow-lg bg-white py-3 px-4 text-xl`}>
              <Text style={tw`font-semibold`}>Phone:</Text> {userProfile.phone}
            </Text>
          </View>
        </View>
        <Button text="Log out" onPress={logoutUser} />
      </ScrollView>
    </View>
  );
};

export default UserProfile;
