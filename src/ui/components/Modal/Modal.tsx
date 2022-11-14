import React, {FC} from 'react';
import {SModalBody, SModalContainer, SModalFooter, SModalHeader} from "./styled";

type TModalProps = {
    title: string
    body: React.ReactNode
    shadow?: boolean
    footer?: React.ReactNode
    width?: string
}

export const Modal: FC<TModalProps> = (props) => {
    return (
        <SModalContainer width={props.width}>
            <SModalHeader>
                {props.title}
            </SModalHeader>
            <SModalBody>
                {props.body}
            </SModalBody>
            {props.footer && (
                <SModalFooter>
                    {props.footer}
                </SModalFooter>
            )}
        </SModalContainer>
    )
}

