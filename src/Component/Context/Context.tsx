import { createContext } from "react";
import { ResponseType, CartType } from "../CommenType/Types";

type User = {
  id: number;
  full_name: string;
  email: string;
};

type UserContextType = {
  user?: User;
  setUser?: (u: User) => void;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: undefined,
  isLoggedIn: false,
});

type Alert = {
  message: string;
  type: string;
};
type AlertContextType = {
  alert?: Alert;
  setAlert?: (a: Alert) => void;
  RemoveAlert?: () => void;
};

export const AlertContext = createContext<AlertContextType>({
  alert: undefined,
  setAlert(){},
  RemoveAlert(){},
});

type CartContextType = {
  totalproduct?: ResponseType[];
  CartTotal?: number;
  updateCart?: (cart: CartType) => void;
  addToCart?: (x: number, y: number) => void;
};

export const CartContext = createContext<CartContextType>({
  totalproduct: undefined,
  CartTotal: undefined,
  updateCart: undefined,
  addToCart: undefined,
});
