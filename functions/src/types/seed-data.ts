import { Book, LicenseAllocation, User } from ".";

export const userData = {
  id: "user-1",
  email: "acme-publishing@example.com",
  firstName: "Acme",
  lastName: "Publishing",
  licensesAvailable: 1000,
  licensesUsed: 0,
} as User;

export const pricingInformation = [
  {
    tier: "up to 100",
    lb: 0,
    ub: 100,
    price: 500,
  },
  {
    tier: "up to 500",
    price: 400,
    lb: 101,
    ub: 500,
  },
  {
    tier: "up to 1000 ",
    price: 300,
    lb: 501,
    ub: 1000,
  },
];
export const licenseAllocationData = [
  {
    id: "license-2",
    bookId: "book-2",
    userId: "user-1",
    userEmail: "james@msn.com",
    status: "INVITE_SENT",
    createdAt: 1672531200000,
    updatedAt: 1672617600000,
  },
  {
    id: "license-3",
    bookId: "book-3",
    userId: "user-1",
    userEmail: "mark@cliobooks.ai",
    status: "IN_PROGRESS",
    createdAt: 1672617600000,
    updatedAt: 1672704000000,
  },
  {
    id: "license-4",
    bookId: "book-4",
    userId: "user-1",
    userEmail: "stewart@gmail.com",
    status: "LICENSED",
    createdAt: 1672704000000,
    updatedAt: 1672790400000,
  },
  {
    id: "license-5",
    bookId: "book-5",
    userId: "user-1",
    userEmail: "greg@test.com",
    status: "RETURNED",
    createdAt: 1672790400000,
    updatedAt: 1672876800000,
  },
] as LicenseAllocation[];
export const booksData = [
  {
    id: "book-1",
    title: "The Great Gatsby",
    description: "A novel by F. Scott Fitzgerald",
  },
  {
    id: "book-2",
    title: "To Kill a Mockingbird",
    description: "A novel by Harper Lee",
    licenseId: "license-2",
  },
  {
    id: "book-3",
    title: "1984",
    description: "A novel by George Orwell",
    licenseId: "license-3",
  },
  {
    id: "book-4",
    title: "Pride and Prejudice",
    description: "A novel by Jane Austen",
    licenseId: "license-4",
  },
  {
    id: "book-5",
    title: "The Catcher in the Rye",
    description: "A novel by J.D. Salinger",
    licenseId: "license-5",
  },
  {
    id: "book-6",
    title: "The Grapes of Wrath",
    description: "A novel by John Steinbeck",
  },
  {
    id: "book-7",
    title: "The Lord of the Rings",
    description: "A novel by J.R.R. Tolkien",
  },
  {
    id: "book-8",
    title: "The Hobbit",
    description: "A novel by J.R.R. Tolkien",
  },
  {
    id: "book-9",
    title: "The Catcher in the Rye",
    description: "A novel by J.D. Salinger",
  },
  {
    id: "book-10",
    title: "The Grapes of Wrath",
    description: "A novel by John Steinbeck",
  },
  {
    id: "book-11",
    title: "The Lord of the Rings",
    description: "A novel by J.R.R. Tolkien",
  },
  {
    id: "book-12",
    title: "The Hobbit",
    description: "A novel by J.R.R. Tolkien",
  },
] as Book[];
