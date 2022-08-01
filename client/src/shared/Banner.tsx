import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import { formatImageUrl } from "./../Screens/Products/ProductImage";

const { width } = Dimensions.get("window");

type Props = {
  bannerImages: string[];
  className?: any;
};

const Banner = ({ bannerImages, className }: Props) => {
  const [bannerData, setBannerData] = useState(bannerImages);

  return (
    <ScrollView>
      <View style={[styles.container, className]}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: 200 }}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={5}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.bannerImage}
                  resizeMode="contain"
                  source={{ uri: formatImageUrl(item) }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 5,
  },
  bannerImage: {
    height: 150,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
