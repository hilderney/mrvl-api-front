export interface IUser {
  name: string;
  email: string;
  phone_number: string;
  created: ICreated,
  uuid: string;
  token?: string;
}

interface ICreated {
  date: string;
  timezone_type: number;
  timezone: string;
}
