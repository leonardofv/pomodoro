import { createContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { cyclesReducer, type Cycle } from '../reducers/cycles/reducer';
import { createNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
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
  
  const [cyclesState, dispatch] = useReducer(cyclesReducer, { 
      
      cycles: [], 
      activeCycleId: null,

    }, (initialState) => {
      
        const storedStateAsJSON = localStorage.getItem('@pomodoro:cycles-1.0')

        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON);
        }

        return initialState;
      }   
  );


  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);


  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    
    if (activeCycle) {

      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
      
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem('@pomodoro:cyclesState-1.0', stateJSON);

  }, [cyclesState])


  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

   function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }


  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(createNewCycleAction(newCycle));
    setAmountSecondsPassed(0); //resetar o contador de segundos passados para 0 quando iniciar um novo ciclo

  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
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
