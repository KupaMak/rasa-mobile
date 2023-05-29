import { Fab, Icon } from 'native-base'
import React from 'react'
import { Feather } from "@expo/vector-icons";


const FloatingBtn = ({ navigation }) => {
    return (
        <>
            <Fab
                icon={
                    <Icon as={Feather} name="plus" size='7' />
                }

                mb={20}
                bg="#3699D6"
                _pressed={{
                    bg: 'blue.200'
                }}
                renderInPortal={false}
                onPress={() => navigation.navigate('add-store-product')}


            />
        </>
    )
}

export default FloatingBtn