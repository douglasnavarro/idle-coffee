import { useState } from "react";
import "./App.css";
import Inventory, { Item } from "./components/Inventory";
import Market from "./components/Market";

const useBalance = (initialBalance: number) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  return { balance, setBalance };
};

const useInventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  return { items, addItem: (item: Item) => setItems([...items, item]) };
};

function App() {
  const { balance, setBalance } = useBalance(100);
  const { items, addItem } = useInventory();
  return (
    <div className="App">
      <header className="App-header">
        <body>
          <p>balance: {balance}</p>
          <Market setBalance={setBalance} addItem={addItem} />
          <Inventory items={items} />
        </body>
      </header>
    </div>
  );
}

export default App;
