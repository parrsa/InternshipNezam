type Menu = {
  name: string;
  href: string;
};

interface MenuItems {
  name: string;
  href: string;
  icon: string;
  menu?: Menu[];
}

export const menuItems: MenuItems[] = [
  {
    name: "داشبورد",
    href: "/admin",
    icon: "",
  },
  {
    name: "مالی",
    href: "/admin/finance",
    icon: "",
  },
  {
    name: "فروشندگان",
    href: "/admin/sellers",
    icon: "",
  },
  {
    name: "مشتری ها",
    href: "/admin/customers",
    icon: "",
  },
  {
    name: "درخواست ها",
    href: "/admin/requests",
    icon: "",
    menu: [
      { name: "فروشنده شو", href: "/admin/requests" },
      { name: "برداشت از کیف پول", href: "/admin/requests/withdrawal" },
    ],
  },
  {
    name: "وبلاگ",
    href: "/admin/blog",
    icon: "",
  },
  {
    name: "تیکت ها",
    href: "/admin/tickets",
    icon: "",
  },
  {
    name: "دسته بندی محصولات",
    href: "/admin/category",
    icon: "",
  },
  {
    name: "نظرات کاربران",
    href: "/admin/comments",
    icon: "",
  },
  {
    name: "سوالات متداول",
    href: "/admin/questions",
    icon: "",
  },
  {
    name: "تنظیمات",
    href: "/admin/setting",
    icon: "",
  },
];
