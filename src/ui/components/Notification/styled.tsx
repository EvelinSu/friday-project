import styled from "styled-components";

type TSNotificationContainerProps = {
    severity?: "error"
}
export const SNotificationWrapper = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    bottom: 20px;
    left: 50%;
    right: 50%;
    color: #fff;
    z-index: ${({theme}) => theme.orders.notifications};
`

export const SNotificationContainer = styled.div<TSNotificationContainerProps>`
    display: flex;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    width: 330px;
    box-shadow: 1px 1px 2px rgb(0, 0, 0, 0.1), -1px -1px 2px rgb(0, 0, 0, 0.1);
    padding: 10px 20px;
    background-color: ${props => (props.severity === "error" && props.theme.colors.severity.error)};
    z-index: ${({theme}) => theme.orders.notifications};
`

export const SNotificationIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    margin-left: auto;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    svg{
        width: 18px;
        height: 18px;
    }
    &:hover{
        background-color: rgba(255, 255, 255, 0.1);
    }
`