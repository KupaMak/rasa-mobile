import { View, Text, VStack, Center, HStack, Image, Icon, Pressable, Box, AlertDialog, Button, useToast } from 'native-base'
import { Ionicons, Feather } from '@expo/vector-icons'
import { Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SwipeListView } from 'react-native-swipe-list-view'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from '../../settings/config'
import { MainAction } from '../../store/main-slice'
import Empty from '../home/Empty'
import ModalC from '../auth/Modal'


const CartList = () => {

    const [USD, setUSD] = useState(0)
    const [ZWL, setZWL] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [open, setOpen] = useState(false)

    const toast = useToast()


    const { cartItemsNumber, cartItems } = useSelector(state => state.main)
    const dispatch = useDispatch()

    useEffect(() => {

        //set total amounts for the cart list
        const setUSDTotal = () => {

            let USDList = []
            let totalUSD = 0

            const filter = cartItems.filter(item => item.currency === 'USD')
            USDList = filter.map(item => item.price * item.quantity)

            for (let i = 0; i < USDList.length; i++) {
                totalUSD += USDList[i]
            }

            //sum the amounts
            setUSD(totalUSD)


        };
        const setZWLTotal = () => {

            let ZWLList = []
            let totalZWL = 0

            const filter = cartItems.filter(item => item.currency === 'ZWL')
            ZWLList = filter.map(item => item.price * item.quantity)

            //sum the amounts
            for (let i = 0; i < ZWLList.length; i++) {
                totalZWL += ZWLList[i]
            }

            setZWL(totalZWL)

        };


        //calling the functions
        setUSDTotal();
        setZWLTotal();




    }, [cartItemsNumber])




    const renderItem = ({ item, index }) => {

        //contact seller onWhatsApp config
        const contactSeller = async () => {
            const customer_name = 'Kunashe Makunura'
            const mobile = `263${item.whatsapp_number}`
            const message = `Hi ${item.gender === 'Male' ? 'Mr' : 'Mrs'} ${item.seller} my name is ${customer_name}.I'm interested in purchasing ${item.quantity} of ${item.name} costing ${item.currency == 'USD' ? '$' : 'ZWL'} ${item.price}.Just letting you know that you're receiving this message through Rasa,a marketplace which you use.Let me know if the product is still available.Thank you! Have a good day😊.`
            const url = `whatsapp://send?text=${message}&phone=${mobile}`;
            Linking.openURL(url)
                .then(() => {

                    toast.show({
                        title: "WhatsApp opened",
                        bg: 'dark.50',
                        rounded: 'md',
                        fontFamily: 'InterLight'
                    },

                    )
                }).catch((error) => {
                    toast.show({
                        title: "WhatsApp not found",
                        bg: 'dark.50',
                        rounded: 'md',
                        fontFamily: 'InterLight'
                    },

                    )
                })
        }



        return (
            <Box mb={3} w='100%'>
                <HStack
                    space='5'
                    alignItems='center'
                    bg='white'
                    shadow='1'
                    rounded='md'
                    overflow='hidden'
                >
                    <Center w='25%'>
                        <Image
                            source={{ uri: BASE_URL + item.image }}
                            alt='ok'
                            h='24'
                            w='full'
                            rounded='md'
                            resizeMode='cover'
                        />
                    </Center>

                    <VStack w='50%'>
                        <Text fontFamily="InterLight" fontSize={18} ml={2} mt='1' isTruncated>{item.name}</Text>
                        <Text fontFamily="InterRegular" fontSize={18} ml={2} mt='1' isTruncated>
                            {item.currency === 'USD' ? '$ ' : 'ZWL '}
                            {item.totalPrice.toLocaleString()}
                        </Text>
                        <Text fontFamily="InterLight" fontSize={18} ml={2} isTruncated>Quantity : {item.quantity}</Text>

                    </VStack>

                    <Center >
                        <Pressable _pressed={{ bg: 'green.100' }} rounded='full' w='9' h='9' onPress={contactSeller}>
                            <Center mt={1}>
                                <Icon as={Ionicons} name="ios-logo-whatsapp" color='green.400' size='25' />
                            </Center>

                        </Pressable>

                    </Center>

                </HStack>
            </Box>


        )
    }

    const renderHiddenItem = ({ item }) => {

        const deleteItem = async () => {

            let cart = []
            setOpen(false)
            setOpenModal(true)

            try {



                if (await AsyncStorage.getItem('cart')) {
                    cart = await AsyncStorage.getItem("cart")
                    cart = JSON.parse(cart)

                }

                cart.map((product, index) => {


                    if (product.id === item.id) {

                        cart.splice(index, 1)

                    }

                })



                await AsyncStorage.setItem("cart", JSON.stringify(cart))

                setOpenModal(false)
                dispatch(MainAction.setCart(cart))
                dispatch(MainAction.setCartItemsNumber(cart.length))






            } catch (error) {
                console.log("failed")

            }




        }


        return (
            <>
                <Pressable
                    w='16'
                    rounded='md'
                    h='88%'
                    ml='auto'
                    justifyContent='center'
                    bg='red.500'
                    _pressed={{
                        bg: 'red.200'
                    }}
                    onPress={() => setOpen(true)}
                >
                    <Center space='2' ml='4'>

                        <Icon as={Feather} name="trash" color='white' size='25' />
                    </Center>

                </Pressable>
                {
                    //render the prompt dialog
                }
                <AlertDialog
                    isOpen={open}
                    motionPreset="fade"

                >
                    <AlertDialog.Content>
                        <AlertDialog.Header fontSize="lg" fontamily='InterSemiBold'>
                            <Text fontFamily='InterSemiBold' fontSize='lg'>Delete Cart Item</Text>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <Text fontFamily='InterRegular' fontSize='md'>
                                Are you sure? You can't undo this action afterwards.
                            </Text>

                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button
                                bg='#3699D6'
                                _pressed={{
                                    bg: 'blue.200'
                                }}
                                rounded='md'
                                onPress={() => setOpen(false)}
                            >Cancel</Button>
                            <Button
                                bg="red.500"
                                rounded='md' ml="3"
                                onPress={deleteItem}
                                _pressed={{
                                    bg: 'red.200'
                                }}
                            >
                                Delete</Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </>


        )
    }





    return (
        <>
            {
                cartItemsNumber === 0 ? <Empty name='cart' text='Cart is empty' /> :
                    <>
                        <VStack>
                            <View ml='5%' mt='6'>
                                <Text fontFamily='InterSemiBold' fontSize='16'>{cartItemsNumber === 1 ? `${cartItemsNumber} Item available` : `${cartItemsNumber} Items available`} </Text>
                            </View>

                            <Center mt='7' >
                                <SwipeListView
                                    rightOpenValue={-50}
                                    disableRightSwipe
                                    previewRowKey="0"
                                    previewOpenDelay={3000}
                                    data={cartItems}
                                    renderItem={renderItem}
                                    renderHiddenItem={renderHiddenItem}
                                    showsVerticalScrollIndicator={false}

                                />

                            </Center>
                            <ModalC isOpen={openModal} text='Deleting item' />




                        </VStack>

                        <Box bg='#3699D6' position='absolute' p='4' bottom='0' right='0' left='0'>
                            <VStack ml='5%'>

                                <HStack mt='4' space='20'>
                                    <Text fontFamily="InterSemiBold" color='white' fontSize={18} ml={2} mt='1' isTruncated>Total USD</Text>
                                    <Text fontFamily="InterSemiBold" color='white' fontSize={18} ml={2} mt='1' isTruncated>$ {USD.toLocaleString()}
                                    </Text>
                                </HStack>
                                <HStack mt='5' space='20'>
                                    <Text fontFamily="InterSemiBold" color='white' fontSize={18} ml={2} mt='1' isTruncated>Total ZWL</Text>
                                    <Text fontFamily="InterSemiBold" color='white' fontSize={18} ml={2} mt='1' isTruncated>ZWL {ZWL.toLocaleString()} </Text>
                                </HStack>
                            </VStack>

                        </Box>
                    </>


            }

        </>








    )
}

export default CartList