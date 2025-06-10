import { useForm } from 'react-hook-form';
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'; 
import { createContext, useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { HomeContainer, 
         StartCountDownButton,
         StopCountDownButton 
        } from './styles';

        
import { NewCycleForm } from './components/NewCycleForm';
import { CountDown } from './components/CountDown';




interface NewCycleFormData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}

//interface para o contexto
interface CyclesContextType {
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    markCurrentCycleAsFinished: () => void,
}

export const cyclesContext = createContext({} as CyclesContextType);

export function Home() {
//                             tipo do useState, um array de Cycle       
    const [ cycles, setCycles ] = useState<Cycle[]>([]); //iniciando como um array vazio de cycles
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null); //str or null porque no início da aplicação não tem nenhum ciclo ativo


    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); //se o ciclo ativo é igual ao id do ciclo ativo, retorna o ciclo ativo

    function markCurrentCycleAsFinished() {
        setCycles((state) => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }  //adiciona a data de interrupção ao ciclo ativo
            } else {
                return cycle;
            }
        }));
    }

    
    // function handleCreateNewCycle(data: NewCycleFormData) {
    //     const newCycle: Cycle = {
    //         id: String(new Date().getTime()),
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date(),
    //     }
    //     setCycles((state) => [...state, newCycle]);  //pego o estado atual da variável de ciclos, copia o estado atual e adicona o novo ciclo
    //     setActiveCycleId(newCycle.id);
    //     setAmountSecondsPassed(0); //resetar o contador de segundos passados para 0 quando iniciar um novo ciclo
        
    //     reset(); //usar defalt values para resetar o formulário para default
    // }




    // const task = watch('task'); //observando valor do input task
    // const isSubmitDisabled = !task; //botão desativado quando o input estiver vazio

    function handleInterruptCycle() {

        setCycles((state) => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }  //adiciona a data de interrupção ao ciclo ativo
            } else {
                return cycle;
            }
        }));

        setActiveCycleId(null);    //interrompe o ciclo ativo
    }

    return (
       <HomeContainer>
        <form /*onSubmit={handleSubmit(handleCreateNewCycle)} */>            
            <cyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
                {/* <NewCycleForm /> */}
                <CountDown  />
            </cyclesContext.Provider>

            {
                activeCycle ? (
                    <StopCountDownButton type="button" onClick={handleInterruptCycle}>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton /*disabled={isSubmitDisabled}*/ type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                )
            }
            
        </form>
       </HomeContainer> 
    )
}