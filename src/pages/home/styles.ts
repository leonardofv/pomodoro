import styled from "styled-components";

export const HomeContainer = styled.main`
    /* border: 2px solid yellow; */
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;



export const BaseCountDownButton = styled.button`
    width: 60%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;
    cursor: pointer;

    background-color: ${props => props.theme['green-500']};
    color: ${props => props.theme['gray-100']};

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background: ${props => props.theme['green-700']};
    }
`;


export const StartCountDownButton = styled(BaseCountDownButton)`
    background-color: ${props => props.theme['green-500']};

    &:not(:disabled):hover {
        background: ${props => props.theme['green-700']};
    }
`;


export const StopCountDownButton = styled(BaseCountDownButton)`
    background-color: ${props => props.theme['red-500']};

    &:not(:disabled):hover {
        background: ${props => props.theme['red-700']};
    }
`;