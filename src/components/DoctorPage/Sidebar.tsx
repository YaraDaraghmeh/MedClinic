
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  selectedSection: string;
  onCollapse: (collapsed: boolean) => void;
  onSelectSection: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, selectedSection, onCollapse, onSelectSection }) => {
  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: 'appointments', icon: <CalendarOutlined />, label: 'Appointments' },
    { key: 'patients', icon: <UserOutlined />, label: 'Patients' },
    { key: 'reports', icon: <FileTextOutlined />, label: 'Reports' },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedSection]}
        onSelect={({ key }) => onSelectSection(key)}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;