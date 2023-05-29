import { Center, VStack, Text } from 'native-base'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React from 'react'

const Network = () => {
    return (
        <VStack>
            <Center >


                <Center h={200} w={200} rounded="full" mt={40} bg="blue.50">

                    <Feather name='wifi-off' size={64} color="#3699D6" />
                </Center>
                <Text mt={12} fontFamily='InterLight' fontSize={18}>No internet connection</Text>


            </Center>
        </VStack>
    )
}

export default Network