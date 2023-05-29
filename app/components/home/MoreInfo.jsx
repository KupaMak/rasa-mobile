import { ScrollView, Text, VStack, HStack, Link, FlatList, View } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { Linking } from 'react-native'
import { paymentMethods } from '../../settings/data'
import React from 'react'

const MoreInfo = ({ data }) => {

    const { user } = data

    const openGmail = async () => {
        const url = `gmail://`;
        Linking.openURL(url)
            .then(data => {
                console.log("Gmail Opened")
            }).catch(() => {
                console.log("Gmail was not found")
            })
    }

    const renderItem = ({ item }) => (
        <View justifyItems='left'>

            <Text fontFamily='InterLight' fontSize='16' ml='2'  >{item.name}</Text>
        </View>





    )
    return (
        <ScrollView mt='3' ml='4%' showsVerticalScrollIndicator={false} >
            <VStack>
                <HStack space='10'>
                    <Text fontSize='16' fontFamily='InterSemiBold'>Seller</Text>
                    <Text fontSize='16' fontFamily='InterLight' >{user.full_name}</Text>
                </HStack>
                <HStack space='10' mt='3'>
                    <Text fontSize='16' fontFamily='InterSemiBold'>Email Address</Text>
                    <Link _text={{ color: '#3699D6' }} fontSize='16' fontFamily='InterLight'>{user.email}</Link>
                </HStack>
                <HStack space='10' mt='3'>
                    <Text fontSize='16' fontFamily='InterSemiBold'>Accepted Payment Methods</Text>

                </HStack>

                <HStack mt='3'>
                    <FlatList
                        horizontal
                        data={paymentMethods}
                        keyExtractor={(item) => item.id}

                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}

                    />
                </HStack>
            </VStack>



        </ScrollView>
    )
}

export default MoreInfo