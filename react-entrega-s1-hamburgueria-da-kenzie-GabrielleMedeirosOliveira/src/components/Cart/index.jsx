import "./styles.css";
import toast from "react-hot-toast";

const Cart = ({ currentSale, setCurrentSale }) => {
  const removeItem = (product) => {
    const newCurrentSale = currentSale.filter((x) => x.id !== product.id);
    setCurrentSale(newCurrentSale);
    toast.success("Item removido");
  };

  return currentSale.map((product) => (
    <li className="cartCard">
      <div className="container">
        <img className="imgCart" src={product.img} alt={product.name}></img>
        <div className="info">
          <p className="name">{product.name}</p>
          <p className="category">{product.category}</p>
        </div>
      </div>
      <button
        className="remove"
        onClick={() => {
          removeItem(product);
        }}
      >
        Remover
      </button>
    </li>
  ));
};

export default Cart;
