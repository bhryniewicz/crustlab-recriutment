import { User } from "@/types/users";

export const mockUsers: User[] = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    name: "John",
    surname: "Doe",
    balance: { pln: 9100, eur: 8210, usd: 900 },
  },
  {
    id: "b2c3d4e5-f678-9012-3456-789abcdef012",
    name: "Jane",
    surname: "Smith",
    balance: { pln: 680, eur: 740, usd: 810 },
  },
  {
    id: "c3d4e5f6-7890-1234-5678-9abcdef01234",
    name: "Michael",
    surname: "Johnson",
    balance: { pln: 930, eur: 970, usd: 880 },
  },
  {
    id: "d4e5f678-9012-3456-789a-bcdef0123456",
    name: "Emily",
    surname: "Davis",
    balance: { pln: 540, eur: 560, usd: 590 },
  },
  {
    id: "e5f67890-1234-5678-9abc-def012345678",
    name: "Daniel",
    surname: "Brown",
    balance: { pln: 800, eur: 860, usd: 910 },
  },
  {
    id: "f6789012-3456-789a-bcde-f01234567890",
    name: "Sophia",
    surname: "Wilson",
    balance: { pln: 720, eur: 770, usd: 810 },
  },
  {
    id: "67890123-4567-89ab-cdef-012345678901",
    name: "William",
    surname: "Martinez",
    balance: { pln: 910, eur: 950, usd: 970 },
  },
  {
    id: "78901234-5678-9abc-def0-123456789012",
    name: "Olivia",
    surname: "Anderson",
    balance: { pln: 580, eur: 620, usd: 660 },
  },
  {
    id: "89012345-6789-abcd-ef01-234567890123",
    name: "James",
    surname: "Thomas",
    balance: { pln: 850, eur: 900, usd: 920 },
  },
  {
    id: "90123456-789a-bcde-f012-345678901234",
    name: "Isabella",
    surname: "Taylor",
    balance: { pln: 690, eur: 710, usd: 750 },
  },
  {
    id: "01234567-89ab-cdef-0123-456789012345",
    name: "Alexander",
    surname: "Harris",
    balance: { pln: 940, eur: 980, usd: 990 },
  },
  {
    id: "12345678-9abc-def0-1234-567890123456",
    name: "Mia",
    surname: "Clark",
    balance: { pln: 550, eur: 570, usd: 620 },
  },
  {
    id: "23456789-abcd-ef01-2345-678901234567",
    name: "Benjamin",
    surname: "Rodriguez",
    balance: { pln: 870, eur: 920, usd: 940 },
  },
  {
    id: "34567890-bcde-f012-3456-789012345678",
    name: "Charlotte",
    surname: "Lewis",
    balance: { pln: 660, eur: 690, usd: 720 },
  },
  {
    id: "45678901-cdef-0123-4567-890123456789",
    name: "Lucas",
    surname: "Lee",
    balance: { pln: 880, eur: 930, usd: 950 },
  },
  {
    id: "56789012-def0-1234-5678-901234567890",
    name: "Amelia",
    surname: "Walker",
    balance: { pln: 700, eur: 740, usd: 780 },
  },
  {
    id: "67890123-ef01-2345-6789-012345678901",
    name: "Mason",
    surname: "Hall",
    balance: { pln: 910, eur: 950, usd: 980 },
  },
  {
    id: "78901234-f012-3456-7890-123456789012",
    name: "Evelyn",
    surname: "Allen",
    balance: { pln: 560, eur: 600, usd: 640 },
  },
  {
    id: "89012345-0123-4567-8901-234567890123",
    name: "Elijah",
    surname: "Young",
    balance: { pln: 820, eur: 860, usd: 900 },
  },
  {
    id: "90123456-1234-5678-9012-345678901234",
    name: "Avery",
    surname: "King",
    balance: { pln: 750, eur: 780, usd: 810 },
  },
];

export const mockUserSelection = mockUsers.map(({ name, surname, id }) => {
  return { value: id, label: `${name} ${surname}` };
});

export const currencies = [
  {
    value: "pln",
    label: "PLN",
  },
  {
    value: "eur",
    label: "EUR",
  },
  {
    value: "usd",
    label: "USD",
  },
];
