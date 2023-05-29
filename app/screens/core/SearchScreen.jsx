import {View} from 'native-base'
import React from 'react'
import Search from "../../components/search/Search";

const SearchScreen = ({navigation}) => {
    return (
        <View flex={1} bg='white'>
            <Search navigation={navigation}/>

        </View>
    )
}

export default SearchScreen