import { Item } from "./Inventory";

interface MarketProps {
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  addItem: (item: Item) => void;
}

const Market: React.FC<MarketProps> = ({ setBalance, addItem }) => {
  const tradeCoffeeSprout = () => {
    setBalance((prevBalance) => prevBalance - 10);
    addItem({
      id: Math.floor(Math.random() * 1000),
      name: "Coffee Sprout",
      rate: 1,
    });
  };

  return (
    <div>
      <h2>Galactic Market</h2>
      <button onClick={tradeCoffeeSprout}>Buy coffee plant [10 denarii]</button>
    </div>
  );
};

export default Market;
