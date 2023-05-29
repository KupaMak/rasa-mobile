import React,{useState} from 'react'
import { View, Text, VStack, Input, Button } from 'native-base'
import { Formik } from 'formik'
import { Feather } from "@expo/vector-icons"
import * as Yup from "yup";
import { API } from '../../settings/config';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalC from "./Modal";



//yup validation scheme
const validationScheme = Yup.object().shape({
    email: Yup.string().required().email().label("Email")
})


const ForgotPassword = () => {
    //configure dispatch and selector
    const dispatch = useDispatch();
    const data = useSelector(state => state.auth);

    const [openModal, setOpenModal] = useState(false)

    //submit function

    const onSubmit = async (values) => {




        try {

            dispatch(authAction.openModal(true))

            //make a request to the API
            const request = await fetch(`${API.AUTH}/forgot_password/`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            //make request to json
            const response = await request.json()

            const code = JSON.stringify(response.code)


            if (response.sent) {

                try {

                    await AsyncStorage.setItem("code", code)

                    await AsyncStorage.setItem("email", response.email)

                    dispatch(authAction.setError("Yessir"))

                    dispatch(authAction.openModal(false))

                } catch (error) {


                    dispatch(authAction.openModal(false))


                    dispatch(authAction.setError("Storage Error"))

                }


            } else if (response.found === false) {

                dispatch(authAction.openModal(false))

                dispatch(authAction.setError("We couldn't send the verification code because entered email is invalid.Re-enter the correct email and try again."))



            } else {

                dispatch(authAction.openModal(false))

                dispatch(authAction.setError("We couldn't connect to Rasa.Make sure you're connected to the internet and try again."))

            }


        } catch (error) {

            dispatch(authAction.openModal(false))

            dispatch(authAction.setError("We couldn't connect to Rasa.Make sure you're connected to the internet and try again."))


        }
    }

    return (
        <>
            <View mt={10}>
                <Text fontFamily='InterSemiBold' fontSize={32} mx={5} mt={9}>Forgot Password</Text>
                <Text fontFamily='InterRegular' fontSize={18} mx={5} mt={2}>Please enter email for verification</Text>
            </View>

            <Formik
                initialValues={{ email: '' }}
                onSubmit={(values) => onSubmit(values)}
                validationSchema={validationScheme}
            >

                {
                    ({ handleChange, handleSubmit, errors, }) => (
                        <VStack>


                            <Input
                                autoCorrect={false}
                                autoComplete="off"

                                ml={4}
                                InputLeftElement={<Feather name="mail" size={20} />}
                                fontFamily='InterRegular'
                                fontSize={14}
                                placeholder="EMAIL"
                                type="text"
                                mt={5}
                                width="90%"
                                bgColor="white"
                                rounded="full"
                                focusOutlineColor='none'
                                onChangeText={handleChange("email")}
                            />
                            <Text fontFamily="InterLight" style={{ color: "red" }} mt={1} ml={4}>{errors.email || data.error}</Text>

                            <View alignItems="flex-end">

                                <Button
                                    w="35%"
                                    rounded="full"
                                    bg="#3699D6"
                                    colorScheme="#3699D6"
                                    mr={10}
                                    mt={3}
                                    onPress={handleSubmit}
                                    focusable={true}

                                    rightIcon={<Feather name="arrow-right" size={23} color="white" />}

                                >
                                    <Text fontFamily="InterSemiBold" color="white">NEXT</Text>
                                </Button>

                            </View>


                        </VStack>
                    )
                }


            </Formik>
            <ModalC text="Sending Verification Code" isOpen={openModal} />
        </>
    )
}

export default ForgotPassword;