import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box, Center, HStack, Pressable, Text, View } from 'native-base'
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import HomeScreen from '../screens/core/HomeScreen'
import StoreScreen from '../screens/core/StoreScreen'
import MyAccountScreen from '../screens/core/MyAccountScreen';
import { useSelector } from 'react-redux';


const TabNavigator = () => {

    const { cartItemsNumber, storeItemsNumber } = useSelector(state => state.main)
    const Tab = createBottomTabNavigator();


    return (


        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true
        }} initialRouteName='home' backBehavior='order'>

            <Tab.Screen name='home' component={HomeScreen} options={({ navigation, route }) => ({
                headerTitleAlign: 'left',
                headerTitle: () => <Text fontFamily='InterSemiBold' fontSize='20'>Products</Text>,
                headerRight: () => <View mr={4}>
                    <HStack space={5}>
                        <Pressable

                            onPress={() => navigation.navigate('search')}
                            _pressed={{ bg: 'gray.100' }}
                            rounded='full'
                            w='9'
                            h='9'


                        >
                            <Center mt={1}>
                                <Feather name='search' size={25} />
                            </Center>


                        </Pressable>

                        <Pressable onPress={() => navigation.navigate('cart')} _pressed={{ bg: 'gray.100' }}
                            rounded='full'
                            w='9'
                            h='9'>
                            <Center mt={1}>
                                <Feather name='shopping-cart' size={25} />
                                {cartItemsNumber === 0 ? null : <Box
                                    px='1'
                                    rounded='full'
                                    position='absolute'
                                    top={-6}
                                    left={5}
                                    minW='4'
                                    minH='4'
                                    alignItems='center'
                                    fontFamily='InterSemiBold'

                                    bg='#3699D6'
                                    _text={{
                                        color: 'white',
                                        fontSize: '12px'
                                    }}
                                >{cartItemsNumber}</Box>}
                            </Center>
                        </Pressable>
                    </HStack>

                </View>,
                tabBarIcon: ({ focused }) => (
                    <Center>

                        {
                            focused ? <AntDesign name='home' size={25} color="#3699D6" /> :
                                <AntDesign name='home' size={25} />

                        }


                    </Center>

                ),
                headerShadowVisible: false,

            })}

            />

            {/* */}
            <Tab.Screen name='store' component={StoreScreen} options={({ navigation, route }) => ({
                tabBarIcon: ({ focused }) => (
                    <Center>
                        {
                            focused ? <MaterialIcons name='storefront' size={25} color="#3699D6" /> :
                                <MaterialIcons name='storefront' size={25} />
                        }

                    </Center>

                ),
                headerRight: () => <View mr={4}>


                    <Pressable h='9' w='9' _pressed={{ bg: 'gray.100' }} rounded='full'>
                        <Center mt={1}>
                            <MaterialIcons name='storefront' size={25} />
                            {storeItemsNumber === 0 ? null : <Box
                                px='1'
                                rounded='full'
                                position='absolute'
                                top={-5}
                                left={5}
                                minW='4'
                                minH='4'
                                alignItems='center'

                                fontFamily='InterSemiBold'

                                bg='#3699D6'
                                _text={{
                                    color: 'white',
                                    fontSize: '12px'
                                }}
                            >{storeItemsNumber}</Box>}
                        </Center>


                    </Pressable>


                </View>,
                headerTitleAlign: 'center',
                headerTitle: () => <Text fontFamily='InterSemiBold' fontSize='20'>My Store</Text>,


            })} />


            {/* */}
            <Tab.Screen name='user' component={MyAccountScreen} options={({ navigation, route }) => ({
                tabBarIcon: ({ focused }) => (
                    <Center>
                        {
                            focused ? <Feather name='user' size={25} color="#3699D6" /> :
                                <Feather name='user' size={25} />
                        }

                    </Center>

                ),
                headerRight: () => <Pressable mr={4}><Feather name='menu' size={25} /></Pressable>,
                headerTitleAlign: 'center',
                headerTitle: () => <Text fontFamily='InterSemiBold' fontSize='20'>My Account</Text>

            })} />


        </Tab.Navigator>


    )
}

export default TabNavigator;