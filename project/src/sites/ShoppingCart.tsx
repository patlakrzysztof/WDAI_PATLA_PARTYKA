interface ShoppingCartItems {
  inCartItems: number;
  setInCartItems: (value: number | ((prev: number) => number)) => void;
}

function ShoppingCart({ inCartItems, setInCartItems }: ShoppingCartItems) {
  return <div>Elements in cart: {inCartItems}</div>;
}

export default ShoppingCart;
