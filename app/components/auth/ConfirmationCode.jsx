
import { Animated } from 'react-native';
import React, { useState } from 'react';
import { View, Text, Button } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../../settings/config'
import { Feather } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
    ACTIVE_CELL_BG_COLOR,
    CELL_BORDER_RADIUS,
    CELL_SIZE,
    DEFAULT_CELL_BG_COLOR,
    NOT_EMPTY_CELL_BG_COLOR,
} from '../../settings/styles';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};

const ConfirmationCode = ({ navigation }) => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.auth)


    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    //verify code
    const verifyCode = async () => {

        try {

            dispatch(authAction.openModal(true))

            const code = await AsyncStorage.getItem('code')

            const email = await AsyncStorage.getItem('email')

            if (code == value) {

                //make request to the API

                try {
                    const request = await fetch(`${API.AUTH}/verify/`, {
                        method: "POST",
                        body: JSON.stringify({ email: email }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    //make request to json
                    const response = await request.json()

                    const id = JSON.stringify(response.data.id)
                    const access_token = JSON.stringify(response.access)
                    const refresh_token = JSON.stringify(response.refresh)

                    if (response.verified) {

                        await AsyncStorage.setItem('id', id)
                        await AsyncStorage.setItem('access_token', access_token)
                        await AsyncStorage.setItem('refresh_token', refresh_token)
                        dispatch(authAction.openModal(false))

                        await navigation.navigate('other-details')

                    } else if (!response.verified) {

                        dispatch(authAction.setVerfiyError("Verification failed please close the app and try again"))
                        dispatch(authAction.openModal(false))

                    }

                } catch (error) {

                    dispatch(authAction.setVerfiyError("We couldn't connect to Rasa.Make sure you're connected to the internet and try again."))
                    dispatch(authAction.openModal(false))


                }





            } else {
                dispatch(authAction.setVerfiyError("Invalid"))
                dispatch(authAction.openModal(false))

            }



        } catch (error) {

            dispatch(authAction.openModal(false))
            dispatch(authAction.setVerfiyError("Storage Error"))

        }


    }

    return (
        <>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
            />

            <Text fontFamily="InterLight" style={{ color: "red" }} mt={1} ml={4}>{data.verifyerror}</Text>


            <View alignItems="flex-end" mt={5}>

                <Button
                    w="35%"
                    rounded="full"
                    bg="#3699D6"
                    colorScheme="#3699D6"
                    mr={10}
                    mt={3}
                    onPress={verifyCode}
                    focusable={true}
                    rightIcon={<Feather name="arrow-right" size={23} color="white" />}

                >
                    <Text fontFamily="InterSemiBold" color="white">VERIFY </Text>
                </Button>

            </View>
        </>



    );
};

export default ConfirmationCode;
