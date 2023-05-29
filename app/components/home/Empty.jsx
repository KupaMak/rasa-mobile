import { Center, VStack, Text } from 'native-base'
import { Feather, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import React from 'react'

const Empty = ({ name, text }) => {
    return (
        <VStack>
            <Center >


                <Center h={200} w={200} rounded="full" mt={40} bg="blue.50">
                    {
                        name == 'category' ?
                            <Feather name='search' size={64} color="#3699D6" /> : null

                    }
                    {
                        name == 'cart' ? <FontAwesome name='shopping-basket' size={64} color="#3699D6" /> : null
                    }
                    {
                        name == 'store' ? <MaterialIcons name='storefront' size={64} color="#3699D6" /> : null
                    }
                    {
                        name == 'network' ? <Feather name='wifi-off' size={64} color="#3699D6" /> : null
                    }





                </Center>
                <Text mt={12} fontFamily='InterRegular' fontSize={18}>{text}</Text>


            </Center>
        </VStack>
    )
}

export default Empty