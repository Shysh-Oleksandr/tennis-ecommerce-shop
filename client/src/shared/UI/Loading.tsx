import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

type Props = {};

const Loading = (props: Props) => {
  return (
    <View style={tw`items-center justify-center flex-1`}>
      <ActivityIndicator size={70} color="blue" />
    </View>
  );
};

export default Loading;
