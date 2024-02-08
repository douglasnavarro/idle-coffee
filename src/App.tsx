import { useState } from "react";
import "./App.css";
import Inventory, { Item } from "./components/Inventory";
import Market from "./components/Market";

const useBalance = (initialBalance: number) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  return {
    balance,
    deductFromBalance: (amount: number) => {
      if (balance - amount < 0) {
        throw new Error("Insufficient funds");
      }
      setBalance(balance - amount);
    },
  };
};

const useInventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  return { items, addItem: (item: Item) => setItems([...items, item]) };
};

function App() {
  const { balance, deductFromBalance } = useBalance(10);
  const { items, addItem } = useInventory();
  return (
    <div className="App">
      <header className="App-header">
        <body>
          <p>Balance: {balance}</p>
          <Market deductBalance={deductFromBalance} addItem={addItem} />
          <Inventory items={items} />
        </body>
      </header>
    </div>
  );
}

export default App;
