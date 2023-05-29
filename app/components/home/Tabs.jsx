import { View, Text, FlatList, Pressable } from 'native-base'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DescriptionTab from './DescriptionTab'
import SpecificationsTab from './SpecificationsTab'
import MoreInfo from './MoreInfo'

const Tabs = ({ data }) => {

    const [activeTab, setActiveTab] = useState('Description')


    //tabs array
    const tabs = [
        { id: 1, name: 'Description' },
        { id: 2, name: 'Specifications' },
        { id: 3, name: 'More Info' }
    ]




    //render item
    const renderItem = ({ item }) => (

        <Pressable _pressed={{ bg: 'gray.100' }} rounded='full' onPress={() => setActiveTab(item.name)} mt={1}
            style={[styles.categoryButton, item.name === activeTab && styles.selectedCategoryButton]}
        >
            <Text textAlign="center" style={[styles.categoryButtonText, item.name === activeTab && styles.selectedCatgeoryButtonText,]}>
                {item.name}
            </Text>

        </Pressable>

    )


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
        selectedCatgeoryButtonText: {
            color: 'black',

        }
    })

    return (
        <View >
            <FlatList
                horizontal
                data={tabs}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}

            />
            <View mt='3'>
                {
                    activeTab == 'Description' ? <DescriptionTab data={data} /> : activeTab == 'Specifications' ? <SpecificationsTab data={data} /> : <MoreInfo data={data} />
                }
            </View>

        </View>
    )
}

export default Tabs