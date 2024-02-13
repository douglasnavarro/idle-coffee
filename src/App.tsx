import { useEffect, useState } from "react";
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
    addBalance: (amount: number) => setBalance(balance + amount),
  };
};

const useInventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  return { items, addItem: (item: Item) => setItems([...items, item]) };
};

/* Continuously updates the balance based on the items' rates */
const useItemsRate = (items: Item[], addBalance: (amount: number) => void) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const rate = items.reduce((acc, item) => acc + item.rate, 0);
      addBalance(rate);
    }, 1000);
    return () => clearInterval(interval);
  });
};

function App() {
  const { balance, deductFromBalance, addBalance } = useBalance(30);
  const { items, addItem } = useInventory();
  useItemsRate(items, addBalance);

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
