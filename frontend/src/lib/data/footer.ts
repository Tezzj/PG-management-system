import { Mail, MapPin, Phone } from 'lucide-react';

export const footerData = {
  company: {
    name: 'PGManager',
    description:
      'Your trusted platform for managing PGs, hostels, and apartments with ease.',
    socialLinks: [
      { name: 'Facebook', href: 'https://facebook.com' },
      { name: 'Twitter', href: 'https://twitter.com' },
      { name: 'Instagram', href: 'https://instagram.com' },
      { name: 'LinkedIn', href: 'https://linkedin.com' },
    ],
  },
  quickLinks: [
    { href: '/about', label: 'About Us' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ],
  contactInfo: [
    {
      icon: MapPin,
      text: '123 Business Avenue, City, Country',
    },
    {
      icon: Phone,
      text: '+1 234 567 890',
    },
    {
      icon: Mail,
      text: 'contact@pgmanager.com',
    },
  ],
  legalLinks: [
    { href: '/privacy-policies', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/cookies-policies', label: 'Cookie Policy' },
  ],
  newsletter: {
    title: 'Newsletter',
    description: 'Subscribe to our newsletter for updates and offers.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  },
};
