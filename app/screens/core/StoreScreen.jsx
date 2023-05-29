import React, { useEffect } from 'react'
import { View } from 'native-base';
import FloatingBtn from "../../components/home/FloatingBtn";
import Store from '../../components/shop/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { MainAction } from '../../store/main-slice';
import StoreSkeleton from '../../components/shop/StoreSkeleton';
import AlertInfo from '../../components/cart/AlertInfo';

const StoreScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const { storeLoaded } = useSelector(state => state.main)

    useEffect(() => {
        const getStoreProducts = async () => {
            //make a request to the API
            const accessToken = await AsyncStorage.getItem("access_token")


            try {

                const request = await fetch(`${API.PRODUCT}/store/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${accessToken}`
                    }
                })

                const response = await request.json()

                dispatch(MainAction.setStore(response.data))
                dispatch(MainAction.setStoreItemsNumber(response.count))
                dispatch(MainAction.setStoreLoaded(true))


                //handle network or API error

            } catch (error) {
                dispatch(MainAction.setOpenDialog(true))
                dispatch(MainAction.setMessage("We couldn't connect to Rasa.Make sure you're connected to the internet and try again😑."))
            }


        }
        getStoreProducts();
    }, [])

    return (
        <View bg="white" flex={1}>
            {storeLoaded ? <Store navigation={navigation} /> : <StoreSkeleton />}
            <FloatingBtn navigation={navigation} />
            <AlertInfo />

        </View>
    )
}

export default StoreScreen