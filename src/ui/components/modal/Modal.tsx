import React from 'react';
import {MegaShadow} from "../MegaShadow/MegaShadow";
import {SModalWrapper} from "./styled";
import DefaultModal from "./Default/DefaultModal";


type TModalProps = {
    type: 'auth' | 'default'
    isOpened?: boolean
    setIsOpened?: (isOpened: boolean) => void
    onSuccessClick?: () => void
}

const Modal: React.FC<TModalProps> = (props) => {

    const onShadowClick = () => {
        props.setIsOpened && props.setIsOpened(!props.isOpened)
    }

    return props.isOpened ? (
        <MegaShadow onMouseDown={onShadowClick}>
            <SModalWrapper onMouseDown={(e) => e.stopPropagation()}>
                {props.type === 'default' && (
                    <DefaultModal
                        onCancelClick={() => props.setIsOpened && props.setIsOpened(false)}
                        onSuccessClick={() => props.onSuccessClick && props.onSuccessClick()}
                    />
                )}
            </SModalWrapper>
        </MegaShadow>
    ) : <></>
};

export default Modal;
