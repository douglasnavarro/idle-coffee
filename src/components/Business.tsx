import React, { useState } from "react";

type BusinessProps = {
  addToBalance: (amount: number) => void;
  deductFromSilo: (amount: number) => void;
};

export const Business: React.FC<BusinessProps> = ({
  addToBalance,
  deductFromSilo,
}) => {
  const [price, setPrice] = useState<number>(10);
  return (
    <div>
      <h2>Business</h2>
      <button
        onClick={() => {
          deductFromSilo(1);
          addToBalance(price);
        }}
      >
        Sell - $ {price}/kg
      </button>
    </div>
  );
};
