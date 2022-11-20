import { Contact } from './contact';

type FetchStatus = 'pending' | 'fulfilled' | 'rejected';

export type AuthState = {
  userName: string | null;
  userPhoto: string;
  id: number | null;
  accessToken: string | null;
  isLogin: boolean;
  status: FetchStatus | undefined;
  error: string | null;
  remember: boolean;
};

export type ContactsListState = {
  status: FetchStatus | undefined;
  list: Contact[];
  error: string | null;
};
