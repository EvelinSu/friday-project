import styled from "styled-components";
import ReactPaginate from "react-paginate";

export const MyPaginate = styled(ReactPaginate)`
    display: flex;
    align-items: center;
    padding: 30px 0 20px 0;
    gap: 15px;
    column-gap: 15px;
    row-gap: 15px;
    margin-top: auto;
    user-select: none;
    ms-user-select: none;
    text-decoration: none;
    list-style-type: none;
    margin-bottom: 0;

    .page-item {
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        padding: 5px;
        font-size: 12px;
        min-width: 30px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.05);
        cursor: pointer;

        &:hover {
            transform: scale(0.9);
        }
    }

    .disabled {
        pointer-events: none;
        opacity: 0.6;
    }

    .active {
        background-color: ${({ theme }) => theme.colors.primary};
        pointer-events: none;
        border-radius: 50%;
        color: ${({ theme }) => theme.colors.textOnPrimary};
    }

    .arrow {
        background-color: transparent;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }

    .break {
    }
`;
