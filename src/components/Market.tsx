import { useState } from "react";
import { Item } from "./Inventory";

interface MarketProps {
  deductBalance: (amount: number) => any;
  addItem: (item: Item) => void;
}

const Market: React.FC<MarketProps> = ({ deductBalance, addItem }) => {
  const [tradeError, setTradeError] = useState<string | null>(null);
  const tradeCoffeeSprout = () => {
    try {
      deductBalance(10);
      addItem({
        id: Math.floor(Math.random() * 1000),
        name: "Coffee Sprout",
        rate: 1,
      });
    } catch (error) {
      setTradeError((error as Error).message);
    }
  };

  return (
    <div>
      <h2>Galactic Market</h2>
      <button onClick={tradeCoffeeSprout}>Buy coffee plant [10 denarii]</button>
      {tradeError && <p className="error">Can't trade: {tradeError}</p>}
    </div>
  );
};

export default Market;
