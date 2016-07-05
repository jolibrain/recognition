import React from 'react';
import { Link } from 'react-router';

function Header() {
  return <div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">

        <div className="navbar-header">
          <Link className="navbar-brand" to='/'>Planches</Link>
        </div>

      </div>
    </nav>
  </div>;
}

export default Header;
