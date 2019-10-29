/**
 * Created by ArbesaKajtazi on 22/10/2019.
 */
import React, {Component} from 'react'
import {Route, Redirect} from 'react-router'
import auth from 'auth'

class ProtectedRoute extends Component {
  render() {
    const {component: Component, ...rest} = this.props
    return (
      <Route
        {...rest}
        render={props => {
          if (auth.isAuthenticated()) {
            return <Component {...props}/>
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: this.props.location
                  }
                }}
              />
            )
          }
        }}
      />
    )
  }
}

export default ProtectedRoute