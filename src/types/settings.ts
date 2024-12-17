export type UserProfile = 'cashier' | 'services' | 'supervisor';

export interface Settings {
  testMode: boolean;
  profile: UserProfile;
}