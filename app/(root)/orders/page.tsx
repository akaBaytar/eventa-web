import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { formatDateTime } from '@/lib/utils';
import { getOrdersByEvents } from '@/actions/order.action';

type SearchParams = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const OrderPage = async ({ searchParams }: SearchParams) => {
  const eventId = (searchParams?.event as string) || '';

  const orders = await getOrdersByEvents({ id: eventId });

  return (
    <section className='wrapper'>
      <Table>
        {orders && orders.length > 0 ? (
          <TableCaption>A list of your recent orders.</TableCaption>
        ) : (
          <TableCaption>
            No tickets have been purchased for your event yet.
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-32'>Order ID</TableHead>
            <TableHead className='min-w-36'>Event Title</TableHead>
            <TableHead className='min-w-32'>Buyer</TableHead>
            <TableHead className='min-w-32'>Amount</TableHead>
            <TableHead className='min-w-36'>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders.length > 0 &&
            orders.map(({ id, Event, buyer, totalAmount, createdAt }) => (
              <TableRow key={id} className='text-xs'>
                <TableCell>{id}</TableCell>
                <TableCell>{Event.title}</TableCell>
                <TableCell>
                  {buyer.firstName} {buyer.lastName}
                </TableCell>
                <TableCell>${totalAmount}</TableCell>
                <TableCell>{formatDateTime(createdAt).dateTime}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default OrderPage;
