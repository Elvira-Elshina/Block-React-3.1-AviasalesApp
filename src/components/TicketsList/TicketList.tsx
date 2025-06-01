import TickedCard from "../TicketCard/TickedCard";
import classes from "./TicketList.module.scss";

import { useAppDispatch, useAppSelector } from "../../hooks/myHooks";
import { setActiveSort } from "../../store/appSlice";

export function TicketList() {
  const dispatch = useAppDispatch();

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
        <TickedCard />
        <TickedCard />
        <TickedCard />
        <TickedCard />
        <TickedCard />
        <TickedCard />
      </ul>
    </div>
  );
}

export default TicketList;
