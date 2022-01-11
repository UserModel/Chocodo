import { Button, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react"

type PropTypes = {
    onConfirm: Function,
    children: object,
}

export const DeleteConfirmation = (props: PropTypes) => {

    return (
        <Popover size="sm">
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>
                        {props.children}
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody alignSelf='center' alignContent='center' alignItems='center' textAlign='center'>
                            <Heading marginTop='10px' marginBottom='10px' size="sm">Are you sure you want to delete?</Heading>
                            <Button marginBottom='10px' marginRight='10px' size='md' variant='solid' colorScheme='red' onClick={() => props.onConfirm()}>Yes, Delete</Button>
                            <Button marginBottom='10px' size='md' variant='outline' onClick={onClose}>Cancel</Button>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    )
}