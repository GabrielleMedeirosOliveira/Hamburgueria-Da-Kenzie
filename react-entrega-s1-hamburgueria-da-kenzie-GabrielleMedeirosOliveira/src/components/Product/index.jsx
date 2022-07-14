import "./styles.css";

const Product = ({ products, handleClick }) => {
  return (
    <li className="cardBox">
      <div className="cardTop">
        <img src={products.img} alt={products.name}></img>
      </div>
      <div className="cardBottom">
        <span className="name">{products.name}</span>
        <span className="category">{products.category}</span>
        <span className="price">R$ {products.price.toFixed(2)}</span>
        <button className="cardButton" onClick={() => handleClick(products.id)}>
          Adicionar
        </button>
      </div>
    </li>
  );
};

export default Product;
