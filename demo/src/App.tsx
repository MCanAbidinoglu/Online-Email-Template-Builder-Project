import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page from '@demo/components/Page';
import store from '@demo/store';
import '@demo/styles/common.scss';
import '@arco-design/web-react/dist/css/arco.css';
import { history } from './utils/history';
import PrivateRoute from "@demo/components/PrivateRoute";
import {AuthProvider} from "@demo/contexts/AuthContext";
const HomePromise = import('@demo/pages/Home');
const EditorPromise = import('@demo/pages/Editor');
const LoginPromise = import('@demo/components/Login');
const SignupPromise = import('@demo/components/Signup');
const UpdateProfilePromise = import('@demo/components/UpdateProfile');
const ForgotPasswordPromise = import('@demo/components/ForgotPassword');
const Home = React.lazy(() => HomePromise);
const Login = React.lazy(() => LoginPromise);
const ForgotPassword = React.lazy(() => ForgotPasswordPromise);
const Editor = React.lazy(() => EditorPromise);
const Signup = React.lazy(() => SignupPromise);
const UpdateProfile = React.lazy(() => UpdateProfilePromise);

function App() {
  return (
    <Provider store={store}>
      <Page>
        <Suspense
          fallback={
            <div
              style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

            </div>
          }
        >
          <Router history={history}>
              <AuthProvider>
            <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/update-profile' component={UpdateProfile} />
                <Route path='/forgot-password' component={ForgotPassword} />




                <Route path='/editor' component={Editor} />
            </Switch>
              </AuthProvider>
          </Router>
        </Suspense>
      </Page>
    </Provider>
  );
}

export default App;
