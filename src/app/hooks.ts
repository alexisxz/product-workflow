import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./store";


export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()