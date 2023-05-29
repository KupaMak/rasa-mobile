import React, { useState } from "react";
import {
    Button,
    Center,
    HStack,
    Icon,
    Image,
    Input,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Select,
    Text,
    TextArea,
    View,
    AlertDialog
} from "native-base";
import * as ImagePicker from 'expo-image-picker'
import { Formik } from "formik";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { addProductValidationSchema } from "../../functions";
import ModalC from '../auth/Modal'
import { useSelector } from "react-redux";
import { API, BASE_URL } from "../../settings/config";
import AlertInfo from "../cart/AlertInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditStoreProduct = ({ item }) => {
    const [editItem] = useState(item)
    const [image_1, setImageOne] = useState(null)
    const [image_2, setImageTwo] = useState(null)
    const [image_3, setImageThree] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const { category } = useSelector(state => state.main)
    const [imageError, setImageError] = useState(null)
    const [openAlert, setOpenAlert] = useState(false)
    const [message, setMessage] = useState(null)


    //form values initials
    const initialValues = {
        name: editItem.name,
        description: editItem.description,
        condition: editItem.condition,
        price: editItem.price,
        currency: editItem.currency,
        quantity: editItem.quantity,
        category: editItem.category.id
    }

    const pickImageOne = async () => {

        let { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,


        })


        if (!canceled) {


            setImageOne(assets[0].uri);

        }

    }

    const pickImageTwo = async () => {
        let { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,


        })


        if (!canceled) {


            setImageTwo(assets[0].uri);

        }

    }


    const pickImageThree = async () => {
        let { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,


        })


        if (!canceled) {


            setImageThree(assets[0].uri);

        }

    }


    //on submit

    const onSubmit = async ({ name, description, condition, price, currency, quantity, category }) => {


        try {

            setOpenModal(true)

            const accessToken = await AsyncStorage.getItem("access_token")
            const user = JSON.parse(await AsyncStorage.getItem("user"))


            const formData = new FormData()

            formData.append("user", user.id);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("condition", condition);
            formData.append("price", price);
            formData.append("currency", currency);
            formData.append("quantity", quantity);
            formData.append("name", name);
            formData.append("sold", "false");

            //return the images form when images are picked

            if (image_1 !== null) {
                formData.append('image_1', {
                    uri: image_1,
                    name: 'image.jpg',
                    type: 'image/jpeg',

                })
            } else if (image_1 !== null) {
                formData.append('image_2', {
                    uri: image_2,
                    name: 'image.jpg',
                    type: 'image/jpeg',

                })
            } else if (image_3 !== null) {

                formData.append('image_3', {
                    uri: image_3,
                    name: 'image.jpg',
                    type: 'image/jpeg',

                })

            }






            const request = await fetch(`${API.PRODUCT}/${editItem.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data;',
                    'Authorization': `JWT ${accessToken}`,

                },
                body: formData,


            })


            const response = await request.json()
            setOpenModal(false)

            if (response.updated) {

                setOpenAlert(true)
                setMessage('Product was updated 🎉.')

            } else if (!response.updated) {
                setOpenAlert(true)
                setMessage('Failed to add product to store 😑.')
            }
            setOpenModal(false)
        } catch (error) {


            setOpenModal(false)
            setOpenAlert(true)
            setMessage("We couldn't connect to Rasa.Make sure you're connected to the internet and try again.😑.")
        }
    }


    return (

        <>



            <AlertDialog
                isOpen={openAlert}
                motionPreset="fade"

            >
                <AlertDialog.Content>
                    <AlertDialog.Header fontSize="lg" fontWeight="bold" fontFamily='InterRegular'>
                        Message
                    </AlertDialog.Header>
                    <AlertDialog.CloseButton onPress={() => setOpenAlert(false)} _pressed={{ bg: 'gray.100' }} />

                    <AlertDialog.Body fontFamily='InterLight'>
                        {message}
                    </AlertDialog.Body>

                </AlertDialog.Content>
            </AlertDialog>

            <Formik
                initialValues={initialValues}
                onSubmit={(values) => onSubmit({ ...values })}
                validationSchema={addProductValidationSchema}
                validateOnChange={false}



            >
                {
                    ({ handleChange, handleSubmit, errors, values, setFieldValue }) => (
                        <>
                            <ScrollView>
                                <KeyboardAvoidingView enabled={true} behavior='padding'>

                                    <HStack mt={4} w='24' space='3' ml='5'>
                                        {image_1 !== null || editItem.image_1 !== null ?
                                            <Pressable onPress={pickImageOne} w="24" h='24'>
                                                <Image source={{ uri: image_1 || BASE_URL + editItem.image_1 }} rounded='md' w="full" h='24'
                                                    resizeMode="cover"
                                                    alt='Ok'
                                                    resizeMethod='resize' bg='white' />
                                            </Pressable> :
                                            <Pressable w='24' h='24' rounded='md' bg='coolGray.100'
                                                onPress={pickImageOne}>
                                                <Center>
                                                    <Icon as={Feather} name="camera" size='8' mt={7} />
                                                </Center>

                                            </Pressable>


                                        }


                                        {image_2 !== null || editItem.image_2 !== null ?
                                            <Pressable onPress={pickImageTwo} w="24" h='24'>
                                                <Image source={{ uri: image_2 || BASE_URL + editItem.image_2 }} rounded='md' w="full" h='24'
                                                    resizeMode="cover"
                                                    alt='Ok'
                                                    resizeMethod='resize' bg='white' />
                                            </Pressable>
                                            :
                                            <Pressable w='24' h='24' rounded='md' bg='coolGray.100'
                                                onPress={pickImageTwo}>
                                                <Center>
                                                    <Icon as={Feather} name="camera" size='8' mt={7} />
                                                </Center>

                                            </Pressable>}

                                        {image_3 !== null || editItem.image_3 !== null ?
                                            <Pressable onPress={pickImageThree} w="24" h='24'>
                                                <Image source={{ uri: image_3 || BASE_URL + editItem.image_3 }} rounded='md' w="full" h='24'
                                                    resizeMode="cover"
                                                    alt='Ok'
                                                    resizeMethod='resize' bg='white' />
                                            </Pressable> :
                                            <Pressable w='24' h='24' rounded='md' bg='coolGray.100'
                                                onPress={pickImageThree}>
                                                <Center>
                                                    <Icon as={Feather} name="camera" size='8' mt={7} />
                                                </Center>

                                            </Pressable>}

                                    </HStack>
                                    <Text fontFamily="InterLight" style={{ color: "red" }} ml={5} mt={1}>{imageError}</Text>
                                    <Input
                                        autoCorrect={false}
                                        autoComplete="off"
                                        ml={4}
                                        InputLeftElement={
                                            <View ml='2'>
                                                <Icon as={MaterialCommunityIcons} name="pencil" size={5}
                                                    color='coolGray.400' />
                                            </View>

                                        }
                                        fontFamily='InterLight'
                                        fontSize={14}
                                        placeholder="Name"
                                        variant='outlined'
                                        bg="coolGray.100"
                                        type="text"
                                        mt={5}
                                        width="90%"
                                        rounded="full"
                                        defaultValue={editItem.name}
                                        focusOutlineColor='none'
                                        onChangeText={handleChange("name")}
                                    />
                                    <Text fontFamily="InterLight" style={{ color: "red" }} mt={1}
                                        ml={5}>{errors.name}</Text>
                                    <TextArea
                                        autoCorrect={false}
                                        autoComplete="off"
                                        ml={4}
                                        InputLeftElement={
                                            <View ml='2'>
                                                <Icon as={MaterialCommunityIcons} name="information" size={5}
                                                    color='coolGray.400' />
                                            </View>

                                        }
                                        fontFamily='InterLight'
                                        fontSize={14}
                                        placeholder="Description"
                                        variant='outlined'
                                        bg="coolGray.100"
                                        type="text"
                                        defaultValue={editItem.description}
                                        width="90%"
                                        rounded="md"
                                        focusOutlineColor='none'
                                        onChangeText={handleChange("description")}
                                    />
                                    <Text fontFamily="InterLight" style={{ color: "red" }} mt={1}
                                        ml={5}>{errors.description}</Text>
                                    <Select
                                        placeholder='Currency'
                                        placeholderTextColor='gray.400'
                                        dropdownIcon={<View mr='3' alignItems="flex-start">
                                            <Icon as={MaterialCommunityIcons} name="cash" size={5}
                                                color='coolGray.400' />
                                        </View>}
                                        width="63%"
                                        bg='coolGray.100'
                                        variant="outlined"
                                        ml={4}
                                        mt={2}
                                        fontFamily='InterLight'
                                        fontSize={14}
                                        rounded="full"
                                        defaultValue={editItem.currency}
                                        onValueChange={handleChange("currency")}


                                    >
                                        <Select.Item rounded='md' _pressed={{ bg: 'gray.100' }} label="USD" value="USD" fontFamily='InterSemiBold' />
                                        <Select.Item rounded='md' _pressed={{ bg: 'gray.100' }} label="ZWL" value="ZWL" />
                                    </Select>
                                    <Text fontFamily="InterLight" style={{ color: "red" }} mt={1}
                                        ml={5}>{errors.currency}</Text>

                                    <Input
                                        autoCorrect={false}
                                        autoComplete="off"
                                        keyboardType="number-pad"
                                        ml={4}
                                        InputLeftElement={
                                            <View ml='2'>
                                                <Icon as={MaterialCommunityIcons} name="currency-usd" size={5}
                                                    color='coolGray.400' />
                                            </View>

                                        }
                                        fontFamily='InterLight'
                                        fontSize={14}
                                        placeholder="Price"
                                        variant='outlined'
                                        bg="coolGray.100"
                                        type="text"
                                        defaultValue={editItem.price}
                                        mt={2}
                                        width="60%"
                                        rounded="full"
                                        focusOutlineColor='none'
                                        onChangeText={handleChange("price")}
                                    />
                                    <Text fontFamily="InterLight" style={{ color: "red" }} mt={1}
                                        ml={5}>{errors.price}</Text>
                                    <Select
                                        placeholder='Category'
                                        placeholderTextColor='gray.400'
                                        dropdownIcon={<View mr='3' alignItems="flex-start">
                                            <Icon as={MaterialCommunityIcons} name="form-select" size={5}
                                                color='coolGray.400' />
                                        </View>}
                                        width="63%"
                                        bg='coolGray.100'
                                        variant="outlined"
                                        ml={4}
                                        defaultValue={editItem.category.id}
                                        fontFamily='InterLight'
                                        fontSize={14}
                                        rounded="full"
                                        mt={2}
                                        onValueChange={(value) => setFieldValue('category', value)}

                                    >
                                        {


                                            category.map(item => <Select.Item rounded='md' _pressed={{ bg: 'gray.100' }} key={item.id}
                                                value={item.name === 'All' ? '' : item.id}
                                                label={item.name === 'All' ? '' : item.name} />
                                            )
                                        }


                                    </Select>

                                    <Select
                                        placeholder='Condition'
                                        placeholderTextColor='gray.400'
                                        dropdownIcon={<View mr='3' alignItems="flex-start">
                                            <Icon as={MaterialCommunityIcons} name="new-box" size={5}
                                                color='coolGray.400' />
                                        </View>}
                                        width="63%"
                                        bg='coolGray.100'
                                        variant="outlined"
                                        ml={4}
                                        mt={4}
                                        fontFamily='InterLight'
                                        fontSize={14}
                                        rounded="full"
                                        defaultValue={editItem.condition}
                                        onValueChange={handleChange("condition")}


                                    >
                                        <Select.Item rounded='md' _pressed={{ bg: 'gray.100' }} label="New" value="New" fontFamily='InterSemiBold' />
                                        <Select.Item rounded='md' _pressed={{ bg: 'gray.100' }} label="Old" value="Old" />
                                    </Select>
                                    <Text fontFamily="InterLight" style={{ color: "red" }} mt={1}
                                        ml={5}>{errors.condition}</Text>
                                    <Input

                                        keyboardType='number-pad'
                                        ml={4}
                                        InputLeftElement={
                                            <View ml='2'>
                                                <Icon as={MaterialCommunityIcons} name="format-list-numbered" size={5}
                                                    color='coolGray.400' />
                                            </View>

                                        }
                                        fontFamily='InterLight'
                                        fontSize={14}
                                        placeholder="Quantity"
                                        variant='outlined'
                                        bg="coolGray.100"
                                        type="text"
                                        defaultValue={editItem.quantity.toLocaleString()}
                                        mt={2}
                                        width="60%"
                                        rounded="full"
                                        focusOutlineColor='none'
                                        onChangeText={handleChange("quantity")}
                                    />
                                    <Text fontFamily="InterLight" style={{ color: "red" }} mt={1}
                                        ml={5}>{errors.quantity}</Text>


                                </KeyboardAvoidingView>
                            </ScrollView>
                            <Center mt={5} px={6} bottom='0' right='0' left='0'>
                                <Button
                                    w="full"
                                    h={10}
                                    rounded="full"
                                    bg="#3699D6"

                                    mb={4}
                                    _pressed={{
                                        bg: 'blue.200'
                                    }}
                                    onPress={handleSubmit}
                                    focusable={true}

                                >
                                    <Text fontFamily="InterSemiBold" color="white">UPDATE</Text>
                                </Button>

                            </Center>
                        </>


                    )
                }

            </Formik>
            <ModalC isOpen={openModal} text='Updating product' />
        </>
    )
}

export default EditStoreProduct