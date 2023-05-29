import { HStack, Modal, Spinner, Text, View } from 'native-base'

import React from 'react'

const ModalC = ({ text, isOpen }) => {


    return (
        <View flex={1}>
            <Modal
                isOpen={isOpen}
            >
                <Modal.Content>

                    <Modal.Body>
                        <HStack space="4">
                            <Spinner size="lg" color="#3699D6" />

                            <Text fontFamily="InterSemiBold" mt={2}>
                                {text}
                            </Text>

                        </HStack>

                    </Modal.Body>

                </Modal.Content>
            </Modal>

        </View>
    )
}

export default ModalC;