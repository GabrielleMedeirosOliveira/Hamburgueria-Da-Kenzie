import "./App.css";
import { useEffect, useState } from "react";
import ProductsList from "./components/ProductList";
import Cart from "./components/Cart";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSale, setCurrentSale] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("https://hamburgueria-kenzie-json-serve.herokuapp.com/products")
      .then((response) => response)
      .then((response) => response.json())
      .then((response) => setProducts(response));
  }, []);

  useEffect(() => {
    setCartTotal(
      currentSale.reduce((previousValue, currentValue) => {
        return Number(currentValue.price) + Number(previousValue);
      }, 0)
    );
  }, [currentSale]);

  const showProducts = (value) => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.category.toLowerCase() === value.toLowerCase() ||
          product.name.toLowerCase() === value.toLowerCase()
      )
    );
  };

  const handleClick = (productId) => {
    if (currentSale.find((product) => product.id === productId)) {
      toast.error("Não é possível adicionar esse item novamente!");
    } else {
      toast.success("Produto Adicionado");
      setCurrentSale([
        ...currentSale,
        products.find((product) => product.id === productId),
      ]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Toaster />
          <h1>
            Burguer
            <span className="kenzie"> Kenzie</span>
          </h1>
        </div>

        <div className="searchField">
          <input
            type="text"
            placeholder="Digitar Pesquisa"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              showProducts(value);
            }}
          ></input>
          <button className="search" onClick={() => showProducts(value)}>
            Pesquisar
          </button>
        </div>
      </header>
      <main>
        <ul className="vitrine">
          <ProductsList
            products={
              filteredProducts.length === 0 ? products : filteredProducts
            }
            handleClick={handleClick}
          />
        </ul>
        <div className="cartDiv">
          <div className="cartHeader">
            <span>Carrinho de Compras</span>
          </div>
          {currentSale.length === 0 ? (
            <div className="emptyCart">
              <p className="name">Sua sacola está vazia</p>
              <p className="category">Adicione itens</p>
            </div>
          ) : (
            <div className="cart">
              <ul>
                <Cart
                  currentSale={currentSale}
                  setCurrentSale={setCurrentSale}
                />
              </ul>
              <div className="total">
                Total <span>R$ {cartTotal.toFixed(2)}</span>{" "}
              </div>
              <button
                className="removeAll"
                onClick={() => {
                  setCurrentSale([]);
                  toast.success("Produtos removidos com sucesso");
                }}
              >
                Remover todos
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
