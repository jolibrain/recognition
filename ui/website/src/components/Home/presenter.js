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
import Splash from '../Splash';
import Gallery from '../Gallery';
import GoogleTagManager from '../GoogleTagManager';
import Waypoint from 'react-waypoint';

class Home extends React.Component {

  _setGalleryMenu(position) {
    document.getElementById("galleryMenu").classList.toggle('menuSelected', position.currentPosition == "above");
  }

  render() {

    return (<div>
      <Splash/>
      <Waypoint
        onPositionChange={this._setGalleryMenu.bind(this)}
      />
      <Gallery disableGTM={true} />
      <GoogleTagManager dataLayerName='Home'/>
    </div>);
  }
}

export default Home;
