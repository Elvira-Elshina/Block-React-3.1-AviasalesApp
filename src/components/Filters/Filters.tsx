import classes from "./Filters.module.scss";
import { useAppSelector } from "../../hooks/myHooks";
import { setTransferFilters } from "../../store/appSlice";
import { useDispatch } from "react-redux";

function Filters() {
  const dispatch = useDispatch();
  const { withoutTr, oneTransfer, twoTransfers, threeTransfers } =
    useAppSelector((state) => state.mySliceReducer);

  const allChecked = withoutTr && oneTransfer && twoTransfers && threeTransfers;

  const handleToggleAll = () => {
    dispatch(setTransferFilters({
      withoutTr: !allChecked,
      oneTransfer: !allChecked,
      twoTransfers: !allChecked,
      threeTransfers: !allChecked
    }));
  };

  const handleToggleTransfer = (type: string) => {
    const newState = {
      withoutTr,
      oneTransfer,
      twoTransfers,
      threeTransfers
    };

    switch (type) {
      case 'withoutTr':
        newState.withoutTr = !withoutTr;
        break;
      case 'oneTransfer':
        newState.oneTransfer = !oneTransfer;
        break;
      case 'twoTransfers':
        newState.twoTransfers = !twoTransfers;
        break;
      case 'threeTransfers':
        newState.threeTransfers = !threeTransfers;
        break;
    }

    dispatch(setTransferFilters(newState));
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
                onChange={() => handleToggleTransfer('withoutTr')}
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
                onChange={() => handleToggleTransfer('oneTransfer')}
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
                onChange={() => handleToggleTransfer('twoTransfers')}
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
                onChange={() => handleToggleTransfer('threeTransfers')}
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
