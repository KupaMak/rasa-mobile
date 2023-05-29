import {View} from 'native-base'
import React from 'react'
import CartList from '../../components/cart/CartList'

const CartScreen = () => {
    return (
        <View bg="white" flex={1}>
            <CartList/>
        </View>
    )
}

export default CartScreen