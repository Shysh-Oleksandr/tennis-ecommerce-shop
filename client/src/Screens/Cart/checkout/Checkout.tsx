import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import tw from "tailwind-react-native-classnames";
import { v4 } from "uuid";
import countries from "../../../../assets/countries.json";
import { useAppSelector } from "../../../app/hooks";
import IOrder from "../../../interfaces/order";
import FormContainer from "../../../shared/Form/FormContainer";
import Input from "../../../shared/Form/Input";
import Button from "../../../shared/UI/Button";
import { getTotalPrice } from "./../Cart";
type Props = {
  navigation: any;
};

const Checkout = (props: Props) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const [address, setAddress] = useState<string>("London, Backer St. 221b");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("London");
  const [zip, setZip] = useState<string>("78419");
  const [country, setCountry] = useState<string>("Albania");
  const [phone, setPhone] = useState<string>("175649889");

  const checkOut = () => {
    const order: IOrder = {
      city,
      country,
      dateCreated: Date.now(),
      phone: Number(phone),
      zip,
      shippingAddress1: address,
      shippingAddress2: address2,
      orderItems: cartItems,
      totalPrice: getTotalPrice(cartItems),
      _id: Math.random().toString(), //v4(),
    };

    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={100}
      enableOnAndroid={true}
    >
      <FormContainer title="Shipping Address">
        <>
          <Input
            placeholder="Phone"
            value={phone}
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
          />
          <Input
            placeholder="Shipping Address 1"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <Input
            placeholder="Shipping Address 2"
            value={address2}
            onChangeText={(text) => setAddress2(text)}
          />
          <Input
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <Input
            placeholder="Zip Code"
            value={zip}
            keyboardType="numeric"
            onChangeText={(text) => setZip(text)}
          />
          <SelectDropdown
            data={countries}
            searchPlaceHolder={"Country"}
            defaultValue={country}
            onSelect={(selectedItem, index) => {
              setCountry(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            search={true}
            buttonStyle={tw`w-full bg-white h-16 m-3 rounded-md p-3 border-2 border-gray-500`}
          />
          <Button text="Confirm" onPress={() => checkOut()} />
        </>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Checkout;
