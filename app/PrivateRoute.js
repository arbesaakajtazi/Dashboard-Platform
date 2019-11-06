/**
 * Created by ArbesaKajtazi on 22/10/2019.
 */
import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {replace} from "react-router-redux";

class ProtectedRoute extends Component {

  render() {
    const {session, component: Component, ...rest} = this.props
    const {user: {token = ''} = {}} = session
    // console.log('ProtectedRoute the session', session)
    let isAuthenticated = session.authenticated
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

const mapDispatchToProps = dispatch => ({
  redirect: (where, query) => {
    dispatch(replace({
      pathname: where,
      query: query
    }))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)