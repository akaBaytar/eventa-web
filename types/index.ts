export type User = {
  id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
  Event?: Event[];
};

export type Category = {
  id: string;
  name: string;
  Event?: Event[];
};

export type Event = {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  description?: string;
  location?: string;
  imageUrl: string;
  price?: string;
  url?: string;
  category: Category;
  isFree: boolean;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  organizer: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
};

export type CreateUser = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUser = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export type CreateEvent = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
};

export type UpdateEvent = {
  userId: string;
  event: {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type DeleteEvent = {
  eventId: string;
  path: string;
};

export type GetAllEvents = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type Collection = {
  data: Event[];
  title: string;
  subtitle: string;
  limit: number;
  totalPages?: number;
  page: number | string;
  urlParamName?: string;
  type?: 'EVENTS_ORGANIZED' | 'ALL_EVENTS' | 'MY_TICKETS';
};
