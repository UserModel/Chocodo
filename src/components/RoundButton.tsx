import { Wrap, Tooltip, Avatar, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { AddIcon, QuestionIcon } from '@chakra-ui/icons'

type PropTypes = {
    name: string
    onClick: Function
    imageURL: string
    gameId: number
}

export const RoundButton = (props: PropTypes) => {
    const bgColor = useColorModeValue('#F0F0F0', '#36393E')

    let imageURL = props.imageURL
    let onClickFunction = props.onClick
    let name = props.name

    const avatarRender = () => {
        if (name === 'Add a Game') {
            return (
                <Avatar
                    className="gamebar-avatar trans"
                    bgColor={bgColor}
                    icon={<AddIcon color="green" />}
                />
            )
        } else if (name === 'Home') {
            return (
                <Avatar
                    className="gamebar-avatar trans"
                    bgColor={bgColor}
                    icon={<QuestionIcon color="white" />}
                />
            )
        } else {
            return (
                <Avatar
                    className="gamebar-avatar trans"
                    src={imageURL}
                    name={name}
                />
            )
        }
    }

    return (
        <Wrap
            className="avatar-button"
            onClick={() => onClickFunction(props.gameId)}
        >
            <Tooltip
                hasArrow
                label={name}
                bg="gray.300"
                color="black"
                placement="right"
                openDelay={500}
            >
                {avatarRender()}
            </Tooltip>
        </Wrap>
    )
}
