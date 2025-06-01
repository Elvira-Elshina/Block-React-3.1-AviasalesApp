import classes from "./TickedCard.module.scss";

function TickedCard() {
  return (
    <>
      <li className={classes.tickedCard}>
        <div className={classes.priceContainer}>
          <span className={classes.price}>13 400 Р</span>
          <img src="./src/images/S7Logo.svg" className={classes.airlinesImg} />
        </div>

        <table className={classes.wayInfo}>
          <tbody className={classes.wayInfoBody}>
            <tr className={classes.firstTableHeader}>
              <th className={`${classes.thItem}`}>MOW-HKT</th>
              <th className={`${classes.thItem}`}>В пути</th>
              <th className={`${classes.thItem}`}>2 пересадки</th>
            </tr>
            <tr className={classes.firstRow}>
              <td className={`${classes.tdItem}`}>10:45-08:00</td>
              <td className={`${classes.tdItem}`}>21ч 15м</td>
              <td className={`${classes.tdItem}`}>HKG, JNB</td>
            </tr>
            <tr className={classes.secondTableHeader}>
              <th className={`${classes.thItem}`}>MOW-HKT</th>
              <th className={`${classes.thItem}`}>В пути</th>
              <th className={`${classes.thItem}`}>1 пересадка</th>
            </tr>
            <tr className={classes.secondRow}>
              <td className={`${classes.tdItem}`}>11:20-00:50</td>
              <td className={`${classes.tdItem}`}>13ч 30м</td>
              <td className={`${classes.tdItem}`}>HKG</td>
            </tr>
          </tbody>
        </table>
      </li>
    </>
  );
}

export default TickedCard;
