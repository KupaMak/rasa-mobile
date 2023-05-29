import React, { useState } from 'react'
import { Button, Center, Input, Pressable, Text, View, VStack } from 'native-base'
import { Formik } from 'formik'
import { Feather } from "@expo/vector-icons"
import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginValidationSchema } from '../../functions'
import { MainAction } from '../../store/main-slice';
import { API } from '../../settings/config';
import ModalC from './Modal';
import AlertInfo from '../cart/AlertInfo';


const Login = ({ navigation }) => {


    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false)
    const [show, setShow] = useState(true)


    //submit function for user authentication
    const onSubmit = async (values) => {

        try {

            setOpenModal(true)

            //make a request to the API
            const request = await fetch(`${API.AUTH}/login/`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            //make request to json
            const response = await request.json()


            const user = JSON.stringify(response.data)
            const access_token = response.access
            const refresh_token = response.refresh


            if (response.login === true) {

                //call the shop shop in Local Storage

                try {

                    await AsyncStorage.setItem("user", user)
                    await AsyncStorage.setItem("access_token", access_token)
                    await AsyncStorage.setItem("refresh_token", refresh_token)

                    setOpenModal(false)
                    dispatch(MainAction.setIsLogged(true))


                    //handle exception
                } catch (error) {

                    dispatch(MainAction.setOpenDialog(true))
                    dispatch(MainAction.setMessage("Application Error"))


                }


            } else if (response.login === false) {

                setOpenModal(false)
                dispatch(MainAction.setOpenDialog(true))
                dispatch(MainAction.setMessage("Wrong email 😑"))


            } else if (response.password === false) {

                setOpenModal(false)
                dispatch(MainAction.setOpenDialog(true))
                dispatch(MainAction.setMessage("Wrong password 😑"))


            }

        } catch (error) {

            setOpenModal(false)
            dispatch(MainAction.setOpenDialog(true))
            dispatch(MainAction.setMessage("We couldn't connect to Rasa.Make sure you're connected to the internet and try again😑."))


        }

    }


    return (
        <>
            {/* Call the alert info */}
            <AlertInfo />

            <View mt={10}>
                <Text fontFamily='InterRegular' fontSize={32} mx={5} mt={9}>Welcome Back</Text>
                <Text fontFamily='InterLight' fontSize={18} mx={5} mt={2}>Please sign in to continue</Text>
            </View>

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => onSubmit(values)}
                validationSchema={loginValidationSchema}
                validateOnChange={false}
            >

                {
                    ({ handleChange, handleSubmit, errors, values }) => (
                        <VStack>


                            <Input
                                autoCorrect={false}
                                autoComplete="off"
                                keyboardType='email-address'
                                ml={4}
                                InputLeftElement={
                                    <View ml='2' pr='2'>
                                        <Feather name="mail" size={20} />
                                    </View>

                                }
                                fontFamily='InterLight'
                                fontSize={14}
                                placeholder="Email"
                                variant='underlined'
                                _focus={{
                                    shadow: 1,
                                    bg: "white",
                                    rounded: 'full'
                                }}
                                type="text"
                                mt={5}
                                width="90%"

                                focusOutlineColor='none'
                                onChangeText={handleChange("email")}
                            />
                            <Text fontFamily="InterLight" style={{ color: "red" }} mt={1} ml={5}>{errors.email}</Text>

                            <Input
                                ml={4}
                                autoCorrect={false}
                                autoComplete="off"
                                InputLeftElement={<View ml='2' pr='2'>
                                    <Feather name="lock" size={20} />
                                </View>}
                                InputRightElement={
                                    values.password.length > 0 ?
                                        <Pressable
                                            mr='2'
                                            pr='2'
                                            _pressed={{ bg: 'gray.50' }}
                                            rounded='full'
                                            onPress={() => setShow(!show)}
                                        >
                                            <Text fontFamily='InterRegular' color='#3699D6'>{show ? 'Show' : 'Hide'}</Text>
                                        </Pressable> : null}
                                fontFamily='InterLight'
                                fontSize={14}
                                placeholder="Password"
                                type="password"
                                secureTextEntry={show}
                                variant='underlined'
                                _focus={{
                                    shadow: 1,
                                    bg: "white",
                                    rounded: 'full'
                                }}
                                mt={2}
                                width='90%'
                                focusOutlineColor='none'
                                onChangeText={handleChange("password")}
                            />
                            <Text fontFamily="InterLight" style={{ color: "red" }} mt={1}
                                ml={4}>{errors.password}</Text>

                            <View alignItems="flex-end">
                                <Pressable onPress={() => navigation.navigate('forgot-password')}>
                                    <Text fontFamily="InterSemiBold" color="#3699D6" textAlign="right" mr={12} mt={2}>Forgot
                                        password?</Text>
                                </Pressable>

                                <Button
                                    w="35%"
                                    rounded="full"
                                    bg="#3699D6"
                                    mr={10}
                                    mt={3}
                                    onPress={handleSubmit}
                                    _pressed={{
                                        bg: 'blue.200'
                                    }}
                                    focusable={true}
                                    rightIcon={<Feather name="arrow-right" size={23} color="white" />}
                                >
                                    <Text fontFamily="InterSemiBold" color="white">LOGIN</Text>
                                </Button>

                            </View>


                        </VStack>
                    )
                }


            </Formik>

            <Center>
                <Pressable mt="40" onPress={() => navigation.navigate('signup')}>
                    <Text fontFamily="InterSemiBold" mr={10} mt={2}>Don't have an account?
                        <Text fontFamily="InterSemiBold" color="#3699D6"> Sign up</Text>
                    </Text>
                </Pressable>
            </Center>
            <ModalC text="Authenticating" isOpen={openModal} />
        </>
    )
}

export default Login