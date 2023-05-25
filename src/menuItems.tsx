import { PieChartOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import React from 'react';

type AntdMenuItem = Required<MenuProps>['items'][number];
type MenuItem = AntdMenuItem & {
  path: string;
};

function getItem(
  label: React.ReactNode,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  const link = <a href={path}>{label}</a>;

  return {
    key: path,
    icon,
    children,
    label: link,
    path,
  } as MenuItem;
}

export const menuItems: MenuItem[] = [
  getItem('Playbook', '/', <SettingOutlined />),
  getItem('Playbooks', '/playbooks', <PieChartOutlined />),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
];
