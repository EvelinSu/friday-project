import styled from "styled-components";
import ReactPaginate from "react-paginate";

export const MyPaginate = styled(ReactPaginate)`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0;
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
        color: ${(props) => props.theme.colors.textOnSecondary};
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
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

        a {
            background-color: transparent;
            color: ${({ theme }) => theme.colors.textOnPrimary};
        }
    }

    .arrow {
        background-color: transparent;
        cursor: pointer;
        border: 1px solid transparent;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }

    .break {
    }
`;
