import { View, Text, VStack, HStack, Button, useToast } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import NumericInput from 'react-native-numeric-input'
import { useDispatch, } from 'react-redux'
import React, { useState } from 'react'
import ImageCarousel from './ImageCarousel'
import { MainAction } from '../../store/main-slice'
import Tabs from './Tabs'
import { Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalC from "../auth/Modal";

const ProductDetail = ({ route }) => {


    //hooks
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [openModal, setOpenModal] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()


    //useEffectHook to update the cart everytime cart state changes

    //parameter reception and destructuring

    const data = route.params.data
    const { id, image_1, image_2, image_3, name, price, currency, quantity, user } = data;
    const { customer, full_name } = user
    const { whatsapp_number, gender } = customer
    const images = [image_1, image_2, image_3]


    //contact seller onWhatsApp config
    const contactSeller = async () => {
        const mobile = `263${whatsapp_number}`
        const customer_name = ''
        const message = `Hi ${gender === 'Male' ? 'Mr' : 'Mrs'} ${full_name} my name is ${customer_name}.I'm interested in purchasing ${selectedQuantity} of ${name} costing ${currency === 'USD' ? '$' : 'ZWL'} ${price}.Just letting you know that you're receiving this message through Rasa,a marketplace which you use.Let me know if the product is still available.Thank you! Have a good day😊.`
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
            }).catch(() => {
                toast.show({
                    title: "WhatsApp not found",
                    bg: 'dark.50',
                    rounded: 'md',
                    fontFamily: 'InterLight'
                },

                )
            })
    }

    //add to cart configuration
    const addToCart = async () => {

        setOpenModal(true)
        let cart = []



        const item = {

            id: id,
            name: name,
            seller: user.full_name,
            gender: gender,
            quantity: selectedQuantity,
            currency: currency,
            totalPrice: price * selectedQuantity,
            price: price,
            image: image_1,
            whatsapp_number: whatsapp_number
        }

        try {



            if (await AsyncStorage.getItem('cart')) {
                cart = await AsyncStorage.getItem("cart")
                cart = JSON.parse(cart)

            }

            //add the  new item to the array

            cart.map((product, index) => {

                //merge+ if the item is existing and continue
                if (product.id === item.id) {

                    cart.splice(index, 1)

                }


            })

            //push item to the array
            cart.push({ ...item })




            await AsyncStorage.setItem('cart', JSON.stringify(cart))

            //now dispatch data to the cart

            dispatch(MainAction.setCart(cart))
            dispatch(MainAction.setCartItemsNumber(cart.length))
            setOpenModal(false)

            toast.show({
                title: "Item added to cart",
                bg: 'dark.50',
                rounded: 'md',
                duration: 1000,
                mb: '6',
                fontFamily: 'InterLight'
            },

            )


        } catch (error) {
            toast.show({
                title: "Item not added to cart",
                bg: 'dark.50',
                rounded: 'md',
                duration: 2500,
                mb: '3',
                fontFamily: 'InterLight'
            },

            )

        }

    }


    return (

        <View bg='white'>
            <ImageCarousel images={images} />

            <View>
                <Text ml='5%'
                    fontFamily='InterSemiBold'
                    fontSize={18}
                >{name}</Text>



            </View>
            <HStack ml='5%' mt='3' space='2' alignItems='center' >

                <NumericInput
                    minValue={1}
                    maxValue={quantity}
                    totalHeight={40}
                    totalWidth={140}
                    editable={false}
                    rightButtonBackgroundColor='#3699D6'
                    iconSize={25}
                    value={selectedQuantity}
                    iconStyle={{ color: "white" }}
                    rounded
                    borderColor='ghostwhite'
                    leftButtonBackgroundColor='#3699D6'
                    valueType='real'
                    onChange={setSelectedQuantity}

                />

                <Text
                    fontFamily='InterSemiBold'
                    fontSize={18}
                    ml='18%'
                    mt={1}

                >{currency === 'USD' ? '$ ' : 'ZWL '}{selectedQuantity * price}</Text>

            </HStack>


            <View h='56' mt='5' ml='3%'>
                <Tabs data={data} />

            </View>



            <HStack mt='2' space='2'>

                <Button
                    w="35%"
                    ml='5%'

                    rounded="full"
                    bg="#3699D6"
                    _pressed={{
                        bg: 'blue.200'
                    }}

                    mt={3}
                    onPress={addToCart}
                    focusable={true}

                >
                    <Text fontFamily="InterSemiBold" color="white">ADD TO CART</Text>
                </Button>

                <Button
                    w="45%"

                    ml='6'
                    rounded="full"
                    bg="green.400"
                    _pressed={{
                        bg: 'green.200'
                    }}
                    onPress={contactSeller}


                    mt={2}
                    focusable={true}
                    rightIcon={<Ionicons name="ios-logo-whatsapp" size={23} color="white" />}

                >
                    <Text fontFamily="InterSemiBold" color="white">CONTACT SELLER</Text>
                </Button>
            </HStack>
            <ModalC isOpen={openModal} text='Adding to cart' />
        </View>
    )
}

export default ProductDetail