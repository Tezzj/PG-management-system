import {
  Building2,
  Key,
  ClipboardList,
  BarChart3,
  Wallet,
  CalendarClock,
  Receipt,
  Bell,
  Lightbulb,
  Droplets,
  Calculator,
  PieChart,
  Wrench,
  ClipboardCheck,
  MessageSquare,
  Clock,
} from 'lucide-react';

export const featuresData = [
  {
    title: 'Room Management',
    description:
      'Efficiently manage your PG rooms with our comprehensive room management system.',
    features: [
      {
        icon: Building2,
        name: 'Room Inventory',
        description:
          'Keep track of all your rooms, their current status, and occupancy details in real-time.',
      },
      {
        icon: Key,
        name: 'Occupancy Management',
        description:
          'Manage check-ins, check-outs, and room assignments with ease.',
      },
      {
        icon: ClipboardList,
        name: 'Maintenance Scheduling',
        description:
          'Schedule and track room maintenance, cleaning, and repairs efficiently.',
      },
      {
        icon: BarChart3,
        name: 'Occupancy Analytics',
        description:
          'Get insights into room occupancy rates, popular room types, and revenue per room.',
      },
    ],
  },
  {
    title: 'Rent Collection',
    description:
      'Streamline your rent collection process with automated payments and tracking.',
    features: [
      {
        icon: Wallet,
        name: 'Online Payments',
        description:
          'Accept rent payments online through multiple payment methods including UPI, cards, and net banking.',
      },
      {
        icon: CalendarClock,
        name: 'Payment Scheduling',
        description:
          'Set up automatic rent collection schedules and recurring payment reminders.',
      },
      {
        icon: Receipt,
        name: 'Invoice Generation',
        description:
          'Automatically generate and send professional rent invoices and receipts.',
      },
      {
        icon: Bell,
        name: 'Payment Reminders',
        description:
          'Send automated payment reminders to tenants before and after due dates.',
      },
    ],
  },
  {
    title: 'Utility Bills Management',
    description:
      'Simplify utility bill management and split costs fairly among tenants.',
    features: [
      {
        icon: Lightbulb,
        name: 'Electricity Tracking',
        description:
          'Track and manage electricity consumption and costs for each room.',
      },
      {
        icon: Droplets,
        name: 'Water Usage',
        description:
          'Monitor water usage and distribute costs fairly among tenants.',
      },
      {
        icon: Calculator,
        name: 'Bill Splitting',
        description:
          'Automatically calculate and split utility bills among tenants based on usage or fixed rates.',
      },
      {
        icon: PieChart,
        name: 'Usage Analytics',
        description:
          'View detailed analytics of utility consumption patterns and costs over time.',
      },
    ],
  },
  {
    title: 'Maintenance Management',
    description:
      'Efficiently handle maintenance requests and track repairs for your PG accommodation.',
    features: [
      {
        icon: Wrench,
        name: 'Request Management',
        description:
          'Track and manage maintenance requests from submission to completion.',
      },
      {
        icon: ClipboardCheck,
        name: 'Task Assignment',
        description:
          'Assign maintenance tasks to staff members and track their progress.',
      },
      {
        icon: MessageSquare,
        name: 'Communication',
        description:
          'Built-in messaging system for updates between tenants and maintenance staff.',
      },
      {
        icon: Clock,
        name: 'Service History',
        description:
          'Maintain detailed service history for each room and common areas.',
      },
    ],
  },
];
