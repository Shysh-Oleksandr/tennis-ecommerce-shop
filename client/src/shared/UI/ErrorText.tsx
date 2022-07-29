import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

type Props = { error: string };

const ErrorText = ({ error }: Props) => {
  if (!error) return null;

  return (
    <Text style={tw`text-base text-red-500 font-semibold text-center`}>
      {error}
    </Text>
  );
};

export default ErrorText;
