import React, {useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import OtherDetails from '../../components/auth/OtherDetails';
import ModalC from '../../components/auth/Modal';
import AuthImage from '../../components/auth/AuthImage';


const OtherDetailsScreen = ({navigation}) => {


    useEffect(() => navigation.addListener('beforeRemove', (e) => {

            e.preventDefault()
        })

        , [navigation])
    return (
        <SafeAreaView flex={1} style={{backgroundColor: "white"}}>
            <AuthImage/>
            <OtherDetails/>
            <ModalC text="Finishing up"/>

        </SafeAreaView>
    )
}

export default OtherDetailsScreen