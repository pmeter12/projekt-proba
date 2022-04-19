import * as React from "react";
import logo from './logo.svg';
import './App.css';
import { listaLogUlaza, listaLogUlaza } from "./api/api";

const App = () => {
  const[listaLogUlaza,kreirajLogUlaze] = useState([]);
}

const getEntries = async () => {
  const listaLogUlaza = await listaLogUlaza();
  setLogEntries(listaLogUlaza);
  console.log(listaLogUlaza);
};
