import React from "react";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";

type Props = {
  children?: JSX.Element;
  showModal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, showModal, setModal }: Props) => {
  return (
    <View style={tw`w-full h-full bg-black ${showModal ? "flex" : "hidden"}`}>
      <View style={tw`w-4/5 p-8 bg-white items-center`}>{children}</View>
    </View>
  );
};

export default Modal;
