export type Session = {
  userId: number;
  token: string;
  createdAt: Date;
};

export class SessionModel {
  session: Session;

  constructor(session: Session) {
    this.session = session;
  }
}
