import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { orderId } = useParams();
  return (
    <div>
      <p>sth</p>
      <p>{orderId}</p>
    </div>
  );
}
