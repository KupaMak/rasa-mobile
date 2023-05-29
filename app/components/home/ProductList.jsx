import {FlatList, Image, Pressable, Skeleton, Text, useToast, View, VStack} from "native-base"
import React, {useState} from 'react'
import {API, BASE_URL} from "../../settings/config"
import {MainAction} from "../../store/main-slice"
import {useDispatch, useSelector} from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProductList = ({navigation}) => {
    const data = useSelector(state => state.main)
    const toast = useToast()
    const [refreshing, setRefreshing] = useState(false)

    const dispatch = useDispatch()

    const pullToRefresh = async () => {
        //make a request to the API

        setRefreshing(true)

        const formData = {
            category: data.selected
        }
        const access_token = await AsyncStorage.getItem("access_token")

        try {
            const request = await fetch(`${API.PRODUCT}/filter/`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`

                }
            })

            const response = await request.json()

            //set refreshing to false

            setRefreshing(false)

            if (response.count === 0) {


                dispatch(MainAction.setCount(0))

            } else {

                dispatch(MainAction.setCount(response.count))
            }


            dispatch(MainAction.setProducts(response.products))
            dispatch(MainAction.setIsLoaded(true))


        } catch (error) {
            //set refreshing to false
            setRefreshing(false)

            toast.show({
                    title: "No Internet Connection",
                    bg: 'dark.50',
                    rounded: 'md',
                    fontFamily: 'InterLight',
                    mb: 3,
                },
            )

        }


    }


    const renderItem = ({item}) => (

        <Pressable
            w="45%"
            shadow='1'
            bg='white'
            rounded="md"

            my={3}
            ml={2.5}
            pb={2}
            onPress={() => {
                navigation.navigate('product-detail', {data: item});
            }}

        >


            <Image
                source={{uri: BASE_URL + item.image_1}}
                alt={item.name}
                w="full"
                h={32}
                resizeMode="cover"
                rounded="md"
            />


            <VStack>


                <Text fontFamily="InterLight" fontSize={18} ml={2} isTruncated>{item.name}</Text>

                <Text fontFamily="InterRegular" fontSize={18} ml={2}
                      isTruncated>{item.currency === 'USD' ? '$ ' + item.price : 'ZWL ' + item.price.toLocaleString()}</Text>


            </VStack>


        </Pressable>


    )
    const renderSkeletonItem = ({item}) => (

        <Pressable
            w="45%"
            rounded="md"

            my={3}
            ml={2.5}
            pb={2}
        >


            <Skeleton
                w="full"
                h={32}
                resizeMode="contain"
                rounded="md"
                endColor="coolGray.100"
                startColor="coolGray.200"
            />


            <VStack>

                <Skeleton.Text w="80%" startColor="coolGray.200" endColor="coolGray.100" lines={1} mt={2}/>
                <Skeleton.Text lines={1} startColor="coolGray.200" endColor="coolGray.100" w="50%" mt={2}/>


            </VStack>


        </Pressable>


    )

    return (
        <View>

            {
                data.isLoaded ? <FlatList

                        contentContainerStyle={{
                            justifyContent: "space-between", direction: "row",
                        }}
                        ml={2}

                        data={data.products}

                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={() => pullToRefresh()}


                    />
                    :
                    <FlatList

                        contentContainerStyle={{
                            justifyContent: "space-between", direction: "row",
                        }}
                        ml={1}

                        data={[0, 1, 2, 3, 4, 5, 6, 7]}
                        numColumns={2}
                        keyExtractor={(item) => item}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderSkeletonItem}

                    />
            }


        </View>
    )
}

export default ProductList