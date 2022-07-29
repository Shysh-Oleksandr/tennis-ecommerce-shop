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
      style={tw`w-full bg-white h-16 my-3 shadow-md text-xl rounded-2xl p-3 border-2 border-blue-500`}
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
