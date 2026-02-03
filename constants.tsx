
import { Package } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Starter Tier',
    price: 40,
    duration: '30 Tage',
    features: ['1 Gerät gleichzeitig', 'Standard Routing', 'HD Streaming', 'Support via Teams'],
    color: 'indigo'
  },
  {
    id: 'performance',
    name: 'Performance Tier',
    price: 80,
    duration: '6 Monate',
    features: ['1 Gerät gleichzeitig', 'Fast Routing', 'FHD Ready', 'Prioritäts-Support'],
    color: 'emerald'
  },
  {
    id: 'premium',
    name: 'Yearly Premium',
    price: 120,
    duration: '12 Monate',
    features: ['1 Gerät gleichzeitig', 'VIP Routing', 'Standard HD/FHD', 'KEIN 4K UHD'],
    color: 'indigo',
    popular: true
  },
  {
    id: 'diamond',
    name: 'Diamond Premium',
    price: 200,
    duration: '12 Monate',
    features: ['2 Geräte gleichzeitig', '4K UHD STABLE', 'Dedicated Node', '12 Monate Laufzeit'],
    color: 'cyan'
  },
  {
    id: 'black',
    name: 'Black VIP Tier',
    price: 300,
    duration: '12 Monate',
    features: ['4 Geräte gleichzeitig', 'Private Server Instance', 'Concierge Service', '12 Monate Laufzeit'],
    color: 'purple'
  }
];
