import { View, HStack, Text, Actionsheet } from 'native-base'
import { Feather, AntDesign } from "@expo/vector-icons"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainAction } from '../../store/main-slice'

const UserActionSheet = () => {


    const dispatch = useDispatch()
    const data = useSelector(state => state.main)
    return (
        <>
            <Actionsheet
                isOpen={data.sheetOpen}
                onClose={() => {
                    dispatch(MainAction.openSheet(false))
                }}

            >
                <Actionsheet.Content>

                    <Actionsheet.Item _pressed={{ bg: "white" }} onPress={() => {
                        dispatch(MainAction.openSheet(false))
                    }}>
                        <HStack space='4'>


                            <Feather name='settings' size={24} />
                            <Text mt='0.5px' fontFamily='InterSemiBold' fontSize={18}>
                                Settings
                            </Text>
                        </HStack>
                    </Actionsheet.Item>
                    <Actionsheet.Item _pressed={{ bg: "white" }} onPress={() => {
                        dispatch(MainAction.openSheet(false))
                    }}>
                        <HStack space='4'>


                            <Feather name='user-check' size={24} />
                            <Text mt='0.5px' fontFamily='InterSemiBold' fontSize={18}>Profile</Text>
                        </HStack>
                    </Actionsheet.Item >
                    <Actionsheet.Item _pressed={{ bg: "white" }} onPress={() => {
                        dispatch(MainAction.openSheet(false))
                    }}>
                        <HStack space='4'>


                            <Feather name='info' size={24} />
                            <Text mt='0.5px' fontFamily='InterSemiBold' fontSize={18}>
                                About
                            </Text>
                        </HStack>
                    </Actionsheet.Item>

                    <Actionsheet.Item _pressed={{ bg: "white" }} onPress={() => {
                        dispatch(MainAction.openSheet(false))
                    }}>
                        <HStack space='4'>


                            <AntDesign name='logout' size={24} />
                            <Text mt='0.5px' fontFamily='InterSemiBold' fontSize={18}>
                                Logout
                            </Text>
                        </HStack>
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}

export default UserActionSheet