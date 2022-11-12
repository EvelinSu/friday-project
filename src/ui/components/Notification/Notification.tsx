import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {SNotificationContainer, SNotificationIcon, SNotificationWrapper} from "./styled";
import {SText} from "../Text/SText";
import CloseIcon from "../../assets/icons/CloseIcon";
import {setAppError} from "../../../bll/appReducer";

const Notification = () => {

    const dispatch = useAppDispatch()
    const {errors} = useAppSelector(state => state.app)

    const onClickHandler = () => {

    };
    const setIsOpen = (error: string) => {
        dispatch(setAppError(errors.filter(el => el !== error)))
    };

    return (
        errors
            ?
            <SNotificationWrapper onClick={onClickHandler}>
                {errors.map((el) => (
                    <SNotificationContainer key={el} severity={"error"}>
                        <SText>
                            {el}
                        </SText>
                        <SNotificationIcon onClick={() => setIsOpen(el)}>
                            <CloseIcon/>
                        </SNotificationIcon>
                    </SNotificationContainer>
                ))}
            </SNotificationWrapper>
            : <></>

    );
};

export default Notification;
