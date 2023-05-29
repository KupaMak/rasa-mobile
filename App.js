import {SafeAreaView, useColorScheme} from 'react-native'
import {NativeBaseProvider} from "native-base";
import {Provider} from "react-redux"
import {useFonts} from 'expo-font';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react'
import store from './app/store/store';
import Navigator from './app/routes/Navigator'


const App = () => {

    const [loaded] = useFonts({

        InterBold: require('./assets/fonts/Inter-Bold.ttf'),
        InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
        InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
        InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
        InterLight: require('./assets/fonts/Inter-Light.ttf'),
    });
    const scheme = useColorScheme()
    if (!loaded) return null;


    return (
        <SafeAreaView style={{flex: 1}}>

            <NativeBaseProvider>
                <Provider store={store}>
                    <NavigationContainer >
                        <Navigator/>
                    </NavigationContainer>
                </Provider>
            </NativeBaseProvider>

        </SafeAreaView>


    )
}

export default App