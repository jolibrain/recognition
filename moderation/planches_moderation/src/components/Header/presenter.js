/*
Copyright 2016 Fabrica S.P.A., Emmanuel Benazera, Alexandre Girard

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
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
            <Link className="navbar-brand" to='/'>Recognition - Moderation</Link>
          </div>

        </div>
      </nav>
    </div>;
  }
}

export default Header;
