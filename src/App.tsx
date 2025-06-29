import { useEffect } from "react";
import { fetchTickets } from "./store/appSlice";
import logo from "./images/Logo.svg";

import { useAppDispatch } from "./hooks/myHooks";

import TicketList from "./components/TicketsList/TicketList";
import Filters from "./components/Filters/Filters";

import classes from "./App.module.scss";

function AviasalesApp() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <>
      <img src={logo} className={classes.imgLogo}></img>

      <div className={classes.generalContainer}>
        <Filters />
        <TicketList />
      </div>
    </>
  );
}

export default AviasalesApp;
