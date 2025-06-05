import classes from "./TickedCard.module.scss";

function TickedCard({ ticket }: any) {
  const { price, carrier } = ticket;
  const {
    origin: originTo,
    destination: destinationTo,
    duration: durationTo,
    stops: stopsTo,
    date: dateTo,
  } = ticket.segments[0];

  const {
    origin: originBack,
    destination: destinationBack,
    duration: durationBack,
    stops: stopsBack,
    date: dateBack,
  } = ticket.segments[1];

  const durationToHour = Math.floor(durationTo / 60);
  const durationToMinutes = durationTo % 60;

  const durationBackHour = Math.floor(durationBack / 60);
  const durationBackMinutes = durationBack % 60;

  const timeTo = dateTo.split("T")[1].split(":");
  const tt = `${timeTo[0]}:${timeTo[1]}`;
  const fullTimeTo =
    Number(timeTo[0]) * 60 + Number(timeTo[1]) + Number(durationTo);
  const dTH =
    Math.floor(fullTimeTo / 60) < 24
      ? Math.floor(fullTimeTo / 60)
      : Math.floor(fullTimeTo / 60) - 24 > 9
      ? Math.floor(fullTimeTo / 60) - 24
      : `0${Math.floor(fullTimeTo / 60) - 24}`;
  const dTM = fullTimeTo % 60 < 10 ? `0${fullTimeTo % 60}` : fullTimeTo % 60;
  const tt2 = `${dTH}:${dTM}`;

  const timeBack = dateBack.split("T")[1].split(":");
  const tb = `${timeBack[0]}:${timeBack[1]}`;
  const fullTimeBack =
    Number(timeBack[0]) * 60 + Number(timeBack[1]) + Number(durationBack);
  const dBH =
    Math.floor(fullTimeBack / 60) < 24
      ? Math.floor(fullTimeBack / 60)
      : Math.floor(fullTimeBack / 60) - 24 > 9
      ? Math.floor(fullTimeBack / 60) - 24
      : `0${Math.floor(fullTimeBack / 60) - 24}`;
  const dBM =
    fullTimeBack % 60 < 10 ? `0${fullTimeBack % 60}` : fullTimeBack % 60;
  const tb2 = `${dBH}:${dBM}`;

  const stopsEdit = (stopsTo: any) => {
    return stopsTo.length == 0
      ? "0 ПЕРЕСАДОК"
      : stopsTo.length == 1
      ? "1 ПЕРЕСАДКА"
      : `${stopsTo.length} ПЕРЕСАДКИ`;
  };

  const stopsEditBack = (stopsBack: any) => {
    return stopsBack.length == 0
      ? "0 ПЕРЕСАДОК"
      : stopsBack.length == 1
      ? "1 ПЕРЕСАДКА"
      : `${stopsBack.length} ПЕРЕСАДКИ`;
  };

  return (
    <>
      <li className={classes.tickedCard}>
        <div className={classes.priceContainer}>
          <span className={classes.price}>{price} Р</span>
          <img
            src={`https://pics.avs.io/99/36/${carrier}.png`}
            className={classes.airlinesImg}
          />
        </div>

        <table className={classes.wayInfo}>
          <tbody className={classes.wayInfoBody}>
            <tr className={classes.firstTableHeader}>
              <th className={`${classes.thItem}`}>
                {originTo} - {destinationTo}
              </th>
              <th className={`${classes.thItem}`}>В пути</th>
              <th className={`${classes.thItem}`}>{stopsEdit(stopsTo)}</th>
            </tr>
            <tr className={classes.firstRow}>
              <td className={`${classes.tdItem}`}>
                {tt} - {tt2}
              </td>
              <td className={`${classes.tdItem}`}>
                {durationToHour}ч {durationToMinutes}м
              </td>
              <td className={`${classes.tdItem}`}>{stopsTo.join(", ")}</td>
            </tr>
            <tr className={classes.secondTableHeader}>
              <th className={`${classes.thItem}`}>
                {originBack} - {destinationBack}
              </th>
              <th className={`${classes.thItem}`}>В пути</th>
              <th className={`${classes.thItem}`}>
                {stopsEditBack(stopsBack)}
              </th>
            </tr>
            <tr className={classes.secondRow}>
              <td className={`${classes.tdItem}`}>
                {tb} - {tb2}
              </td>
              <td className={`${classes.tdItem}`}>
                {durationBackHour}ч {durationBackMinutes}м
              </td>
              <td className={`${classes.tdItem}`}>{stopsBack.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </li>
    </>
  );
}

export default TickedCard;
