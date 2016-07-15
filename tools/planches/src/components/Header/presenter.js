import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

  state = {
    searchValue: ''
  }

  constructor() {
    super()

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e) {
    this.setState({searchValue: e.target.value});
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.props.onFilterMatchesOutput(this.state.searchValue);
  }

  render() {
    return <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <Link className="navbar-brand" to='/'>Planches</Link>
          </div>

          <form className="navbar-form navbar-left" role="search" onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Filter" value={this.state.searchValue} onChange={this.handleOnChange}/>
            </div>
          </form>

        </div>
      </nav>
    </div>;
  }
}

export default Header;
