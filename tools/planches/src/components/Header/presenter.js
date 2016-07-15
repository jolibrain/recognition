import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

  render() {
    return <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <Link className="navbar-brand" to='/'>Planches</Link>
          </div>

          <div className="navbar-form navbar-left">
            <input type="text" placeholder="Filter" onKeyUp={this.props.onFilterMatchesOutput.bind(this)}/>
          </div>

        </div>
      </nav>
    </div>;
  }
}

export default Header;
