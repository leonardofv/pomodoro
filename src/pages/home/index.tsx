import { FormProvider, useForm } from "react-hook-form";
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useContext } from "react";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { cyclesContext } from "../../contexts/CyclesContext";

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}



// zod.object porque o data quando cria um novo ciclo é um objeto
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a terefa"),
  minutesAmount: zod
    .number()
    .min(1, "Ciclo de no minimo 5 minutos")
    .max(60, "Ciclo de no máximo 60 minutos"),
});

export function Home() {

  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(cyclesContext);
    
  //desestruturação  do useForm              valores da interface no defaultValues
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  

  const task = watch("task"); //observando valor do input task
  const isSubmitDisabled = !task; //botão desativado quando o input estiver vazio

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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
