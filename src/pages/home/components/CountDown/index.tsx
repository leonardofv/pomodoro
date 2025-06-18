import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { cyclesContext } from "../../../../contexts/CyclesContext";

export function CountDown() {

  const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(cyclesContext);
  
  //se ciclo ativo, retorna o total de segundos do ciclo ativo.
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();

          setSecondsPassed(totalSeconds); // contador ficar zerado no final do ciclo
          clearInterval(interval); //quando completar o ciclo, parar execução do intervalo
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval); //limpar o intervalo para não criar em cima do outro
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed]); //sempre que usamos uma variável externa, temos que colocar no array de dependências

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60); //minutos inteiros
  const secondsAmount = currentSeconds % 60; // resto da visião dos segundos por 60 para pegar os segundos

  //se for menor que 10, adiciona um 0 na frente
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  //mostrar o tempo no título da página
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountDownContainer>
      {/* trabalhando com strings como se forrem arrays nos minutes e seconds */}
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
