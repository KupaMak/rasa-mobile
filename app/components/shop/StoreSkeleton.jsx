import { View, Text, Box, FlatList, Skeleton, HStack, VStack, Center } from 'native-base'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../settings/config'
import { MainAction } from '../../store/main-slice'

const StoreSkeleton = () => {

    const [refreshing, setRefreshing] = useState(false)
    const dispatch = useDispatch()


    const pullToRefresh = async () => {
        //make a request to the API
        const accessToken = await AsyncStorage.getItem("access_token")
        setRefreshing(true)


        try {

            const request = await fetch(`${API.PRODUCT}/store/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${accessToken}`
                }
            })

            const response = await request.json()

            setRefreshing(false)
            dispatch(MainAction.setStore(response.data))
            dispatch(MainAction.setStoreItemsNumber(response.count))
            dispatch(MainAction.setStoreLoaded(true))


            //handle network or API error

        } catch (error) {

            setRefreshing(false)
            dispatch(MainAction.setOpenDialog(true))
            dispatch(MainAction.setMessage("We couldn't connect to Rasa.Make sure you're connected to the internet and try again😑."))
        }


    }

    const renderSkeletonItem = () => {
        return (
            <Box mb={3} w='100%'>
                <HStack
                    space='5'
                    alignItems='center'
                    rounded='md'

                    overflow='hidden'
                >
                    <Center w='25%'>
                        <Skeleton
                            h='24'
                            w='full'
                            ml={3}
                            rounded='md'
                            startColor="coolGray.200"
                            endColor="coolGray.100"

                        />
                    </Center>

                    <VStack w='50%'>
                        <Skeleton.Text lines={1} w='90%' ml={2} mt='1' isTruncated startColor="coolGray.200" endColor="coolGray.100" />
                        <Skeleton.Text lines={1} w='60%' ml={2} mt='2' isTruncated startColor="coolGray.200" endColor="coolGray.100" />
                        <Skeleton.Text lines={1} w='40%' ml={2} mt='2' isTruncated startColor="coolGray.200" endColor="coolGray.100" />
                    </VStack>

                    <Center >
                        <Skeleton rounded='full' w='4' h='4' startColor="coolGray.200" endColor="coolGray.100" />
                    </Center>

                </HStack>
            </Box>
        )
    }
    return (
        <>
            <FlatList

                ml='3%'
                data={[0, 1, 2, 3, 4, 5]}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                renderItem={renderSkeletonItem}
                mt={5}
                refreshing={refreshing}
                onRefresh={() => pullToRefresh()}


            />
        </>
    )
}

export default StoreSkeleton