import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

    {
      title: 'ACCUEIL',
      icon: 'home-outline',
      link: '/pages/accueil',
      home: true,
    },
    {
      title: 'COMMERCE',
      icon: 'shopping-cart-outline',
      children: [
          {
            title: 'Ventes',
            link: '/pages/ventes',
          },
          {
            title: 'Commandes',
            link: '/pages/commandes',
          },
      ],
    },
    {
      title: 'STOCK',
      icon: 'archive-outline',
      children: [
          {
            title: 'Entrées',
            link: '/pages/entrees',
          },
          {
            title: 'Inventaires',
            link: '/pages/inventaires',
          },
      ],
    },
    {
      title: 'AVIS',
      icon: 'message-circle-outline',
      link: '/pages/avis',
    },
    {
      title: 'DOCUMENTS',
      icon: 'file-text-outline',
      link: '/pages/documents',
    },
    {
      title: 'UTILISATEURS',
      icon: 'person-outline',
      link: '/pages/utilisateurs',
    },
];
