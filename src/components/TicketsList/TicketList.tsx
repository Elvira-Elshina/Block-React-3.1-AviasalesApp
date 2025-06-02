import TickedCard from "../TicketCard/TickedCard";
import classes from "./TicketList.module.scss";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/myHooks";
import { setActiveSort, fetchTickets } from "../../store/appSlice";

export function TicketList() {
  const dispatch = useAppDispatch();
  const ticketsArray = useAppSelector(
    (state) => state.searchReducer.searchResponse
  );

  ticketsArray.map((element) => {
    console.log(element);
  });

  return (
    <div className={classes.ticketList}>
      <div className={classes.filterTickets}>
        <button
          className={`${classes.filterItem} 
          ${classes.mostCheap} 
          ${classes.activeItem}`}
          onClick={() => {
            dispatch(setActiveSort("Самый дешёвый"));
          }}
        >
          Самый дешёвый
        </button>
        <button
          className={`${classes.filterItem} 
        ${classes.mostFast}`}
          onClick={() => dispatch(setActiveSort("Самый быстрый"))}
        >
          Самый быстрый
        </button>
        <button
          className={`${classes.filterItem} 
        ${classes.optimal}`}
          onClick={() => dispatch(setActiveSort("Оптимальный"))}
        >
          Оптимальный
        </button>
      </div>
      <ul className={classes.ticketsUl}>
        {ticketsArray?.map((ticket) => (
          <TickedCard ticket={ticket} />
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
