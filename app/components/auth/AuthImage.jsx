import {Feather} from "@expo/vector-icons"
import {ImageBackground} from 'react-native'
import React from 'react'
import {Center, Pressable} from "native-base"

const AuthImage = ({screenType, navigation}) => {
    return (

        <ImageBackground source={require('../../../assets/logo/auth.png')} style={{height: 120}} alt="Logo" mt={2}>
            {
                screenType ? <Pressable mt={3} ml={3} w={10} h={10} rounded='full' onPress={() => navigation.goBack()}
                                        _pressed={{
                                            bg: 'gray.100'
                                        }}>
                        <Center mt={1}>
                            <Feather name='arrow-left' size={30}/>
                        </Center>

                    </Pressable> :
                    null
            }
        </ImageBackground>


    )
}

export default AuthImage