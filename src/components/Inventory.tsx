import React from "react";

export type Item = CoffeeSprout | CoffeeTree;

type GeneratorItem = {
  id: number;
  name: string;
  rate: number;
};

type CoffeeSprout = GeneratorItem & {
  name: "Coffee Sprout";
  rate: 1;
};

type CoffeeTree = GeneratorItem & {
  name: "Coffee Tree";
  rate: 10;
};

type InventoryProps = {
  items: Item[];
};

const Inventory: React.FC<InventoryProps> = ({ items }) => {
  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - Rate: {item.rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
