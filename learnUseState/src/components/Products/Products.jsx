import React from "react";
import { useState } from "react";

function ProductsApp() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", qty: 1 },
    { id: 2, name: "Mouse", qty: 1 },
    { id: 3, name: "Keyboard", qty: 1 },
  ]);
  const MIN_LIMIT = 0;
  const MAX_LIMIT = 50;

  function handleDelete(id) {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  }

  function handleIncrement(id) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              qty: product.qty < MAX_LIMIT ? product.qty + 1 : MAX_LIMIT,
            }
          : product,
      ),
    );
  }

  function handleDecrement(id) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? {
                ...product,
                qty: product.qty > MIN_LIMIT ? product.qty - 1 : MIN_LIMIT,
              }
            : product,
        ),
      );
  }

  return (
    <div className="Container">
      <h1>Daftar Produk</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>Nama Produk: {product.name}</p>
              <p>Kuantitas: {product.qty}</p>
              <button onClick={() => handleIncrement(product.id)}>
                Tambah qty
              </button>
              <button onClick={() => handleDecrement(product.id)}>Kurang qty</button>
              {product.qty >= MAX_LIMIT && (
                <p>Batas Maksimum Kuantitas</p>
              )}
              {product.qty <= MIN_LIMIT && (
                <p>Batas Minimum Kuantitas</p>
              )}
              <button onClick={() => handleDelete(product.id)}>
                Hapus produk
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Produk Kosong!</p>
      )}
    </div>
  );
}

export default ProductsApp;
