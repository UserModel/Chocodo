import { Wrap, Tooltip, Avatar, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AddIcon, QuestionIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { userSelectors } from '../slices/userSlice'

type PropTypes = {
    name: string
    onClick: Function
    imageURL: string
    gameId: number
}

export const RoundButton = (props: PropTypes) => {
    const bgColor = useColorModeValue('#F0F0F0', '#36393E')
    const iconBg = useColorModeValue('white', '#36393E')
    const iconColor = useColorModeValue('black', 'white')

    const [isHovering, setIsHovering] = useState(false);
    const currentGame = useSelector(userSelectors.currentGame)

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
                    variant="roundable"
                    sx={(isHovering || currentGame?.id === props.gameId) ? {borderRadius: "10px", transitionDuration: '0.3s'} : {borderRadius: "50%", transitionDuration: '0.3s'}}
                    onMouseOver={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                />
            )
        } else if (name === 'Home') {
            return (
                <Avatar
                    className="gamebar-avatar trans"
                    bgColor={iconBg}
                    icon={<QuestionIcon color={iconColor} />}
                    variant="roundable"
                    sx={(isHovering || currentGame?.id === props.gameId) ? {borderRadius: "10px", transitionDuration: '0.3s'} : {borderRadius: "50%", transitionDuration: '0.3s'}}
                    onMouseOver={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                />
            )
        } else {
            return (
                <Avatar
                    className="gamebar-avatar trans"
                    src={imageURL}
                    name={name}
                    variant="roundable"
                    sx={(isHovering || currentGame?.id === props.gameId) ? {borderRadius: "10px", transitionDuration: '0.3s'} : {borderRadius: "50%", transitionDuration: '0.3s'}}
                    onMouseOver={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
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
