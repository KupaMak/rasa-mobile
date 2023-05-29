import { HStack, ScrollView, Text, VStack } from 'native-base'
import React from 'react'

const SpecificationsTab = ({ data }) => {
    return (
        <ScrollView mt='3' ml='4%' showsVerticalScrollIndicator={false} >
            <VStack>
                <HStack space='10'>
                    <Text fontSize='16' fontFamily='InterSemiBold'>Condition</Text>
                    <Text fontSize='16' fontFamily='InterLight'>{data.condition}</Text>
                </HStack>
                <HStack space='10' mt='3'>
                    <Text fontSize='16' fontFamily='InterSemiBold'>Available Items</Text>
                    <Text fontSize='16' fontFamily='InterLight'>{data.quantity}</Text>
                </HStack>
                <HStack space='10' mt='3'>
                    <Text fontSize='16' fontFamily='InterSemiBold'>Available</Text>
                    <Text fontSize='16' fontFamily='InterLight'>{data.sold ? 'No' : 'Yes'}</Text>
                </HStack>
            </VStack>



        </ScrollView>
    )
}

export default SpecificationsTab