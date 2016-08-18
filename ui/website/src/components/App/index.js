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
import Header from '../Header';
import Footer from '../Footer';

class App extends React.Component {

  state = {
    displayIntro: false
  }

  render() {

    const path = this.props.location.pathname;
    const segment = path.split('/')[1] || 'root';

    const transitionName = segment === 'root' ? 'pageSwap' : 'pageSliderDown';

    return <div className="appComponent">
      <Header path={path} displayIntro={this.state.displayIntro}/>
      {this.props.children}
      <Footer/>
    </div>;
  }
}

export default App;
