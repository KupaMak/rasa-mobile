import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react'
import AuthImage from "../../components/auth/AuthImage"
import ForgotPassword from '../../components/auth/ForgotPassword'


const ForgotPasswordScreen = ({navigation}) => {


    return (
        <SafeAreaView flex={1} style={{backgroundColor: "white"}}>

            <AuthImage screenType={true} navigation={navigation}/>
            <ForgotPassword/>


        </SafeAreaView>
    )
}

export default ForgotPasswordScreen;

