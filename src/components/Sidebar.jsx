import { Menu, Button } from "antd";
import { UserOutlined, ShopOutlined, ShoppingCartOutlined, InboxOutlined, DatabaseOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState, useContext } from 'react';
import Sider from "antd/es/layout/Sider";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState('0');
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    switch (e.key) {
      case '0':
        navigate('/dashboard');
        break;
      case '1':
        navigate('/suppliers');
        break;
      case '2':
        navigate('/orders');
        break;
      case '3':
        navigate('/customers');
        break;
      case '4':
        navigate('/products');
        break;

      default:
        break;
    }
  };

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { key: '0', icon: <DatabaseOutlined />, label: 'Dashboard' },
    { key: '1', icon: <ShopOutlined />, label: 'Suppliers' },
    { key: '2', icon: <ShoppingCartOutlined />, label: 'Orders' },
    { key: '3', icon: <UserOutlined />, label: 'Customers' },
    { key: '4', icon: <InboxOutlined />, label: 'Inventory' },
  ];

  return (
    <div className="h-screen">
      <Sider 
        className="h-full" 
        collapsed={collapsed} 
        onCollapse={(collapsed) => setCollapsed(collapsed)} 
        collapsible
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          onClick={handleMenuClick}
          items={menuItems}
        />
        <div style={{ position: 'absolute', bottom: 64, width: '100%', padding: '16px' }}>
          <Button type="primary" danger block onClick={handleLogout}>
            <LogoutOutlined />
          </Button>
        </div>
      </Sider>
    </div>
  );
};

export default Sidebar;