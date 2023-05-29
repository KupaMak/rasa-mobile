import { Box, Center, HStack, Pressable, Text, View } from 'native-base'
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductDetailScreen from '../screens/core/ProductDetailScreen';
import CartScreen from '../screens/core/CartScreen';
import SearchScreen from '../screens/core/SearchScreen';
import { useSelector } from 'react-redux'
import TabNavigator from './TabNavigator';
import AddStoreProductScreen from "../screens/core/AddStoreProductScreen";
import EditStoreProductScreen from "../screens/core/EditStoreProductScreen"

const MainStack = () => {

    const MainStackNavigator = createNativeStackNavigator();


    const { cartItemsNumber } = useSelector(state => state.main)


    return (
        <MainStackNavigator.Navigator>
            <MainStackNavigator.Screen name='tabs' component={TabNavigator} options={({ navigation, route }) => ({
                headerShown: false,
            })}
            />
            <MainStackNavigator.Screen name='product-detail' component={ProductDetailScreen}
                options={({ navigation, route }) => ({
                    animation: 'fade_from_bottom',
                    headerTitle: () => <Text fontFamily='InterSemiBold' fontSize='20'>Product
                        Detail</Text>,
                    headerTitleAlign: 'center',
                    headerRight: () => <View mr={2}>
                        <HStack space={5}>
                            <Pressable onPress={() => navigation.navigate('cart')}
                                _pressed={{ bg: 'gray.100' }}>
                                <Feather name='shopping-cart' size={25} />
                                {cartItemsNumber === 0 ? null : <Box
                                    px='1'
                                    rounded='full'
                                    position='absolute'
                                    top={-5}
                                    left={4}
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
                            </Pressable>
                        </HStack>

                    </View>,
                    headerBackVisible: false,
                    headerLeft: () => <Pressable onPress={() => navigation.goBack()} w='9' h='9'
                        rounded='full' _pressed={{ bg: 'gray.100' }}>
                        <Center mt={1}>
                            <Feather name='arrow-left' size={25} />
                        </Center>

                    </Pressable>,
                    headerShadowVisible: true,


                })}
            />
            <MainStackNavigator.Screen name='cart' component={CartScreen} options={({ navigation, route }) => ({
                animation: 'fade_from_bottom',
                headerTitle: () => <Text fontFamily='InterSemiBold' fontSize='20'>Cart</Text>,
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerLeft: () => <Pressable onPress={() => navigation.goBack()} w='9' h='9' rounded='full'
                    _pressed={{ bg: 'gray.100' }}>
                    <Center mt={1}>
                        <Feather name='arrow-left' size={25} />
                    </Center>

                </Pressable>,
                headerShadowVisible: true,


            })}
            />
            <MainStackNavigator.Screen name='search' component={SearchScreen} options={({ navigation, route }) => ({
                animation: 'fade_from_bottom',
                headerTitle: () => <Text fontFamily='InterSemiBold' fontSize='20'>Search</Text>,
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerShown: false,
                headerLeft: () => <Pressable onPress={() => navigation.goBack()} w='9' h='9' rounded='full'
                    _pressed={{ bg: 'gray.100' }}>
                    <Center mt={1}>
                        <Feather name='arrow-left' size={25} />
                    </Center>

                </Pressable>,
                headerShadowVisible: true,


            })}
            />
            <MainStackNavigator.Screen name='add-store-product' component={AddStoreProductScreen}
                options={({ navigation, route }) => ({
                    animation: 'fade_from_bottom',
                    headerTitle: () => <Text fontFamily='InterSemiBold' fontSize='20'>New
                        Product</Text>,
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    headerLeft: () => <Pressable onPress={() => navigation.goBack()} w='9' h='9'
                        rounded='full' _pressed={{ bg: 'gray.100' }}>
                        <Center mt={1}>
                            <Feather name='arrow-left' size={25} />
                        </Center>

                    </Pressable>,
                    headerShadowVisible: true,


                })}
            />
            <MainStackNavigator.Screen name='edit-store-product' component={EditStoreProductScreen}
                options={({ navigation, route }) => ({
                    animation: 'fade_from_bottom',
                    headerTitle: () => <Text fontFamily='InterSemiBold' fontSize='20'>Edit
                        Product</Text>,
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    headerLeft: () => <Pressable onPress={() => navigation.goBack()} w='9' h='9'
                        rounded='full' _pressed={{ bg: 'gray.100' }}>
                        <Center mt={1}>
                            <Feather name='arrow-left' size={25} />
                        </Center>

                    </Pressable>,
                    headerShadowVisible: true,


                })}
            />


        </MainStackNavigator.Navigator>

    )
}

export default MainStack