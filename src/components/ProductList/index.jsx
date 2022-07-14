import Product from "../Product";

const ProductsList = ({ products, handleClick }) => {
  return products.map((product) => (
    <Product products={product} key={product.id} handleClick={handleClick} />
  ));
};

export default ProductsList;
