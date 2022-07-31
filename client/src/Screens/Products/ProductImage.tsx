import React from "react";
import { Image } from "react-native";
import { EMULATOR_API } from "../../constants";

type Props = {
  image: string;
  styles?: any;
};

export const formatImageUrl = (url: string) => {
  return url.replace("localhost", EMULATOR_API);
};

const ProductImage = ({ image, styles }: Props) => {
  return (
    <Image
      resizeMode="contain"
      style={[styles, { backgroundColor: "transparent" }]}
      source={{ uri: formatImageUrl(image) }}
    />
  );
};

export default ProductImage;
