import React from 'react'
import { View, Text, VStack, Select, Input, Button, KeyboardAvoidingView, } from 'native-base'
import { Formik } from 'formik'
import { Feather } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../settings/config';
import { additionalInfoValidationSchema } from '../../functions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OtherDetails = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.auth)


    const onSubmit = async ({ whatsapp_number, gender, address }) => {

        dispatch(authAction.openModal(true))





        try {

            //getting id from storage
            let id = await AsyncStorage.getItem("id")

            id = JSON.parse(id)

            //getting user JWToken
            const access_token = await AsyncStorage.getItem("access_token")

            const JWT = JSON.parse(access_token)

            const formData = {
                user: id,
                whatsapp_number: whatsapp_number,
                gender: gender,
                address: address
            }





            //make a request to the API with token 
            const request = await fetch(`${API.CUSTOMER}/`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JWT}`
                }
            })


            const response = await request.json()

            const user = JSON.stringify(response.data)

            if (response.valid) {

                try {

                    await AsyncStorage.setItem("user", user)

                    dispatch(authAction.openModal(false))
                    dispatch(authAction.setIsLogged(true))

                    //handle execption
                } catch (error) {

                    dispatch(authAction.openModal(false))
                    dispatch(authAction.setOtherError("Failed To shop Values"))


                }





            } else {

                dispatch(authAction.openModal(false))
                dispatch(authAction.setOtherError("Invalid Information"))
            }



        } catch (error) {

            dispatch(authAction.openModal(false))
            dispatch(authAction.setOtherError("We couldn't connect to Rasa.Make sure you're connected to the internet and try again."))


        }



    }




    return (
        <KeyboardAvoidingView>
            <View mt={10}>
                <Text fontFamily='InterSemiBold' fontSize={32} mx={5} mt={1}>Additional Information</Text>
            </View>

            <Formik
                initialValues={{ whatsapp_number: '', gender: '', address: '' }}
                onSubmit={(values) => onSubmit(values)}
                validationSchema={additionalInfoValidationSchema}
            >

                {
                    ({ handleChange, handleSubmit, errors, }) => (
                        <VStack>


                            <Input
                                autoCorrect={false}
                                autoComplete="off"
                                ml={4}
                                InputLeftElement={<Feather name="phone" size={20} />}
                                fontFamily='InterRegular'
                                fontSize={14}
                                placeholder="WHATSAPP NUMBER"
                                keyboardType='number-pad'
                                type="text"
                                mt={5}
                                width="90%"
                                bgColor="white"
                                rounded="full"
                                focusOutlineColor='none'
                                onChangeText={handleChange("whatsapp_number")}
                            />
                            <Input
                                autoCorrect={false}
                                autoComplete="off"
                                ml={4}
                                InputLeftElement={<Feather name="home" size={20} />}
                                fontFamily='InterRegular'
                                fontSize={14}
                                placeholder="ADDRESS"
                                type="text"
                                mt={5}
                                width="90%"
                                bgColor="white"
                                rounded="full"
                                focusOutlineColor='none'
                                onChangeText={handleChange("address")}

                            />





                            <Select
                                placeholder='Gender'
                                placeholderTextColor='black'
                                width="95%"
                                mt={5}
                                ml={4}
                                fontFamily='InterRegular'
                                fontSize={14}
                                rounded="full"
                                onValueChange={handleChange("gender")}
                                colorScheme='white'


                            >
                                <Select.Item label="Female" value="Female" />
                                <Select.Item label="Male" value="Male" />
                                <Select.Item label="Custom" value="Custom" />
                                <Select.Item label="Rather not to say" value="Rather not to say" />
                            </Select>









                            <Text fontFamily="InterLight" style={{ color: "red" }} mt={1} ml={4}>{errors.whatsapp_number || errors.address}</Text>

                            <Text fontFamily="InterLight" style={{ color: "red" }} mt={1} ml={4}>{errors.gender || data.othererror}</Text>

                            <View alignItems="flex-end">

                                <Button
                                    w="35%"
                                    rounded="full"
                                    bg="#3699D6"
                                    mr={10}
                                    mt={3}
                                    onPress={handleSubmit}
                                    focusable={true}


                                    rightIcon={<Feather name="arrow-right" size={23} color="white" />}

                                >
                                    <Text fontFamily="InterSemiBold" color="white">FINISH</Text>
                                </Button>

                            </View>


                        </VStack>
                    )
                }


            </Formik>
        </KeyboardAvoidingView>
    )
}

export default OtherDetails;