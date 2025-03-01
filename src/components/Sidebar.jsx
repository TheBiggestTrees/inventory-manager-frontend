import { Menu, Button } from "antd";
import { UserOutlined, ShopOutlined, ShoppingCartOutlined, InboxOutlined, DatabaseOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState, useContext } from 'react';
import Sider from "antd/es/layout/Sider";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState('0');
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

  const sidebarStyle = {
    height: '100%',
    backgroundColor: '#001529',
  };

  return (
    <div className="h-screen">
    <Sider style={sidebarStyle} collapsible>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          onClick={handleMenuClick}
        >
          <Menu.Item key="0" icon={<DatabaseOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="1" icon={<ShopOutlined />}>
            Suppliers
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            Orders
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Customers
          </Menu.Item>
          <Menu.Item key="4" icon={<InboxOutlined />}>
            Inventory
          </Menu.Item>
        </Menu>
        <div style={{ position: 'absolute', bottom: 64, width: '100%', padding: '16px' }}>
          <Button type="primary" danger block onClick={handleLogout}>
            <LogoutOutlined />
          </Button>
        </div>
      </Sider>
      </div>
  )
}

export default Sidebar;