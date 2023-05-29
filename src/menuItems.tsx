import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

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
  const link = <Link to={path}>{label}</Link>;

  return {
    key: path,
    icon,
    children,
    label: link,
    path,
  } as MenuItem;
}

export const menuItems: MenuItem[] = [
  getItem('Workflows', '/workflows', <SettingOutlined />),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
];
