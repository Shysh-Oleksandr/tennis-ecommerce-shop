import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardTypeOptions,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

type Props = {
  placeholder?: string;
  value?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCorrect?: boolean;
  onChangeText?: (text: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

const Input = (props: Props) => {
  return (
    <TextInput
      style={tw`w-full bg-white h-16 m-3 shadow-md rounded-md p-3 border-2 border-gray-500`}
      placeholder={props.placeholder}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      autoCorrect={props.autoCorrect}
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
    ></TextInput>
  );
};

export default Input;
