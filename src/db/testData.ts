export const testUsers = [
  {
    username: "jerry1992",
    email: "jerry1992@gmail.com",
    hashedPassword: "password123",
  },
  {
    username: "tom91",
    email: "tom91@gmail.com",
    hashedPassword: "password456",
  },
  {
    username: "daniel01",
    email: "daniel01@gmail.com",
    hashedPassword: "password789",
  },
];

export const testSessions = [
  {
    userId: 1,
    token: crypto.randomUUID() as string,
  },
  {
    userId: 2,
    token: crypto.randomUUID() as string,
  },
];
