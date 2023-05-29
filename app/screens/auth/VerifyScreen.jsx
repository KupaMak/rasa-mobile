import React, {useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import AuthImage from "../../components/auth/AuthImage"
import Verify from '../../components/auth/Verify'
import ModalC from "../../components/auth/Modal"


const VerifyScreen = ({navigation}) => {


    useEffect(() => navigation.addListener('beforeRemove', (e) => {

            e.preventDefault()
        })

        , [navigation])


    return (
        <SafeAreaView flex={1} style={{backgroundColor: "white"}}>
            <AuthImage screenType={false}/>
            <Verify navigation={navigation}/>
            <ModalC text="Verifying"/>

        </SafeAreaView>
    );
}

export default VerifyScreen;