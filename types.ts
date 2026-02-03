
export enum PackageType {
  STARTER = 'Starter - 30 Tage',
  PERFORMANCE = 'Performance - 6 Monate',
  PREMIUM = 'Premium - 12 Monate',
  DIAMOND = 'Diamond - Dedicated',
  BLACK_VIP = 'Black VIP - Concierge'
}

export interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  color: string;
  popular?: boolean;
}

export interface OrderData {
  name: string;
  teamsEmail: string;
  macAddress: string;
  deviceKey: string;
  playerType: string;
  otherPlayerName?: string;
  package: string;
}
