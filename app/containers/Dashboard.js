import React, {Component} from 'react'
import {connect} from 'react-redux'
import {sessionService} from 'redux-react-session'

class Dashboard extends Component {

  onLogOutClicked = () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
  }
  render() {
    const { session: { user: {username = '' } = {} } = {} } = this.props
    return (
      <div>
        <p>Welcome {username}</p>
        <button onClick={this.onLogOutClicked}>Log Out</button>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    session: store.session
  }
}

export default connect(mapStateToProps, null)(Dashboard)