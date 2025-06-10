import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export function NewCycleForm() {


  // zod.object porque o o data quando cria um novo ciclo é um objeto
const newCycleFormValidationSchema = zod.object({
    task:  zod
        .string()
        .min(1, 'Informe a terefa'),
    minutesAmount: zod
        .number()
        .min(1, 'Ciclo de no minimo 5 minutos')
        .max(60, 'Ciclo de no máximo 60 minutos'),
});


    //desestruturação  do useForm              valores da interface no defaultValues      
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolverver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });


  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="dê um nome para sua tarefa"
        disabled={activeCycle ? true : false}
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="values 1" />
        <option value="values 2" />
        <option value="values 3" />
        <option value="values 4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        disabled={activeCycle ? true : false}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
