import { View, Text, Center, VStack, Pressable, Box, Image, AlertDialog, Button, HStack, Icon } from 'native-base'
import { Feather, Ionicons } from '@expo/vector-icons'
import { API, BASE_URL } from '../../settings/config'
import React, { useState } from 'react'
import ModalC from '../auth/Modal'
import { SwipeListView } from 'react-native-swipe-list-view'
import { MainAction } from '../../store/main-slice'
import { useDispatch, useSelector } from 'react-redux'
import Empty from '../home/Empty'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Store = ({ navigation }) => {

  const { storeItemsNumber, store } = useSelector(state => state.main)
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)


  //use pull to refresh load store products
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



  const renderItem = ({ item }) => {
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
              source={{ uri: BASE_URL + item.image_1 }}
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
              {item.price.toLocaleString()}
            </Text>
            <Text fontFamily="InterLight" fontSize={18} ml={2} isTruncated>Quantity : {item.quantity}</Text>

          </VStack>

          <Center >
            <Pressable _pressed={{ bg: 'gray.100' }} rounded='full' w='9' h='9' onPress={() => navigation.navigate("edit-store-product", { data: item })}>
              <Center mt={2}>
                <Icon as={Feather} name="settings" size='18' />
              </Center>

            </Pressable>

          </Center>

        </HStack>
      </Box>

    )
  }

  const renderHiddenItem = ({ item }) => {
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
        >
          <Center space='2' ml='4'>

            <Icon as={Feather} name="trash" color='white' size='25' />
          </Center>

        </Pressable>

      </>
    )
  }





  return (
    <>
      {
        storeItemsNumber === 0 ? <Empty name='store' text='Store is empty' /> :
          <>
            <VStack >


              <Center mt='7' >
                <SwipeListView
                  rightOpenValue={-50}
                  disableRightSwipe
                  previewRowKey="0"
                  previewOpenDelay={1000}
                  data={store}
                  renderItem={renderItem}
                  renderHiddenItem={renderHiddenItem}
                  showsVerticalScrollIndicator={false}
                  refreshing={refreshing}
                  onRefresh={pullToRefresh}

                />

              </Center>
              <ModalC isOpen={openModal} text='Deleting item' />
            </VStack>
          </>


      }

    </>

  )
}

export default Store