import React from 'react'
import { View, Text, VStack, Center, Input, Button } from 'native-base'
import { Formik } from 'formik'
import { Feather } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetPasswordValidationSchema } from '../../functions'
import { API } from '../../settings/config';

const ResetPassword = () => {




    const dispatch = useDispatch();
    const data = useSelector(state => state.auth);

    const onSubmit = async ({ password, password2 }) => {

        try {
            var email = await AsyncStorage.getItem("email")

        } catch (error) {

        }

        if (password == password2) {




            dispatch(authAction.openModal(true))

            const formData = {
                email: email,
                password: password,
            }
            //make a request to the API
            const request = await fetch(`${API.AUTH}/reset_password/`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            const response = await request.json()

            if (response.reset) {

                dispatch(authAction.setError("Passwords Reset"))

            } else {

                dispatch(authAction.setError("Error Reset"))

            }



        } else {
            dispatch(authAction.setError("Passwords do not match"))
        }
    }
    return (
        <>
            <View mt={10}>
                <Text fontFamily='InterSemiBold' fontSize={32} mx={5} mt={9}>Reset Password</Text>

            </View>

            <Formik
                initialValues={{ password: '', password2: '' }}
                onSubmit={(values) => onSubmit(values)}
                validationSchema={resetPasswordValidationSchema}
            >

                {
                    ({ handleChange, handleSubmit, errors, }) => (
                        <VStack>


                            <Input
                                autoCorrect={false}
                                autoComplete="off"

                                ml={4}
                                InputLeftElement={<Feather name="lock" size={20} />}
                                fontFamily='InterRegular'
                                fontSize={14}
                                placeholder="PASSWORD"
                                type="password"
                                mt={5}
                                width="90%"
                                bgColor="white"
                                rounded="full"
                                focusOutlineColor='none'
                                onChangeText={handleChange("password")}
                            />
                            <Text fontFamily="InterLight" style={{ color: "red" }} mt={1} ml={4}>{errors.password}</Text>

                            <Input
                                ml={4} autoCorrect={false}
                                autoComplete="off"
                                InputLeftElement={<Feather name="lock" size={20} />}
                                fontFamily='InterRegular'
                                fontSize={14}
                                placeholder="CONFIRM PASSWORD"
                                type="password"
                                rounded="full"
                                mt={2}
                                width="90%"
                                bgColor="white"
                                focusOutlineColor='none'
                                onChangeText={handleChange("password2")}
                            />
                            <Text fontFamily="InterLight" style={{ color: "red" }} mt={1} ml={4}>{errors.password2 || data.error}</Text>

                            <View alignItems="flex-end">

                                <Button
                                    w="45%"
                                    rounded="full"
                                    bg="#3699D6"
                                    colorScheme="#3699D6"
                                    mr={10}
                                    mt={3}
                                    onPress={handleSubmit}
                                    focusable={true}


                                    rightIcon={<Feather name="arrow-right" size={23} color="white" />}

                                >
                                    <Text fontFamily="InterSemiBold" color="white">RESET PASSWORD</Text>
                                </Button>

                            </View>


                        </VStack>
                    )
                }


            </Formik>


        </>
    )
}

export default ResetPassword