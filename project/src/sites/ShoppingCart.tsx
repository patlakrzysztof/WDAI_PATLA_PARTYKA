interface ShoppingCartItems {
  inCartItems: number;
  setInCartItems: React.Dispatch<React.SetStateAction<number>>;
}

function ShoppingCart({ inCartItems, setInCartItems }: ShoppingCartItems) {
  return <div>elementów w koszyku : {inCartItems}</div>;
}

export default ShoppingCart;
