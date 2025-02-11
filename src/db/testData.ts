import argon2 from "argon2";

export const testUsers = [
  {
    username: "jerry1992",
    email: "jerry1992@gmail.com",
    password: await argon2.hash("password123"),
  },
  {
    username: "tom91",
    email: "tom91@gmail.com",
    password: await argon2.hash("password456"),
  },
  {
    username: "daniel01",
    email: "daniel01@gmail.com",
    password: await argon2.hash("password789"),
  },
];

export const testSessions = [
  {
    userId: 1,
    token: "testtoken1",
  },
  {
    userId: 2,
    token: "testtoken2",
  },
];
