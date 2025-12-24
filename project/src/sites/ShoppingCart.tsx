interface ShoppingCartItems {
  inCartItems: number;
  setInCartItems: (value: number | ((prev: number) => number)) => void;
}

function ShoppingCart({ inCartItems, setInCartItems }: ShoppingCartItems) {
  return <div>elementów w koszyku : {inCartItems}</div>;
}

export default ShoppingCart;
