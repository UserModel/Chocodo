import { Wrap, Tooltip, Avatar } from "@chakra-ui/react";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";

type PropTypes = {
  name: string;
  onClick: Function;
  imageURL: string;
  gameId: number;
};

export const RoundButton = (props: PropTypes) => {
  let imageURL = props.imageURL;
  let onClickFunction = props.onClick;
  let name = props.name;

  const avatarRender = () => {
    if (name === "Add a Game") {
      return <Avatar bgColor="#36393E" icon={<AddIcon color="green" />} />;
    } else {
      return <Avatar src={imageURL} name={name} />;
    }
  };

  return (
    <Wrap className="avatar-button" onClick={() => onClickFunction(props.gameId)}>
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
  );
};
