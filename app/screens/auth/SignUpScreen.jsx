import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import AuthImage from "../../components/auth/AuthImage"
import SignUp from '../../components/auth/SignUp'

const SignUpScreen = ({navigation}) => {


    return (
        <SafeAreaView flex={1} style={{backgroundColor: "white"}}>

            <AuthImage screenType={true} navigation={navigation}/>
            <SignUp navigation={navigation}/>


        </SafeAreaView>
    )
}

export default SignUpScreen;