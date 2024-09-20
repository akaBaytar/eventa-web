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
  Event: Event[];
};

export type Category = {
  id: string;
  name: string;
  Event: Event[];
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
  organizer: User;
  isFree: boolean;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
};
