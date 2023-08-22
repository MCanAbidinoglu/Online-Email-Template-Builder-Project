import React, { useEffect,useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Stack } from '../Stack';
import { pushEvent } from '@demo/utils/pushEvent';
import { githubButtonGenerate } from '@demo/utils/githubButtonGenerate';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface FrameProps {
  title: string;
  breadcrumb?: React.ReactElement;
  primaryAction?: React.ReactElement;
  children: React.ReactElement;
}

export default function Frame({
  children,
  title,
  primaryAction,
  breadcrumb,
}: FrameProps) {
  useEffect(() => {
    githubButtonGenerate();
  }, []);
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()


  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }
  return (
    <Layout>
      <Header style={{ padding: '0 20px', backgroundColor: '#001529' }}>
        <Stack distribution='equalSpacing' alignment='center'>
          <h1 style={{ color: 'white', margin: '15px 0' }}>e-mailbuild</h1>

          <div style={{ marginTop: 10 }}>
            <>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Profile</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <strong>Email:</strong> {currentUser.email}
                  <Link to="/update-profile" className='btn btn-primary w-100 mt-3'>
                    Update Profile
                  </Link>


                </Card.Body>

              </Card>
              <div className="w-100 text-center mt-2">
                <Button varient="link" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            </>


          </div>
        </Stack>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key='sub1' title='Templates'>
              <Menu.Item key='1'>Templates</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Stack vertical>
            {breadcrumb && (
              <Breadcrumb>
                <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
              </Breadcrumb>
            )}

            <Stack distribution='equalSpacing' alignment='center'>
              <Stack.Item>
                <h2>
                  <strong>{title}</strong>
                </h2>
              </Stack.Item>
              <Stack.Item>{primaryAction}</Stack.Item>
            </Stack>

            <Stack.Item>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  backgroundColor: '#fff',
                }}
              >
                {children}
              </Content>
            </Stack.Item>
          </Stack>
        </Layout>
      </Layout>
    </Layout>
  );
}
