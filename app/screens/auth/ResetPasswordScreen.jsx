import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react'
import AuthImage from "../../components/auth/AuthImage"
import ResetPassword from '../../components/auth/ResetPassword'
import ModalC from "../../components/auth/Modal"


const ResetPasswordScreen = () => {
    return (
        <SafeAreaView flex={1}>

            <AuthImage/>
            <ResetPassword/>
            <ModalC text="Resetting password"/>

        </SafeAreaView>
    )
}

export default ResetPasswordScreen;