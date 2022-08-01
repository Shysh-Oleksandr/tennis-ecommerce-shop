import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormContainer from "../../shared/Form/FormContainer";
import tw from "tailwind-react-native-classnames";
import Input from "../../shared/Form/Input";
import SelectDropdown from "react-native-select-dropdown";
import { useFetchData } from "./../../hooks/useFetchData";
import ICategory from "./../../interfaces/category";
import { API_URL } from "../../constants";
import Button from "../../shared/UI/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import ErrorText from "../../shared/UI/ErrorText";
import { Checkbox } from "native-base";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";
import Toast from "react-native-toast-message";
import mime from "mime";

type Props = { navigation: any };

const ProductForm = (props: Props) => {
  const { token } = useAppSelector((store) => store.user);
  const [categories, categoryLoading] = useFetchData<ICategory>(
    "GET",
    `${API_URL}/categories`,
    "categories"
  );

  const categoriesData = categories.map((category) => {
    return { label: category.name, id: category._id };
  });

  const [image, setImage] = useState<string>("");
  const [mainimage, setMainImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [richDescription, setRichDescription] = useState<string>("");
  const [countInStock, setCountInStock] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [numReviews, setNumReviews] = useState<number>(0);
  const [isFeatured, setIsFeatured] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("To make this work, please provide camera permission.");
        }
      }
    })();
  }, []);

  const addProduct = () => {
    if (
      mainimage === "" ||
      category === "" ||
      brand === "" ||
      name === "" ||
      price === 0 ||
      description === "" ||
      rating === 0
    ) {
      setError("Please fill in the form correctly");
    }

    let formData = new FormData();

    // formData.append("image", {
    // 	type: mime.getType(image)!,
    // 	name: image.split('/').pop()
    // 	uri: image,
    // });
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("description", description);
    formData.append("richDescription", richDescription);
    formData.append("countInStock", countInStock.toString());
    formData.append("rating", rating.toString());
    formData.append("numReviews", numReviews.toString());
    formData.append("isFeatured", isFeatured.toString());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${API_URL}/products/create`, formData, config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "New Product added.",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong.",
        });
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  return (
    <FormContainer title="Add Product">
      <>
        <View style={tw`w-full`}>
          <View
            style={tw`items-center justify-center rounded-full w-48 h-48 mx-auto border-4 border-gray-300 p-0`}
          >
            {mainimage ? (
              <Image
                source={{ uri: mainimage }}
                style={tw`w-full h-full rounded-full`}
              />
            ) : null}
            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.7}
              style={tw`absolute bottom-2 right-2 p-2 bg-gray-500 rounded-full `}
            >
              <Icon name="camera" style={tw`text-white`} size={18} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Name</Text>
            <Input
              value={name.toString()}
              className={tw`mt-1`}
              onChangeText={(text) => setName(text)}
              placeholder="Name"
            />
          </View>

          <View>
            <Text style={tw`text-xl font-semibold`}>Description</Text>
            <Input
              value={description}
              className={tw`mt-1`}
              onChangeText={(text) => setDescription(text)}
              placeholder="Description"
            />
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Rich description</Text>
            <Input
              value={richDescription}
              className={tw`mt-1`}
              onChangeText={(text) => setRichDescription(text)}
              placeholder="Rich description"
            />
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Brand</Text>
            <Input
              value={brand}
              className={tw`mt-1`}
              onChangeText={(text) => setBrand(text)}
              placeholder="Brand"
            />
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Price</Text>
            <Input
              value={price.toString()}
              className={tw`mt-1`}
              onChangeText={(text) => setPrice(Number(text))}
              placeholder="Price"
            />
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Count in Stock</Text>
            <Input
              value={countInStock.toString()}
              className={tw`mt-1`}
              onChangeText={(text) => setCountInStock(Number(text))}
              placeholder="Count in Stock"
            />
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Rating</Text>
            <Input
              value={rating.toString()}
              className={tw`mt-1`}
              onChangeText={(text) => setRating(Number(text))}
              placeholder="Rating"
            />
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Number of Reviews</Text>
            <Input
              value={numReviews.toString()}
              className={tw`mt-1`}
              onChangeText={(text) => setNumReviews(Number(text))}
              placeholder="Number of Reviews"
            />
          </View>
          <View>
            <Checkbox
              value={isFeatured.toString()}
              onChange={(isSelected) => setIsFeatured(isSelected)}
            >
              Featured
            </Checkbox>
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Category</Text>
            <SelectDropdown
              data={categoriesData}
              onSelect={(selectedItem, index) => {
                setCategory(selectedItem.label);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.label;
              }}
              rowTextForSelection={(item, index) => {
                return item.label;
              }}
              buttonStyle={tw`w-full bg-white h-16 my-2 rounded-2xl p-3 border-2 border-blue-500`}
            />
          </View>
          <ErrorText error={error} />
          <Button text="Add" onPress={addProduct} className={tw`my-3`} />
        </View>
      </>
    </FormContainer>
  );
};

export default ProductForm;
