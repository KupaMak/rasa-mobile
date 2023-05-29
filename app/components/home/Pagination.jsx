import { View, Text, Center } from 'native-base'
import { Animated, Dimensions, StyleSheet } from 'react-native'
import React from 'react'

const Pagination = ({ data, scrollX }) => {

    const { width } = Dimensions.get('screen')
    return (

        <Center flexDirection="row" position='absolute' mt='64' w='100%'>
            {
                data.map((_, id) => {
                    const inputRange = [(id - 1) * width, id * width, (id + 1) * width]
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [12, 30, 12],
                        extrapolate: 'clamp'

                    })
                    const bgColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#ccc', '#3699D6', '#ccc'],
                        extrapolate: 'clamp'

                    })

                    return <Animated.View key={id.toString()} style={[styles.dot, { width: dotWidth, backgroundColor: bgColor }]} />
                })
            }
        </Center>


    )
}

const styles = StyleSheet.create({
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "ghostwhite",
        marginHorizontal: 3

    }
})

export default Pagination