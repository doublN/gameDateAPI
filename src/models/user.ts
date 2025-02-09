export type User = {
  id: number;
  username: string;
  email: string;
  hashedPassword: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};

export class UserModel {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
