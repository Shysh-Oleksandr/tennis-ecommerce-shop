import {
  View,
  Text,
  Pressable,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

type Props = {
  text: string;
  disabled?: boolean;
  className?: any;
  onPress: (event: GestureResponderEvent) => void;
};

const Button = ({ text, onPress, className, disabled }: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        tw`w-full items-center my-4 bg-blue-500 rounded-md py-3 px-4 shadow-lg`,
        className,
      ]}
    >
      <Text style={tw`text-2xl text-white font-semibold`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
