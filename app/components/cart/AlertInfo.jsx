import { AlertDialog } from 'native-base'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MainAction } from '../../store/main-slice'


const AlertInfo = () => {

    const { message, openDialog } = useSelector(state => state.main)
    const dispatch = useDispatch()

    return (
        <>
            <AlertDialog
                isOpen={openDialog}
                motionPreset="fade"


            >
                <AlertDialog.Content>
                    <AlertDialog.Header fontSize="lg" fontWeight="bold">
                        Message
                    </AlertDialog.Header>
                    <AlertDialog.CloseButton onPress={() => (dispatch(MainAction.setOpenDialog(false)))} _pressed={{ bg: 'gray.200' }} />


                    <AlertDialog.Body fontFamily='InterLight'>
                        {message}
                    </AlertDialog.Body>

                </AlertDialog.Content>
            </AlertDialog>

        </>
    )
}

export default AlertInfo