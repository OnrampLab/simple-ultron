import { Breadcrumb, Layout, Menu } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { menuItems } from '../config/menuItems';

const { Content, Footer, Sider } = Layout;

export const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const url = new URL(window.location.href);

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      title: <Link to="/workflows">Workflows</Link>,
    },
  ];

  const defaultSelectedKeys = menuItems
    .filter((item) => {
      return item?.path === url.pathname;
    })
    .map((item) => item.path);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 15px' }}>
          <Breadcrumb items={breadcrumbItems} style={{ margin: '16px 0' }} />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Onramplab</Footer>
      </Layout>
    </Layout>
  );
};
