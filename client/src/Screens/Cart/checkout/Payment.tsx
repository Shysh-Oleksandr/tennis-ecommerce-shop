import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../../../shared/UI/Button";

const methodsData: RadioButtonProps[] = [
  { label: "Cash on Delivery", id: "1", selected: true },
  { label: "Bank Transfer", id: "2" },
  { label: "Card Payment", id: "3" },
];
const paymentCards: RadioButtonProps[] = [
  { label: "Wallet", id: "1" },
  { label: "Visa", id: "2" },
  { label: "MasterCard", id: "3" },
  { label: "Other", id: "4" },
];

type Props = {
  route: any;
  navigation: any;
};

const Payment = (props: Props) => {
  const order = props.route.params;

  const [methods, setMethods] = useState(methodsData);
  const [selectedMethod, setSelectedMethod] = useState<RadioButtonProps>(
    methodsData[0]
  );
  const [selectedCard, setSelectedCard] = useState<RadioButtonProps>();

  const onMethodPress = (radioBtns: RadioButtonProps[]) => {
    setSelectedMethod(
      radioBtns.find((button) => button.selected) || methodsData[0]
    );
    setMethods(radioBtns);
  };

  const confirmPayment = () => {
    props.navigation.navigate("Confirm", { order: order });
  };

  return (
    <View style={tw`mx-8 justify-between flex-1`}>
      <View>
        <Text style={tw`text-2xl text-center mt-3 font-semibold`}>
          Choose your payment method
        </Text>
        <View>
          <RadioGroup
            containerStyle={tw`mt-4 items-start`}
            radioButtons={methods}
            onPress={onMethodPress}
          />
          {selectedMethod.id === "3" && (
            <SelectDropdown
              data={paymentCards}
              defaultValue={selectedCard}
              renderDropdownIcon={(selectedItem, index) => (
                <Icon name="angle-down" size={28} />
              )}
              onSelect={(selectedItem, index) => {
                setSelectedCard(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.label;
              }}
              rowTextForSelection={(item) => {
                return item.label;
              }}
              buttonStyle={tw`w-full mx-auto bg-white h-12 mt-5 shadow-lg rounded-md px-2 py-1`}
            />
          )}
        </View>
      </View>

      <Button
        text="Confirm"
        className={tw`mb-6`}
        onPress={() => confirmPayment()}
      />
    </View>
  );
};

export default Payment;
