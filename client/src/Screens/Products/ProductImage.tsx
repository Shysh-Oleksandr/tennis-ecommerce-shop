import React from "react";
import { Image } from "react-native";
import { EMULATOR_API } from "../../constants";

type Props = {
  image: string;
  styles: any;
};

const ProductImage = ({ image, styles }: Props) => {
  return (
    <Image
      resizeMode="contain"
      style={styles}
      source={{ uri: image.replace("localhost", EMULATOR_API) }}
    />
  );
};

export default ProductImage;
