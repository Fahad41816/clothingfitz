import { use } from "react";
import OrderDetailsPage from "./OrderDetailsPage";

const page = ({ params }) => {
  const { id } = use(params);
  return <OrderDetailsPage orderId={id} />;
};

export default page;
