import {
    Button,
    Heading,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
} from '@chakra-ui/react'
import { useDarkestBgColor, useTextColor } from '../theme'

type PropTypes = {
    onConfirm: Function
    children: object
}

export const DeleteConfirmation = (props: PropTypes) => {
    const bgColor = useDarkestBgColor()
    const textColor = useTextColor()

    return (
        <Popover size="sm" arrowSize={0}>
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>{props.children}</PopoverTrigger>
                    <PopoverContent sx={{ bgColor: bgColor, color: textColor }}>
                        <PopoverCloseButton />
                        <PopoverBody
                            alignSelf="center"
                            alignContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <Heading
                                marginTop="10px"
                                marginBottom="10px"
                                size="sm"
                            >
                                Are you sure you want to delete?
                            </Heading>
                            <Button
                                marginBottom="10px"
                                marginRight="10px"
                                size="md"
                                variant="solid"
                                colorScheme="red"
                                onClick={() => props.onConfirm()}
                            >
                                Yes, Delete
                            </Button>
                            <Button
                                marginBottom="10px"
                                size="md"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    )
}
