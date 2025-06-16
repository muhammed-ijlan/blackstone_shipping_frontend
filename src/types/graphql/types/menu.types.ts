export interface MenuItemNode {
  id: string;
  label: string;
  url: string;
  uri: string;
  parentId: string | null;
  order: number;
}

export interface MenuData {
  menu: {
    id: string;
    name: string;
    menuItems: {
      nodes: MenuItemNode[];
    };
  };
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  uri: string;
  parentId: string | null;
  order: number;
  children?: MenuItem[];
}