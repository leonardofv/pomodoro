import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { cyclesContext } from "../../../../contexts/CyclesContext";


export function NewCycleForm() {
  
  const { activeCycle } = useContext(cyclesContext);
  const { register } = useFormContext();

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
