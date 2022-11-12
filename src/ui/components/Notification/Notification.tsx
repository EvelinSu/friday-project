import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {SNotificationContainer, SNotificationIcon, SNotificationWrapper} from "./styled";
import {SText} from "../Text/SText";
import CloseIcon from "../../assets/icons/CloseIcon";
import {setAppError, setAppLastError} from "../../../bll/appReducer";

const Notification = () => {

    const dispatch = useAppDispatch()
    const {errors} = useAppSelector(state => state.app)

    const [timerId, setTimerId] = useState(0)

    const setIsOpen = (error: string) => {
        dispatch(setAppError(errors.filter(el => el !== error)))
    };

    const stopTimer = () => {
        clearInterval(timerId)
    }

    const startTimer = () => {
        stopTimer()
        const id: number = window.setInterval(() => {
            dispatch(setAppLastError())
        }, 2900)
        setTimerId(id)
    }

    useEffect(() => {
        errors.length ? startTimer() : stopTimer()
    }, [errors])

    return (
        errors
            ?
            <SNotificationWrapper
                notificationsCount={errors.length < 100 ? errors.length : '99+'}
            >
                {errors.map((el, i) => (
                    <SNotificationContainer
                        onMouseOver={stopTimer}
                        onMouseLeave={startTimer}
                        key={el + i}
                        severity={"error"}
                    >
                        <SText lineClamp={2}>
                            {el}
                        </SText>
                        <SNotificationIcon onClick={() => setIsOpen(el)}>
                            <CloseIcon />
                        </SNotificationIcon>
                    </SNotificationContainer>
                ))}
            </SNotificationWrapper>
            : <></>

    );
};

export default Notification;
