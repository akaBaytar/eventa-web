import { getOrdersByEvents } from '@/actions/order.action';

type SearchParams = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const OrderPage = async ({ searchParams }: SearchParams) => {
  const eventId = (searchParams?.event as string) || '';

  const orders = await getOrdersByEvents({ id: eventId });

  return <div>{orders?.length}</div>;
};

export default OrderPage;
