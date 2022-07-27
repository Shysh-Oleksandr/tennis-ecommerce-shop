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

const { width } = Dimensions.get("window");

type Props = {};

const Banner = (props: Props) => {
  const [bannerData, setBannerData] = useState([
    "https://t4.ftcdn.net/jpg/03/90/37/71/360_F_390377167_NYd4Zi29xUAxEFDcVwX8SYSbagv4At8N.jpg",
    "https://img.freepik.com/free-psd/digital-marketing-facebook-banner-template_237398-233.jpg?w=2000",
    "https://images.pexels.com/photos/247671/pexels-photo-247671.jpeg?cs=srgb&dl=pexels-pixabay-247671.jpg&fm=jpg",
  ]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
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
                  source={{ uri: item }}
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
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 5,
  },
  bannerImage: {
    height: width / 3,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
