import { useState } from "react";
import { Item } from "./Inventory";

interface MarketProps {
  deductBalance: (amount: number) => any;
  addItem: (item: Item) => void;
}

type Deal = {
  price: number;
  item: Item;
};

const deals: Deal[] = [
  { price: 10, item: { id: 1, name: "Coffee Sprout", rate: 1 } },
  { price: 100, item: { id: 2, name: "Coffee Tree", rate: 10 } },
];

const Market: React.FC<MarketProps> = ({ deductBalance, addItem }) => {
  const [tradeError, setTradeError] = useState<string | null>(null);
  const runDeal = (deal: Deal) => {
    try {
      deductBalance(deal.price);
      addItem(deal.item);
      setTradeError(null);
    } catch (error) {
      setTradeError((error as Error).message);
    }
  };

  return (
    <div>
      <h2>Galactic Market</h2>
      <ul>
        {deals.map((deal) => (
          <li key={deal.item.id}>
            {deal.item.name} - {deal.price} credits
            <button onClick={() => runDeal(deal)}>Trade</button>
          </li>
        ))}
      </ul>
      {tradeError && <p className="error">Can't trade: {tradeError}</p>}
    </div>
  );
};

export default Market;
