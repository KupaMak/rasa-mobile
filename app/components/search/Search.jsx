import React, {useEffect, useState} from 'react'
import {FlatList, HStack, Image, Input, Pressable, Skeleton, Text, useToast, View, VStack} from 'native-base'
import {Feather} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API, BASE_URL} from "../../settings/config";


const Search = ({navigation}) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const toast = useToast()


    //load recent products


    useEffect(() => {
        loadLatest();
    }, [])


    const loadLatest = async () => {
        //make a request to the API
        const access_token = await AsyncStorage.getItem("access_token")


        try {

            const request = await fetch(`${API.PRODUCT}/latest/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                }
            })

            const response = await request.json()

            setResults(response.products)
            setLoaded(true)
            setRefreshing(false)
            //handle network or API error

        } catch (error) {
            setRefreshing(false)
            toast.show({
                    title: "No Internet Connection",
                    bg: 'dark.50',
                    rounded: 'md',
                    fontFamily: 'InterLight'
                },
            )
        }


    }
    //debounce function to delay requests  to the api
    const debounce = (func, delay) => {
        let timeoutID;
        return (...args) => {
            if (timeoutID) {
                clearTimeout(timeoutID)
            }
            timeoutID = setTimeout(() => {
                func.apply(null, args);
            }, delay)
        };
    }

    const handleSearch = debounce(async (searchQuery) => {
        const access_token = await AsyncStorage.getItem("access_token")
        const query = {
            query: searchQuery
        }
        setLoaded(false)

        if (searchQuery.length > 0) {
            try {

                const request = await fetch(`${API.PRODUCT}/search/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access_token}`
                    },
                    body: JSON.stringify(query)

                })

                const response = await request.json()


                setResults(response.products)
                setRefreshing(false)
                setLoaded(true)
            } catch (error) {
                console.log("error")
            }
        }


    }, 500)

    //handle query change
    const handleQueryChange = (searchQuery) => {
        setQuery(searchQuery)
        handleSearch(searchQuery)
    }

    //skeleton renderItem
    const renderSkeletonItem = () => {
        return (
            <>
                <HStack mt={3} ml='5%' space='3'>

                    <Skeleton h={20} w={20} rounded='md' startColor="coolGray.200" endColor="coolGray.100"/>

                    <VStack w='full'>
                        <Skeleton.Text w="60%" startColor="coolGray.200" endColor="coolGray.100" lines={1} mt={2}/>
                        <Skeleton.Text lines={1} startColor="coolGray.200" endColor="coolGray.100" w="30%" mt={4}/>
                    </VStack>
                </HStack>
            </>


        )
    }

    //render actual products
    const renderItem = ({item}) => {

        return (
            <Pressable
                rounded='md' mt={3} ml='5%'
                _pressed={{bg: 'gray.100'}}
                onPress={() => navigation.navigate('product-detail', {data: item})}>

                <HStack space='3'>

                    <View h={20} w={20} rounded='md'>
                        <Image
                            source={{uri: BASE_URL + item.image_1}}
                            alt={item.name}
                            w="full"
                            h={20}
                            resizeMode="contain"
                            rounded="md"
                        />
                    </View>

                    <VStack w='full'>
                        <Text fontFamily="InterLight" fontSize={16} ml={2} isTruncated>{item.name}</Text>

                        <Text fontFamily="InterRegular" fontSize={14} ml={2} mt={4}
                              isTruncated>{item.currency === 'USD' ? '$ ' + item.price : 'ZWL ' + item.price.toLocaleString()}</Text>
                    </VStack>
                </HStack>
            </Pressable>


        )
    }
    return (

        <>
            <HStack
                safeAreaTop
                space={3}
                py={4}
                w='full'
                shadow={1}
                bg='white'
                alignItems='center'
            >
                <Pressable ml='2%' onPress={() => navigation.goBack()} _pressed={{bg: 'gray.100'}} rounded='full'>
                    <Feather name='arrow-left' size={25} color='black'/>
                </Pressable>
                <Input
                    placeholder='Search'
                    value={query}
                    variant='outlined'
                    border='none'
                    onChangeText={handleQueryChange}
                    w='83%'
                    rounded='full'
                    InputLeftElement={
                        <View ml='2'>
                            <Feather name="search" size={22}/>
                        </View>

                    }
                    fontFamily='InterLight'
                    rightElement={
                        query.length > 0 ?
                            <Pressable mr='2' _pressed={{bg: 'gray.300'}} rounded='full' onPress={() => setQuery('')}>
                                <Feather name="x" size={22}/>
                            </Pressable> : null}
                    fontSize={14}
                    type="text"
                    autoCorrect={false}
                    autoComplete="off"
                    keyboardType='default'
                    bg="coolGray.100"
                    focusOutlineColor='none'
                    _focus={{
                        bg: 'coolGray.100'
                    }}


                />


            </HStack>

            {
                loaded ?
                    <FlatList

                        ml={1}
                        data={results}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            loadLatest();
                        }}


                    />
                    :
                    <FlatList

                        ml={1}
                        data={[0, 1, 2, 3, 4, 5, 6]}
                        keyExtractor={(item) => item}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderSkeletonItem}
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            loadLatest();
                        }}

                    />
            }


        </>
    )
}

export default Search;