import { View, Text, FlatList, Image, Center } from 'native-base'
import { Dimensions } from 'react-native'
import { BASE_URL } from '../../settings/config'
import React, { useRef } from 'react'
import Pagination from './Pagination'
import { Animated, Easing } from 'react-native'


const ImageCarousel = ({ images }) => {

    const { width, height } = Dimensions.get('screen')
    const scrollX = useRef(new Animated.Value(0)).current;
    const handleScroll = event => {
        Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        x: scrollX
                    }
                }
            }
        ], {
            useNativeDriver: false
        }

        )(event);

    }
    const translateYImage = new Animated.Value(40)

    Animated.timing(translateYImage, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,

    }).start()

    const renderItem = ({ item }) => (

        <Center h="300" width={width} >

            <Animated.Image source={{ uri: BASE_URL + item }} resizeMode='cover' style={{

                flex: 0.6,
                borderRadius: 8,
                marginTop: -50,
                width: 0.8 * width,
                transform: [
                    {
                        translateY: translateYImage
                    }
                ]
            }} />

        </Center>

    )


    return (
        <>
            <FlatList
                horizontal
                data={images}
                keyExtractor={(item) => item}
                pagingEnabled
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}

            />
            <Pagination data={images} scrollX={scrollX} />
        </>



    )
}

export default ImageCarousel