export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'Presentations', href: '/presentations' },
  { label: 'Software', href: '/software' },
  { label: 'CV', href: '/cv' },
  { label: 'About', href: '/about' },
];
