import { useContext } from "react";
import { createContext } from "react";

export const TimeContext = createContext(); // Nome con maiuscola per convenzione
// Hook personalizzato per usare il contesto
export const useTimeContext = () => useContext(TimeContext);