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

export function CyclesContextProvider({children,}: CyclesContextProviderProps) {

  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    
    // if para criar um novo ciclo pegando o estado anterior e adicionando um novo ciclo
    if (action.type === "CREATE_NEW_CYCLE") {
      return [...state, action.payload.newCycle];
    }

    return state;
  }, []);

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null); //str or null porque no início da aplicação não tem nenhum ciclo ativo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); //armazenar segundos que já se passaram desde o início do ciclo

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

    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0); //resetar o contador de segundos passados para 0 quando iniciar um novo ciclo

    //reset(); //usar defalt values para resetar o formulário para default
  }

  function markCurrentCycleAsFinished() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }; //adiciona a data de interrupção ao ciclo ativo
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );

    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
  }

  function interruptCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }; //adiciona a data de interrupção ao ciclo ativo
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );

    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });
    setActiveCycleId(null); //interrompe o ciclo ativo
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
