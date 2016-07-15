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

          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Filter" onKeyUp={this.props.onFilterMatchesOutput.bind(this)}/>
            </div>
          </form>

        </div>
      </nav>
    </div>;
  }
}

export default Header;
