/**
 * Created by ArbesaKajtazi on 22/10/2019.
 */
import React, {Component} from 'react'
import {Route, Redirect} from 'react-router'
import {connect} from 'react-redux'

class ProtectedRoute extends Component {
  render() {
    const {data: dataProp, component: Component, ...rest} = this.props

    let data = dataProp || {}
    let isAuthenticated = data.user.isLoggedIn
    console.log(isAuthenticated, 'isAuthenticated')
    return (
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
    data: store.authReducer
  }
}

export default connect(mapStateToProps, null)(ProtectedRoute)