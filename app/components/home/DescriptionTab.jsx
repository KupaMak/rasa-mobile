import { Text, ScrollView } from 'native-base'
import React from 'react'

const DescriptionTab = ({ data }) => {
    return (
        <ScrollView mt='3' ml='4%' showsVerticalScrollIndicator={false} >
            <Text fontSize='16' fontFamily='InterLight'>{data.description}</Text>

        </ScrollView>
    )
}

export default DescriptionTab