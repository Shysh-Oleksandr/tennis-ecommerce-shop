import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

type Props = {
  title: string;
  children?: JSX.Element;
};

const FormContainer = (props: Props) => {
  return (
    <ScrollView
      contentContainerStyle={tw`mt-6 w-full pb-4 justify-center items-center`}
    >
      <Text style={tw`text-2xl`}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

export default FormContainer;
