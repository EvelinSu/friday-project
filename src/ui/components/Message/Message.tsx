import React, {FC} from 'react';
import {
    SMessage,
    SMessageAvatar,
    SMessageContainer,
    SMessageContent,
    SMessageText,
    SMessageTime,
    SMessageTitle
} from "./styled";

type TMessageProps = {
    text: string,
    time: string,
    me?: boolean,
    name?: string,
    avatar?: string,

}

const Message: FC<TMessageProps> = ({ text, time, me, name, avatar}) => {
    return (
        <SMessage isMine={me}>
            {avatar &&
                <SMessageAvatar src={avatar}/>
            }
            <SMessageContainer isMine={me}>
                {name &&
                    <SMessageTitle>{name}</SMessageTitle>
                }
                <SMessageContent>
                    <SMessageText>{text}</SMessageText>
                    <SMessageTime>{time}</SMessageTime>
                </SMessageContent>
            </SMessageContainer>
        </SMessage>
    );
};

export default Message;



