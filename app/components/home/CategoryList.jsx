import {FlatList, Pressable, Skeleton, Text, useToast, View} from 'native-base'
import {StyleSheet} from 'react-native'
import {useDispatch, useSelector} from "react-redux"
import {API} from "../../settings/config"
import {MainAction} from "../../store/main-slice"
import AsyncStorage from "@react-native-async-storage/async-storage";


const CategoryList = () => {

    const {category, selected, categoryLoaded} = useSelector(state => state.main)
    const toast = useToast()
    const dispatch = useDispatch()


    const filter = async (name) => {


        dispatch(MainAction.setSelected(name))
        dispatch(MainAction.setIsLoaded(false))


        const formData = {
            category: name
        }
        const access_token = await AsyncStorage.getItem("access_token")
        //try and exception
        try {
            const request = await fetch(`${API.PRODUCT}/filter/`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                }
            })

            const response = await request.json()

            if (response.count === 0) {
                dispatch(MainAction.setCount(0))
            } else {
                dispatch(MainAction.setCount(response.count))
            }


            dispatch(MainAction.setProducts(response.products))
            dispatch(MainAction.setIsLoaded(true))
        } catch (error) {

            toast.show({
                    title: "No Internet Connection",
                    bg: 'dark.50',
                    rounded: 'md',
                    fontFamily: 'InterLight',

                },
            )
        }


    }

    const renderItem = ({item}) => (

        <Pressable rounded='full' onPress={() => {
            filter(item.name)
        }} mt={1}
                   style={[styles.categoryButton, item.name === selected && styles.selectedCategoryButton]}
        >
            <Text textAlign="center"
                  style={[styles.categoryButtonText, item.name === selected && styles.selectedCategoryButtonText,]}>
                {item.name}
            </Text>

        </Pressable>

    )

    const renderSkeletonItem = () => {
        return (

            <Skeleton.Text lines={1} w='40%'/>

        )

    }
    const styles = StyleSheet.create({
        categoryButton: {
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomColor: 'transparent'
        },
        selectedCategoryButton: {
            borderBottomColor: "#3699D6",
            borderBottomWidth: 2,
            borderRadius: 1
        },
        categoryButtonText: {
            fontSize: 16,
            fontFamily: 'InterLight',
            color: 'grey'
        },
        selectedCategoryButtonText: {
            color: 'black',

        }
    })

    return (
        <View>
            <FlatList
                horizontal
                data={category}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
            />

        </View>
    )


}

export default CategoryList