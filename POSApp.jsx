import { useState } from "react";

const initialProducts = [
  { id: "1234567890123", name: "Apă plată 0.5L", price: 3.5 },
  { id: "9876543210987", name: "Pâine albă", price: 5.0 },
  { id: "5432109876543", name: "Lapte 1L", price: 7.0 },
];

export default function POSApp() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [barcode, setBarcode] = useState("");

  const handleScan = () => {
    const product = products.find((p) => p.id === barcode);
    if (product) {
      setCart((prev) => [...prev, product]);
      setBarcode("");
    } else {
      alert("Produsul nu a fost găsit!");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Magazin POS Web</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Scanează codul de bare"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button onClick={handleScan} style={{ marginLeft: "0.5rem" }}>Adaugă</button>
      </div>
      <div>
        {cart.map((item, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{item.name}</span>
            <span>{item.price.toFixed(2)} RON</span>
          </div>
        ))}
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
          <span>Total</span>
          <span>{total} RON</span>
        </div>
      </div>
    </div>
  );
}
