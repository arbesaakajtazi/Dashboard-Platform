/**
 * Created by ArbesaKajtazi on 16/10/2019.
 */
import {hot} from 'react-hot-loader/root'
import React, {Suspense, lazy} from 'react'
import {Provider} from 'react-redux'
import store, {history} from 'Store'
import {Route, Router, Switch, Link} from 'react-router-dom'
import ThemeProvider from 'utils/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'

const Login = lazy(() => import('containers/Login'))
const Dashboard = lazy(() => import('containers/Dashboards/Dashboard'))
import PrivateRoute from 'PrivateRoute'
import PageNotFound from 'containers/Pages/Common/PageNotFound'
import LoadingIndicator from 'presentations/Icons/LoadingIndicator'

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingIndicator/>}>
        <Router history={history}>
          <ThemeProvider>
            <CssBaseline/>
            <Switch>
              <Route path='/login' component={Login}/>
              <PrivateRoute path={'/dashboards/:id'} component={Dashboard}/>
              <PrivateRoute path='/' component={Dashboard}/>
              <Route component={PageNotFound}/>
            </Switch>
          </ThemeProvider>
        </Router>
      </Suspense>
    </Provider>
  )
}
export default hot(App)