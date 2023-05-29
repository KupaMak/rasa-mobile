import { View, Text } from 'native-base'
import React from 'react'
import EditStoreProduct from '../../components/shop/EditStoreProduct'

const EditStoreProductScreen = ({ navigation, route }) => {

    return (
        <View bg="white" flex={1}>
            <EditStoreProduct item={route.params.data} />
        </View>
    )
}

export default EditStoreProductScreen