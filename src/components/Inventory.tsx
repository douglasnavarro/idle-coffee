import React from "react";

export type Item = CoffeeSprout | CoffeeTree;

type ItemWithCount = Item & { count: number };

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

const itemsWithCount = (items: Item[]): ItemWithCount[] => {
  const counts = items.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const uniqueItems = items.filter(
    (item, index, self) => self.findIndex((i) => i.name === item.name) === index
  );
  return uniqueItems.map((item) => ({ ...item, count: counts[item.name] }));
};

const itemDescription = (item: ItemWithCount): string => {
  return `${item.name} - Rate: ${item.rate} x${item.count}`;
};

const Inventory: React.FC<InventoryProps> = ({ items }) => {
  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {itemsWithCount(items)
          .map(itemDescription)
          .map((description) => (
            <li>{description}</li>
          ))}
      </ul>
    </div>
  );
};

export default Inventory;
