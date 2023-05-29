import React from 'react'
import {View} from 'native-base'
import ProductDetail from '../../components/home/ProductDetail'


const ProductDetailScreen = ({navigation, route}) => {

    return (
        <View bg="white" flex={1}>
            <ProductDetail route={route}/>
        </View>
    )
}

export default ProductDetailScreen