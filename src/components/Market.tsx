import { useState } from "react";
import { Item } from "./Inventory";

interface MarketProps {
  deductFromSilo: (amount: number) => any;
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

const Production: React.FC<MarketProps> = ({ deductFromSilo, addItem }) => {
  const [tradeError, setTradeError] = useState<string | null>(null);
  const runDeal = (deal: Deal) => {
    try {
      deductFromSilo(deal.price);
      addItem(deal.item);
      setTradeError(null);
    } catch (error) {
      setTradeError((error as Error).message);
    }
  };

  return (
    <div>
      <h2>Production</h2>
      <ul>
        {deals.map((deal) => (
          <li key={deal.item.id}>
            {deal.item.name} - {deal.price} credits
            <button onClick={() => runDeal(deal)}>Buy</button>
          </li>
        ))}
      </ul>
      {tradeError && <p className="error">Can't trade: {tradeError}</p>}
    </div>
  );
};

export default Production;
