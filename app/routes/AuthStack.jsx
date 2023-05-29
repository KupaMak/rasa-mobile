import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen"
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen'
import VerifyScreen from "../screens/auth/VerifyScreen"
import OtherDetailsScreen from "../screens/auth/OtherDetailsScreen"
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen"

const AuthStack = () => {


    const AuthStackNavigator = createNativeStackNavigator()



    return (
        <AuthStackNavigator.Navigator initialRouteName='login'>
            <AuthStackNavigator.Screen name='login' component={LoginScreen} options={({ navigation, route }) => ({
                animation: 'fade_from_bottom',
                headerShown: false,
            })}
            />
            <AuthStackNavigator.Screen name='signup' component={SignUpScreen} options={({ navigation, route }) => ({
                animation: 'fade_from_bottom',
                headerShown: false,
            })}
            />
            <AuthStackNavigator.Screen name='forgot-password' component={ForgotPasswordScreen} options={({ navigation, route }) => ({
                animation: 'fade_from_bottom',
                headerShown: false,

            })}
            />
            <AuthStackNavigator.Screen name='verify' component={VerifyScreen} options={({ navigation, route }) => ({
                animation: 'fade_from_bottom',
                headerShown: false,


            })}
            />
            <AuthStackNavigator.Screen name='other-details' component={OtherDetailsScreen} options={({ navigation, route }) => ({
                animation: 'fade_from_bottom',
                headerShown: false,
            })}
            />
            <AuthStackNavigator.Screen name='reset-password' component={ResetPasswordScreen} options={({ navigation, route }) => ({
                animation: 'fade_from_bottom',
                headerShown: false,


            })}
            />
        </AuthStackNavigator.Navigator>
    )
}

export default AuthStack