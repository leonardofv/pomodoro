import { createContext, useReducer, useState, type ReactNode } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

//interface para o contexto
interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const cyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesContextProvider({children,}: CyclesContextProviderProps) {
  
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {

      switch(action.type) {
        case 'CREATE_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id, //pegando o id do ciclo ativo e já setando como ciclo ativo
          };

        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }; //adiciona a data de interrupção ao ciclo ativo
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };

        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() }; //adiciona a data de interrupção ao ciclo ativo
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };

        default:
          return state;
      } 

    },

      { cycles: [], activeCycleId: null }
      
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); //armazenar segundos que já se passaram desde o início do ciclo

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); //se o ciclo ativo é igual ao id do ciclo ativo, retorna o ciclo ativo

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    //setCycles((state) => [...state, newCycle]); //pego o estado atual da variável de ciclos, copia o estado atual e adicona o novo ciclo
    dispatch({
      type: "CREATE_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0); //resetar o contador de segundos passados para 0 quando iniciar um novo ciclo

    //reset(); //usar defalt values para resetar o formulário para default
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
  }

  function interruptCurrentCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });
  }

  return (
    <cyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </cyclesContext.Provider>
  );
}
