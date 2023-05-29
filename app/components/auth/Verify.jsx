import { View, Text, VStack } from 'native-base'
import ConfirmationCode from './ConfirmationCode'



const Verify = ({ navigation }) => {




    return (
        <VStack>

            <View mt={10}>
                <Text fontFamily='InterSemiBold' fontSize={32} mx={5} mt={9}>Verification</Text>
                <Text fontFamily='InterRegular' fontSize={18} mx={5} mt={2}>Please enter OTP sent to your email</Text>
            </View>

            <ConfirmationCode navigation={navigation} />


        </VStack>
    )
}

export default Verify