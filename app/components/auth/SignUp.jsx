import React, {useState} from 'react'
import {Button, Center, Input, KeyboardAvoidingView, Text, View, VStack,Pressable} from 'native-base'
import {Formik} from 'formik'
import {Feather} from "@expo/vector-icons"
import {API} from '../../settings/config';
import {signupValidationSchema} from '../../functions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalC from "./Modal";


const SignUp = ({navigation}) => {


    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState(null)


    const onSubmit = async ({full_name, email, password,}) => {


        const formData = {
            full_name: full_name,
            email: email,
            password: password,
        }

        //submit to API for creating account
        try {

            setOpenModal(true)

            //make a request to the API
            const request = await fetch(`${API.AUTH}/`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            const response = await request.json()

            if (response.valid) {


                try {


                    await AsyncStorage.setItem("code", JSON.stringify(response.code))
                    await AsyncStorage.setItem("email", response.data.email)
                    await AsyncStorage.setItem("user", JSON.stringify(response.data))
                    await AsyncStorage.setItem("access_token", response.access)

                    setOpenModal(false)
                    await navigation.navigate('verify')

                } catch (error) {

                    setError("We couldn't connect to Rasa.Make sure you're connected to the internet and try again.")
                }

            } else {

                setError("Email is being used by another account.")
                setOpenModal(false)

            }

        } catch (error) {

            setOpenModal(false)
            setError("We couldn't connect to Rasa.Make sure you're connected to the internet and try again.")
        }


    }

    return (
        <>
            <KeyboardAvoidingView enabled={true} behavior='padding'>
                <View mt={10}>
                    <Text fontFamily='InterSemiBold' fontSize={32} mx={5} mt={1}>Create Account</Text>
                </View>

                <Formik
                    initialValues={{email: '', full_name: '', password: '', password2: ''}}
                    onSubmit={(values) => onSubmit(values)}
                    validationSchema={signupValidationSchema}
                >

                    {
                        ({handleChange, handleSubmit, errors,}) => (
                            <VStack>


                                <Input
                                    autoCorrect={false}
                                    autoComplete="off"
                                    ml={4}
                                    InputLeftElement={<Feather name="user" size={20}/>}
                                    fontFamily='InterRegular'
                                    fontSize={14}
                                    placeholder="FULL NAME"
                                    type="text"
                                    mt={5}
                                    width="90%"
                                    bgColor="white"
                                    rounded="full"
                                    focusOutlineColor='none'
                                    onChangeText={handleChange("full_name")}
                                />
                                <Input
                                    autoCorrect={false}
                                    autoComplete="off"

                                    ml={4}
                                    InputLeftElement={<Feather name="mail" size={20}/>}
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

                                <Input
                                    ml={4} autoCorrect={false}
                                    autoComplete="off"
                                    InputLeftElement={<Feather name="lock" size={20}/>}
                                    fontFamily='InterRegular'
                                    fontSize={14}
                                    placeholder="PASSWORD"
                                    type="password"
                                    rounded="full"
                                    mt={5}
                                    width="90%"
                                    bgColor="white"
                                    focusOutlineColor='none'
                                    onChangeText={handleChange("password")}
                                />
                                <Input
                                    ml={4} autoCorrect={false}
                                    autoComplete="off"
                                    InputLeftElement={<Feather name="lock" size={20}/>}
                                    fontFamily='InterRegular'
                                    fontSize={14}
                                    placeholder=" CONFIRM PASSWORD"
                                    type="password"
                                    rounded="full"
                                    mt={5}
                                    width="90%"
                                    bgColor="white"
                                    focusOutlineColor='none'
                                    onChangeText={handleChange("password2")}
                                />

                                <Text fontFamily="InterLight" style={{color: "red"}} mt={1}
                                      ml={4}>{errors.password || error || errors.password2}</Text>

                                <Text fontFamily="InterLight" style={{color: "red"}} mt={1}
                                      ml={4}>{errors.full_name || errors.email}</Text>

                                <View alignItems="flex-end">

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


                                        rightIcon={<Feather name="arrow-right" size={23} color="white"/>}

                                    >
                                        <Text fontFamily="InterSemiBold" color="white">SIGN UP </Text>
                                    </Button>

                                </View>


                            </VStack>
                        )
                    }


                </Formik>
                <Center>
                    <Pressable mt="100px" onPress={() => navigation.goBack()}>
                        <Text fontFamily="InterSemiBold" mr={10} mt={5}>Already have an account?
                            <Text fontFamily="InterSemiBold" color="#3699D6" > Sign
                                in</Text>
                        </Text>
                    </Pressable>

                </Center>

            </KeyboardAvoidingView>
            <ModalC isOpen={openModal} text='Creating Account'/>
        </>

    )
}

export default SignUp