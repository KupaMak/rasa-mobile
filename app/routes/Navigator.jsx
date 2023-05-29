import MainStack from './MainStack'
import AuthStack from './AuthStack'
import {useDispatch, useSelector} from 'react-redux'
import {MainAction} from '../store/main-slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useEffect} from 'react'

const Navigator = () => {

    const {isLogged} = useSelector(state => state.main)


    const dispatch = useDispatch()

    useEffect(() => {


        const setCart = async () => {
            try {
                if (await AsyncStorage.getItem("cart")) {

                    const cartItems = JSON.parse(await AsyncStorage.getItem('cart'))

                    dispatch(MainAction.setCart(cartItems))
                    dispatch(MainAction.setCartItemsNumber(cartItems.length))

                }
            } catch (error) {
                console.log('error')
            }
        }
        //call the function to setCart State
        setCart()


    }, [])


    return (
        <>

            {isLogged ? <MainStack/> : <AuthStack/>}
        </>


    )
}

export default Navigator