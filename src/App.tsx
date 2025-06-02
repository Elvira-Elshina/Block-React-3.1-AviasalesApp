import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./hooks/myHooks";
import { setActiveSort, fetchTickets } from "./store/appSlice";
import { useDispatch } from "react-redux";

import TicketList from "./components/TicketsList/TicketList";
import Filters from "./components/Filters/Filters";

import classes from "./App.module.scss";

function AviasalesApp() {
  const [searchID, setSearchID] = useState("");
  const baseAPI = "https://aviasales-test-api.kata.academy";

  const dispatch = useDispatch();
  //получаем ключ поиска
  // useEffect(() => {
  //   fetch(`${baseAPI}/search`)
  //     .then((res) => res.json())
  //     .then((result) => setSearchID(result.searchId))
  //     .catch((err) => console.error(err));
  // }, []);

  //получаем пачку билетов
  useEffect(() => {
    // fetch(`${baseAPI}/tickets?searchId=${searchID}`)
    // .then(res => res.json())
    // .then(res => console.log(res))
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <>
      <img src="../src/images/Logo.svg" className={classes.imgLogo}></img>

      <div className={classes.generalContainer}>
        <Filters />
        <TicketList />
      </div>
    </>
  );
}

export default AviasalesApp;
