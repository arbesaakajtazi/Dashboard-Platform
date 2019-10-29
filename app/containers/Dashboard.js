import React, {Component} from 'react'
import auth from 'auth'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <p>Dashboard</p>
        <button
          onClick={() => {
            auth.logout(() => {
              this.props.history.push("/");
            });
          }}
        >
          Log Out
        </button>
      </div>
    )
  }
}

export default Dashboard