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
const styles = {
  navbar: {
    border: 0,
  },
  gradientBackground: {
    background: "-moz-linear-gradient(top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0) 100%)",
    background: "-webkit-linear-gradient(top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.8) 55%,rgba(0,0,0,0) 100%)",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.8) 55%,rgba(0,0,0,0) 100%)",
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#00000000',GradientType=0 )"
  },
  brand: {
    color: "#FFF",
    fontWeight: 'normal',
    re: {
      position: 'relative',
      top: '-3px'
    },
    ':hover': {
      color: '#0FC'
    }
  },
  menuItem: {
    color: "#FFF",
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginLeft: '20px',
    ':hover': {
      color: '#0FC'
    }
  },
  searchIcon: {
    position: 'relative',
    top: '15px',
    marginRight: '20px'
  }
}

export default styles;
