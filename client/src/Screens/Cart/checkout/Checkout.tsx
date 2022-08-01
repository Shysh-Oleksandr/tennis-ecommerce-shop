import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import tw from "tailwind-react-native-classnames";
import countries from "../../../../assets/countries.json";
import { useAppSelector } from "../../../app/hooks";
import IOrder from "../../../interfaces/order";
import FormContainer from "../../../shared/Form/FormContainer";
import Input from "../../../shared/Form/Input";
import Button from "../../../shared/UI/Button";
import ErrorText from "../../../shared/UI/ErrorText";
import { getTotalPrice } from "./../Cart";
type Props = {
  navigation: any;
};

const Checkout = (props: Props) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const { user } = useAppSelector((store) => store.user);
  const [address, setAddress] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [phone, setPhone] = useState<string>(user.phone || "");
  const [error, setError] = useState("");

  const checkOut = () => {
    if (!phone || phone.length < 7 || !address || !city || !country || !zip) {
      setError("Please fill in all the fields.");
      return;
    }
    setError("");
    const order: IOrder = {
      city,
      country,
      dateOrdered: Date.now(),
      phone: phone,
      zip,
      shippingAddress1: address,
      shippingAddress2: address2,
      orderItems: cartItems,
      totalPrice: getTotalPrice(cartItems),
      _id: Math.random().toString(),
    };

    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
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
            buttonStyle={tw`w-full bg-white h-16 m-3 rounded-2xl p-3 border-2 border-blue-500`}
          />
          <ErrorText error={error} />
          <Button
            text="Confirm"
            onPress={() => checkOut()}
            className={tw`my-2`}
          />
        </>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Checkout;
