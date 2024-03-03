/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'admin.book',
    title: 'ภาพรวมงาน',
    type: 'basic',
    icon: 'heroicons_asha:dashboard',
    link: '/admin/booking/list',
    hidden: () => {
      // const storedPermission = JSON.parse(localStorage.getItem('permission'));
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '1' || position.position_id === '3') {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    id: 'admin.department',
    title: 'สรุปภาพรวม',
    type: 'basic',
    icon: 'feather:home',
    link: '/dashboards/general-manager',
    hidden: () => {
      // const storedPermission = JSON.parse(localStorage.getItem('permission'));
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '1' || position.position_id === '2') {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    id: 'admin.summary',
    title: 'ภาพรวมการเข้ารับบริการ',
    type: 'basic',
    icon: 'heroicons_asha:dashboard-service',
    link: '/dashboards/summary-service',
    hidden: () => {
      // const storedPermission = JSON.parse(localStorage.getItem('permission'));
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '1' || position.position_id === '2') {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    id: 'admin.ticket.gm',
    title: 'Ticket',
    type: 'basic',
    icon: 'heroicons_asha:ticket',
    link: '/admin/ticket/list',
    hidden: () => {
      // const storedPermission = JSON.parse(localStorage.getItem('permission'));
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '1' || position.position_id === '2') {
        return true;
      } else {
        return false;
      }
    },
  },

  {
    id: 'admin.booking',
    title: 'การติดตามลูกค้า',
    type: 'basic',
    icon: 'heroicons_asha:follow',
    link: '/admin/ticket/list',
    hidden: () => {
      // const storedPermission = JSON.parse(localStorage.getItem('permission'));
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '1' || position.position_id === '3') {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    id: 'admin.comp',
    title: 'พนักงาน',
    type: 'basic',
    hidden: () => {
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '2' || position.position_id === '3') {
        return true;
      } else {
        return false;
      }
    },
    icon: 'heroicons_outline:user-group',
    link: '/admin/employee/list',
  },
  {
    id: 'admin.department',
    title: 'ศูนย์บริการ',
    type: 'basic',
    hidden: () => {
      // const storedPermission = JSON.parse(localStorage.getItem('permission'));
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '2' && position.position_id === '3') {
        return true;
      } else {
        return false;
      }
    },
    icon: 'heroicons_asha:service-center',
    link: '/admin/service-center/list',
  },
  {
    id: 'admin.car',
    title: 'รถ',
    type: 'basic',
    hidden: () => {
      // const storedPermission = JSON.parse(localStorage.getItem('permission'));
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '2' && position.position_id === '3') {
        return true;
      } else {
        return false;
      }
    },
    icon: 'heroicons_asha:car',
    link: '/admin/car/list',
  },
  {
    id: 'admin.employee',
    title: 'บัญชีลูกค้า',
    type: 'basic',
    hidden: () => {
      // const storedPermission = JSON.parse(localStorage.getItem('permission'));
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '2' && position.position_id === '3') {
        return true;
      } else {
        return false;
      }
    },
    icon: 'heroicons_asha:account',
    link: '/admin/customer/list',
  },
  {
    id: 'admin.permission',
    title: 'ประวัติทำรายการ',
    type: 'basic',
    hidden: () => {
      // const storedPermission = JSON.parse(localStorage.getItem('permission'));
      const position = JSON.parse(localStorage.getItem('user'));
      if (position.position_id === '2' && position.position_id === '3') {
        return true;
      } else {
        return false;
      }
    },
    icon: 'heroicons_asha:history',
    link: '/admin/history/list',
  },

  {
    id: 'callcenter',
    title: 'Call Center',
    subtitle: 'ขัอมูลเกี่ยวกับระบบ',
    type: 'group',
    icon: 'heroicons_outline:home',
    hidden: () => {
      return true;
    },
    children: [
      {
        id: 'admin.comp',
        title: 'สรุปภาพรวม',
        type: 'basic',
        icon: 'heroicons_outline:list-bullet',
        link: '/dashboards/project',
        hidden: () => {
          // const storedPermission = JSON.parse(localStorage.getItem('permission'));
          const position = JSON.parse(localStorage.getItem('user'));
          if (position.position_id === '1' && position.position_id === '3') {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        id: 'admin.comp',
        title: 'สรุปภาพรวม',
        type: 'basic',
        icon: 'heroicons_outline:list-bullet',
        link: '/admin/summary-service/list',
      },
      {
        id: 'admin.department',
        title: 'Ticket',
        type: 'basic',
        icon: 'heroicons_outline:list-bullet',
        link: '#',
      },
      {
        id: 'admin.department',
        title: 'ศูนย์บริการ',
        type: 'basic',
        icon: 'heroicons_asha:service-center',
        link: '#',
      },
      {
        id: 'admin.position',
        title: 'รถ',
        type: 'basic',
        icon: 'heroicons_asha:car',
        link: '#',
      },
      {
        id: 'admin.employee',
        title: 'บัญชีลูกค้า',
        type: 'basic',
        icon: 'heroicons_asha:account',
        link: '/admin/client/list',
      },
      {
        id: 'admin.permission',
        title: 'ประวัติทำรายการ',
        type: 'basic',
        icon: 'heroicons_asha:history',
        link: '#',
      },
    ],
  },
  {
    id: 'gm',
    title: 'General Manager',
    subtitle: 'ขัอมูลเกี่ยวกับระบบ',
    type: 'group',
    icon: 'heroicons_outline:home',
    hidden: () => {
      return true;
    },
    children: [
      {
        id: 'sales.list',
        title: 'คำสั่งซื้อ',
        type: 'basic',
        icon: 'heroicons_outline:home-modern',
        link: '/admin/sales/list',
      },
      {
        id: 'client.list',
        title: 'ลูกค้าของเรา',
        type: 'basic',
        icon: 'heroicons_outline:home-modern',
        link: '/admin/customer/list',
      },
    ],
  },
  // {
  //     id: 'self',
  //     title: 'User Profile',
  //     subtitle: 'ขัอมูลเกี่ยวกับระบบ',
  //     type: 'group',
  //     icon: 'heroicons_outline:home',
  //     children: [
  //         {
  //             id: 'self.employee',
  //             title: 'แก้ไขข้อมูลส่วนตัว',
  //             type: 'basic',
  //             icon: 'heroicons_outline:user',
  //             link: '/admin/employee/list',
  //             hidden: () => {
  //                 return true;
  //             },
  //         },
  //         {
  //             id: 'admin.logout',
  //             title: 'ออกจากระบบ',
  //             type: 'basic',
  //             icon: 'heroicons_outline:arrow-left-on-rectangle',
  //             link: '/sign-out',
  //         },
  //     ],
  // },
];
export const compactNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    tooltip: 'Dashboards',
    type: 'aside',
    icon: 'heroicons_outline:home',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'apps',
    title: 'Apps',
    tooltip: 'Apps',
    type: 'aside',
    icon: 'heroicons_outline:qr-code',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'pages',
    title: 'Pages',
    tooltip: 'Pages',
    type: 'aside',
    icon: 'heroicons_outline:document-duplicate',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'user-interface',
    title: 'UI',
    tooltip: 'UI',
    type: 'aside',
    icon: 'heroicons_outline:rectangle-stack',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'navigation-features',
    title: 'Navigation',
    tooltip: 'Navigation',
    type: 'aside',
    icon: 'heroicons_outline:bars-3',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
export const futuristicNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'DASHBOARDS',
    type: 'group',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'apps',
    title: 'APPS',
    type: 'group',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'others',
    title: 'OTHERS',
    type: 'group',
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'aside',
    icon: 'heroicons_outline:document-duplicate',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'user-interface',
    title: 'User Interface',
    type: 'aside',
    icon: 'heroicons_outline:rectangle-stack',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'navigation-features',
    title: 'Navigation Features',
    type: 'aside',
    icon: 'heroicons_outline:bars-3',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
export const horizontalNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'แดชบอร์ด',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  // {
  //     id: 'apps',
  //     title: 'Apps',
  //     type: 'group',
  //     icon: 'heroicons_outline:qr-code',
  //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  // },
  // {
  //     id: 'pages',
  //     title: 'Pages',
  //     type: 'group',
  //     icon: 'heroicons_outline:document-duplicate',
  //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  // },
  // {
  //     id: 'user-interface',
  //     title: 'UI',
  //     type: 'group',
  //     icon: 'heroicons_outline:rectangle-stack',
  //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  // },
  // {
  //     id: 'navigation-features',
  //     title: 'Misc',
  //     type: 'group',
  //     icon: 'heroicons_outline:bars-3',
  //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  // },
  {
    id: 'purchase',
    title: 'ซื้อ',
    type: 'group',
    icon: 'heroicons_outline:inbox-arrow-down',
    children: [],
  },
  {
    id: 'sale',
    title: 'ขาย',
    type: 'group',
    icon: 'heroicons_outline:shopping-cart',
    children: [],
  },
  {
    id: 'inventory',
    title: 'คลังสินค้า',
    type: 'group',
    icon: 'heroicons_outline:cube',
    children: [],
  },
  {
    id: 'accounting',
    title: 'บัญชี/การเงิน',
    type: 'group',
    icon: 'heroicons_outline:users',
    children: [],
  },
  {
    id: 'delivery-workers',
    title: 'คนส่งของ',
    type: 'group',
    icon: 'heroicons_outline:users',
    children: [],
  },
  {
    id: 'admin',
    title: 'จัดการพนักงาน',
    type: 'group',
    icon: 'heroicons_outline:users',
    children: [],
  },
  {
    id: 'reports',
    title: 'รายงาน',
    type: 'group',
    icon: 'heroicons_outline:clipboard-document-list',
    children: [],
  },
];
