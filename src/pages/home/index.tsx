import { FormProvider, useForm } from "react-hook-form";
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createContext, useState } from "react";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";

interface NewCycleFormData {
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
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const cyclesContext = createContext({} as CyclesContextType);

// zod.object porque o data quando cria um novo ciclo é um objeto
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a terefa"),
  minutesAmount: zod
    .number()
    .min(1, "Ciclo de no minimo 5 minutos")
    .max(60, "Ciclo de no máximo 60 minutos"),
});

export function Home() {
    
  //desestruturação  do useForm              valores da interface no defaultValues
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  //                             tipo do useState, um array de Cycle
  const [cycles, setCycles] = useState<Cycle[]>([]); //iniciando como um array vazio de cycles
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null); //str or null porque no início da aplicação não tem nenhum ciclo ativo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); //armazenar segundos que já se passaram desde o início do ciclo

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); //se o ciclo ativo é igual ao id do ciclo ativo, retorna o ciclo ativo

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }; //adiciona a data de interrupção ao ciclo ativo
        } else {
          return cycle;
        }
      })
    );
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]); //pego o estado atual da variável de ciclos, copia o estado atual e adicona o novo ciclo
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0); //resetar o contador de segundos passados para 0 quando iniciar um novo ciclo

    reset(); //usar defalt values para resetar o formulário para default
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }; //adiciona a data de interrupção ao ciclo ativo
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null); //interrompe o ciclo ativo
  }

  const task = watch("task"); //observando valor do input task
  const isSubmitDisabled = !task; //botão desativado quando o input estiver vazio

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <cyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </cyclesContext.Provider>

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
