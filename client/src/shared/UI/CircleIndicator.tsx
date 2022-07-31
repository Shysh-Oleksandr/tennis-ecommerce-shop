import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

type Props = {
  className: any;
};

const CircleIndicator = ({ className }: Props) => {
  return <View style={[tw`w-6 h-6 rounded-full`, className]}></View>;
};

export default CircleIndicator;
