import styled from "styled-components";

export const HistoryContainer = styled.main`
    /* border: 1px solid yellow; */
    flex: 1;
    padding: 3.5rem;

    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.5rem;
        color: ${props => props.theme['gray-100']};
    }
`;


export const HistoryList = styled.div`
    /* border: 1px solid yellow; */
    flex: 1;  //ocupar todo o espaço disponível
    overflow: auto; //criar barra de rolagem quando necessário

    table {
        width: 100%;
        border-collapse: collapse; //tira a separação entre as linhas
        min-width: 600px;
        
        th {
            /* border: 1px solid #fff; */
            background-color: ${props => props.theme['gray-600']};
            padding: 1rem;
            text-align: left;
            color: ${props => props.theme['gray-100']};
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                padding-left: 1.5rem;
            }
            &:last-child {
                border-top-right-radius: 10px;
                padding-right: 1.5rem;
            }
        }
        td {
            background-color: ${props => props.theme['gray-700']};
            border-top: 4px solid ${props => props.theme['gray-800']};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                width: 50%;
                padding-left: 1.5rem;
            }
            &:last-child {
                padding-right: 1.5rem;
            }
        }
    }
`;

const STATUS_COLORS = {
    green: 'green-500',
    yellow: 'yellow-500',
    red: 'red-500',
} as const 
//a const faz que quando seja utilizado o statusColor, ele só aceite esses valores e não uma string qualquer porque no tema não tem uma string qualquer

interface StatusProps {
    statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
    /* border: 1px solid yellow; */
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${props => props.theme[STATUS_COLORS[props.statusColor]]};
    }
`;