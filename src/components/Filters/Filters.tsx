import classes from "./Filters.module.scss";
import { useAppSelector } from "../../hooks/myHooks";
import {
  toggleCheckbox1,
  toggleCheckbox2,
  toggleCheckbox3,
  toggleCheckbox4,
  toggleAll,
} from "../../store/appSlice";
import { useDispatch } from "react-redux";

function Filters() {
  const dispatch = useDispatch();
  const { withoutTr, oneTransfer, twoTransfers, threeTransfers } =
    useAppSelector((state) => state.filterReducer);

  const allChecked = withoutTr && oneTransfer && twoTransfers && threeTransfers;

  const handleToggleAll = () => {
    dispatch(toggleAll(!allChecked));
  };

  //типизированный список инпутов
  const filterItemsValues: {
    all: string;
    withoutTransfers: string;
    oneTransfer: string;
    twoTransfers: string;
    threeTransfers: string;
  } = {
    all: "Все",
    withoutTransfers: "Без пересадок",
    oneTransfer: "1 пересадка",
    twoTransfers: "2 пересадки",
    threeTransfers: "3 пересадки",
  };

  const customCheckbox = <span className={classes.customCheckbox}></span>;

  return (
    <div className={classes.transfers}>
      <div className={classes.transContainer}>
        <span className={classes.titleTransfers}>Количество пересадок</span>
        <ul className={classes.filtersList}>
          <li className={`${classes.filtersItem} ${classes.all}`}>
            <label className={classes.transfersCheck}>
              <input
                type="checkbox"
                className={classes.defaultCheckbox}
                checked={allChecked}
                onChange={handleToggleAll}
              />
              {customCheckbox}
              {filterItemsValues.all}
            </label>
          </li>

          <li className={`${classes.filtersItem} ${classes.withoutTransfers}`}>
            <label className={classes.transfersCheck}>
              <input
                type="checkbox"
                className={classes.defaultCheckbox}
                checked={withoutTr}
                onChange={() => dispatch(toggleCheckbox1())}
              />
              {customCheckbox}
              {filterItemsValues.withoutTransfers}
            </label>
          </li>

          <li className={`${classes.filtersItem} ${classes.oneTransfer}`}>
            <label className={classes.transfersCheck}>
              <input
                type="checkbox"
                className={classes.defaultCheckbox}
                checked={oneTransfer}
                onChange={() => dispatch(toggleCheckbox2())}
              />
              {customCheckbox}
              {filterItemsValues.oneTransfer}
            </label>
          </li>

          <li className={`${classes.filtersItem} ${classes.twoTransfers}`}>
            <label className={classes.transfersCheck}>
              <input
                type="checkbox"
                className={classes.defaultCheckbox}
                checked={twoTransfers}
                onChange={() => dispatch(toggleCheckbox3())}
              />
              {customCheckbox}
              {filterItemsValues.twoTransfers}
            </label>
          </li>

          <li className={`${classes.filtersItem} ${classes.threeTransfers}`}>
            <label className={classes.transfersCheck}>
              <input
                type="checkbox"
                className={classes.defaultCheckbox}
                checked={threeTransfers}
                onChange={() => dispatch(toggleCheckbox4())}
              />
              {customCheckbox}
              {filterItemsValues.threeTransfers}
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filters;
