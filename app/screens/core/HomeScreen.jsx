import { useToast, View } from 'native-base'
import React, { useEffect } from 'react'
import ProductList from '../../components/home/ProductList'
import FloatingBtn from '../../components/home/FloatingBtn';
import CategoryList from '../../components/home/CategoryList';
import Empty from '../../components/home/Empty';
import { API } from "../../settings/config"
import { MainAction } from "../../store/main-slice"
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"


const HomeScreen = ({ navigation, routes }) => {

    const { count } = useSelector(state => state.main)
    const toast = useToast()
    const dispatch = useDispatch()


    useEffect(() => {
        const getProducts = async () => {
            //make a request to the API
            const accessToken = await AsyncStorage.getItem("access_token")


            try {

                const request = await fetch(`${API.PRODUCT}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${accessToken}`
                    }
                })

                const response = await request.json()


                if (response.count == 0) {

                    dispatch(MainAction.setCount(0))

                } else {

                    dispatch(MainAction.setCount(response.count))

                }

                dispatch(MainAction.setCategory(response.category))
                dispatch(MainAction.setProducts(response.products))
                dispatch(MainAction.setIsLoaded(true))

                //handle network or API error

            } catch (error) {
                toast.show({
                    title: "No Internet Connection",
                    bg: 'dark.50',
                    rounded: 'md',
                    fontFamily: 'InterLight'
                },
                )
            }


        }
        getProducts();
    }, [])
    return (
        <View bg="white" flex={1}>

            <CategoryList />
            {
                count === 0 ? <Empty name='category' text='Category is empty' /> : <ProductList navigation={navigation} />
            }


            <FloatingBtn navigation={navigation} />
        </View>


    )
}

export default HomeScreen