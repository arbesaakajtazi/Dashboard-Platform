/**
 * Created by ArbesaKajtazi on 22/10/2019.
 */
import React, {Component} from 'react'
import {Route, Redirect} from 'react-router'
import {connect} from 'react-redux'

class ProtectedRoute extends Component {
  render() {
    const {session, component: Component, ...rest} = this.props
    console.log('current session', session)
    let isAuthenticated = session.authenticated
    console.log(isAuthenticated, 'isAuthenticated')
    return (
      session.checked &&
      <Route
        {...rest}
        render={props => {
          if (isAuthenticated) {
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

const mapStateToProps = (store) => {
  return {
    session: store.session
  }
}

export default connect(mapStateToProps, null)(ProtectedRoute)