import styled from 'styled-components';

export const HeaderContainer = styled.header`

    /* border: 2px solid red; */
    display: flex;
    justify-content: space-between;
    
    nav {

        /* border: 2px solid green; */
        display: flex;
        gap: 0.5rem;
        
        a {
            /* border: 1px solid white; */
            width: 3rem;
            width: 3rem;
            height: 3rem;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            color: ${props => props.theme['gray-100']};
            
            border-top: 3px solid transparent;  //borda para centralizar ícone
            border-bottom: 3px solid transparent; //borda trasparente para não fazer ícone se deslocar
            
            &:hover {
                border-bottom: 3px solid ${props => props.theme['green-500']};
            }
            
            &.active {
                color: ${props => props.theme['green-500']};
            }
        }
    }
`;