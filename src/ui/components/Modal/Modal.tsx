import React, {FC} from 'react';
import {SModalBody, SModalContainer, SModalFooter, SModalHeader, SModalWrapper} from "./styled";

type TModalProps = {
    title: string
    body: React.ReactNode
    shadow?: boolean
    footer?: React.ReactNode
    width?: string
}

const Modal: FC<TModalProps> = (props) => {
    return (
        <SModalWrapper shadow={props.shadow}>
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

        </SModalWrapper>
    );
};

export default Modal;
