import "./addDecrementBtns.css";
import { useDispatch } from "react-redux";
import { increment, decrement, deleteProd } from "../../redux/state/shop";
import { ProductDetail } from "../../components/detailProduct/DetailProduct";
interface Props {
  updateState?: (type: string) => void;
  item: ProductDetail | null;
}

function AddDementBtns({ updateState, item }: Props) {
  const dispatch = useDispatch();
  const add = () => {
    if (!item) return;
    dispatch(increment(item));
    if (updateState) updateState("increment");
  };
  const handleDecrement = () => {
    if(item && item.quantity === 0)return

    if (item && item?.quantity <= 1) {
      dispatch(deleteProd(item?.id));
      if (updateState) updateState("initialState");
    } else {
      dispatch(decrement(item?.id));
      if (updateState) updateState("decrement");
    }
  };

  return (
    <div className="add-decrement">
      <button onClick={handleDecrement}> - </button>
      <input
        type="number"
        min={1}
        value={item?.quantity ? item?.quantity : 0}
        max={99}
        readOnly
      />
      <button onClick={add}> + </button>
    </div>
  );
}

export default AddDementBtns;
