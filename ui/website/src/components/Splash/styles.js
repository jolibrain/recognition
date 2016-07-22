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
  fullHeight: {
  },
  h2: {
    borderBottom: '2px dotted #FFF',
    fontSize: '14px',
    fontWeight: 'bold',
    paddingBottom: '8px',
    textTransform: 'uppercase'
  },
  ul: {
    padding: 0,
    li: {
      listStyle: 'none',
      textTransform: 'uppercase'
    }
  },
  share: {},
  imgDescription: {
    color: '#4a4a4a',
    fontWeight: 'bold',
    marginTop: '20px'
  },
  footer: {
    bottom: '20px',
    position: 'absolute',
    width: '100%',
    galleryLinkContainer: {
      textAlign: 'center'
    },
    galleryLink: {
      color: '#FFF',
      ':hover': {
        textDecoration: 'none',
        color: '#00ffcc'
      }
    },
    arrowDown: {
      fontSize: '20px'
    }
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%'
  }

}

export default styles;
