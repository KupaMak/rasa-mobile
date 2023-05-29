import React from 'react'
import { View } from "native-base";
import AddStoreProduct from "../../components/shop/AddStoreProduct";

const AddStoreProductScreen = ({ navigation, route }) => {
    return (
        <View bg="white" flex={1}>
            <AddStoreProduct navigation={navigation} />

        </View>
    )
}

export default AddStoreProductScreen