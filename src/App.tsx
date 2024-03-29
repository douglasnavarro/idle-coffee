import { useEffect, useState } from "react";
import "./App.css";
import Inventory, { Item } from "./components/Inventory";
import Production from "./components/Production";
import { Business } from "./components/Business";

const useSilo = (initialAmount: number) => {
  const [currentAmount, setAmount] = useState<number>(initialAmount);
  return {
    coffeeAmount: currentAmount,
    deductFromSilo: (amount: number) => {
      if (currentAmount - amount < 0) {
        throw new Error("Insufficient funds");
      }
      setAmount(currentAmount - amount);
    },
    addToSilo: (amount: number) => setAmount(currentAmount + amount),
  };
};

const useBankAccount = (initialBalance: number) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  return {
    balance,
    deductFromBalance: (amount: number) => {
      if (balance - amount < 0) {
        throw new Error("Insufficient funds");
      }
      setBalance(balance - amount);
    },
    addToBalance: (amount: number) => setBalance(balance + amount),
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
  const { coffeeAmount, deductFromSilo, addToSilo } = useSilo(30);
  const { items, addItem } = useInventory();
  const { balance, addToBalance } = useBankAccount(0);
  useItemsRate(items, addToSilo);

  return (
    <div className="App">
      <header className="App-header">
        <body>
          <p>Unsold: {coffeeAmount} kilograms</p>
          <p>Balance: ${balance}</p>
          <Business
            deductFromSilo={deductFromSilo}
            addToBalance={addToBalance}
          />
          <Production deductFromSilo={deductFromSilo} addItem={addItem} />
          <Inventory items={items} />
        </body>
      </header>
    </div>
  );
}

export default App;
