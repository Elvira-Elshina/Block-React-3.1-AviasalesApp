import TickedCard from "../TicketCard/TickedCard";
import classes from "./TicketList.module.scss";
import { useEffect, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Alert, Button } from "antd";

import { useAppDispatch, useAppSelector } from "../../hooks/myHooks";
import { setActiveSort, sortTickets } from "../../store/appSlice";

export function TicketList() {
  const dispatch = useAppDispatch();
  const ticketsArray = useAppSelector(
    (state) => state.searchReducer.searchResponse
  );
  const activeSort = useAppSelector((state) => state.mySliceReducer.activeSort);
  const sortedTickets = useAppSelector(
    (state) => state.mySliceReducer.sortedTickets
  );
  const { withoutTr, oneTransfer, twoTransfers, threeTransfers } =
    useAppSelector((state) => state.mySliceReducer);
  const load = useAppSelector((state) => state.searchReducer.loading);
  const err = useAppSelector((state) => state.searchReducer.error);
  const [visibleTickets, setVisibleTickets] = useState(5);

  useEffect(() => {
    dispatch(sortTickets(ticketsArray));
  }, [
    ticketsArray,
    activeSort,
    withoutTr,
    oneTransfer,
    twoTransfers,
    threeTransfers,
    dispatch,
  ]);

  const showMoreTickets = () => {
    setVisibleTickets((prev) => prev + 5);
  };

  return (
    <div className={classes.ticketList}>
      <div className={classes.filterTickets}>
        <button
          className={`${classes.filterItem} 
          ${classes.mostCheap} 
          ${activeSort === "Самый дешёвый" ? classes.activeItem : ""}`}
          onClick={() => {
            dispatch(setActiveSort("Самый дешёвый"));
          }}
        >
          Самый дешёвый
        </button>
        <button
          className={`${classes.filterItem} 
          ${classes.mostFast}
          ${activeSort === "Самый быстрый" ? classes.activeItem : ""}`}
          onClick={() => dispatch(setActiveSort("Самый быстрый"))}
        >
          Самый быстрый
        </button>
        <button
          className={`${classes.filterItem} 
          ${classes.optimal}
          ${activeSort === "Оптимальный" ? classes.activeItem : ""}`}
          onClick={() => dispatch(setActiveSort("Оптимальный"))}
        >
          Оптимальный
        </button>
      </div>
      <ul className={classes.ticketsUl}>
        {typeof err === "string" ? (
          <Alert message={err} type="error" showIcon />
        ) : null}
        {load && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
            />
          </div>
        )}
        {sortedTickets?.slice(0, visibleTickets).map((ticket, i) => (
          <TickedCard
            ticket={ticket}
            key={
              `${ticket.price}-${ticket.carrier}-${ticket.segments[0].origin}-${ticket.segments[0].destination}-${ticket.segments[0].date}-${ticket.segments[1].date}` +
              i
            }
          />
        ))}
      </ul>
      {sortedTickets && sortedTickets.length > visibleTickets && (
        <Button
          type="primary"
          onClick={showMoreTickets}
          style={{ width: "100%", marginTop: "20px" }}
        >
          Показать еще 5 билетов
        </Button>
      )}
    </div>
  );
}

export default TicketList;
