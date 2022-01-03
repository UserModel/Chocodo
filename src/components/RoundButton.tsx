import { Wrap, Tooltip, Avatar, Stack, HStack, VStack, Button, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

type PropTypes = {
    name: string,
    onClick: Function,
    imageURL: string
}

export const RoundButton = (props: PropTypes) => {
    let imageURL = props.imageURL;
    let onClickFunction = props.onClick;
    let name = props.name;

    const avatarRender = () => {
        if ( name === "Add a Game" ) {
            return <Avatar icon={<AddIcon />} />
        } else {
           return <Avatar src={imageURL} name={name} />;
        }
    }

    return(
        <Wrap className='avatar-button' onClick={() => onClickFunction()}>
            <Tooltip hasArrow label={name} bg='gray.300' color='black' placement='right' openDelay={500}>
                {avatarRender()}
            </Tooltip>
        </Wrap>
    );
}