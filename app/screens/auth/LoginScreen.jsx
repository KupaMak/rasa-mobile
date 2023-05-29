import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Login from '../../components/auth/Login';
import AuthImage from '../../components/auth/AuthImage';


const LoginScreen = ({navigation}) => {


    return (
        <SafeAreaView flex={1} style={{backgroundColor: "white"}}>

            <AuthImage screenType={false}/>
            <Login navigation={navigation}/>


        </SafeAreaView>
    );
}

export default LoginScreen;