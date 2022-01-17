import {
    Wrap,
    Tooltip,
    Avatar,
    useColorModeValue,
    AvatarBadge,
    Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { userSelectors } from '../slices/userSlice'
import { TaskType } from '../models/task'

type PropTypes = {
    name: string
    onClick: Function
    imageURL: string
    gameId: number
}

export const RoundButton = (props: PropTypes) => {
    const bgColor = useColorModeValue('#F0F0F0', '#36393E')
    const badgeBgColor = useColorModeValue('black', 'white')
    const badgeColor = useColorModeValue('white', 'black')

    const [isHovering, setIsHovering] = useState(false)
    const [isRealImage, setIsRealImage] = useState(true)
    const currentGame = useSelector(userSelectors.currentGame)
    const buttonGame = useSelector(userSelectors.gamesList).find(
        (game) => game.id === props.gameId
    )
    const resetableTodoTasks = buttonGame?.tasks.filter(
        (task) =>
            (task.taskType === TaskType.DAILY ||
                task.taskType === TaskType.WEEKLY) &&
            !task.completed
    ).length

    let imageURL = props.imageURL
    let onClickFunction = props.onClick
    let name = props.name

    const avatarRender = () => {
        if (name === 'Add a Game') {
            return (
                <Avatar
                    className="gamebar-avatar trans"
                    bgColor={bgColor}
                    icon={<AddIcon color="#4caf50" />}
                    variant="roundable"
                    sx={
                        isHovering || currentGame?.id === props.gameId
                            ? {
                                  borderRadius: '10px',
                                  transitionDuration: '0.3s',
                              }
                            : {
                                  borderRadius: '50%',
                                  transitionDuration: '0.3s',
                              }
                    }
                    onMouseOver={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                />
            )
        } else if (name === 'Home') {
            return (
                <Avatar
                    className="gamebar-avatar trans"
                    bg="none"
                    src={'chocodo192.png'}
                    variant="roundable"
                    sx={
                        isHovering || !currentGame
                            ? {
                                  bg: bgColor,
                                  img: {
                                      padding: '5px',
                                      borderRadius: 'none',
                                  },
                                  borderRadius: '10px',
                                  transitionDuration: '0.3s',
                              }
                            : {
                                  img: {
                                      padding: '5px',
                                      borderRadius: 'none',
                                  },
                                  borderRadius: '50%',
                                  transitionDuration: '0.3s',
                              }
                    }
                    onMouseOver={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                />
            )
        } else {
            return (
                <Avatar
                    className="gamebar-avatar trans"
                    src={imageURL}
                    onError={() => setIsRealImage(false)}
                    name={name}
                    variant="roundable"
                    sx={
                        isHovering || currentGame?.id === props.gameId
                            ? {
                                  img: {
                                      borderRadius: '10px',
                                      transitionDuration: '0.3s',
                                  },
                                  borderRadius: '10px',
                                  transitionDuration: '0.3s',
                              }
                            : {
                                  img: {
                                      borderRadius: '50%',
                                      transitionDuration: '0.3s',
                                  },
                                  borderRadius: '50%',
                                  transitionDuration: '0.3s',
                              }
                    }
                    onMouseOver={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    showBorder={true}
                    bgColor={imageURL && isRealImage ? bgColor : ''}
                >
                    {resetableTodoTasks && resetableTodoTasks > 0 ? (
                        <AvatarBadge
                            border="2px"
                            boxSize="1em"
                            color={badgeColor}
                            borderColor={badgeBgColor}
                            bg={badgeBgColor}
                        >
                            <Text fontSize="sm">
                                {resetableTodoTasks.toString()}
                            </Text>
                        </AvatarBadge>
                    ) : null}
                </Avatar>
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
