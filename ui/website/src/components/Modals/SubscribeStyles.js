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
  component: {
  },
  modal: {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
  },
  backdrop: {
    position: 'fixed',
    top: 0, bottom: 0, left: 0, right: 0,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
  },
  dialog: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#0d1215',
    border: '1px solid #4a4a4a',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 32,
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none'
  },
  link: {
    color: 'rgb(255, 255, 255)',
    textTransform: 'uppercase',
    fontWeight: 'normal',
    letterSpacing: '1.5px',
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      color: '#0FC'
    }
  },
  title: {
    color: '#FFF',
    fontFamily: 'TateNewPro-Thin',
    fontSize: '24px',
    margin: 0
  },
  text: {
    color: '#AAA',
    fontFamily: 'TateNewPro',
    fontSize: '18px'
  },
  input: {
    color: '#fff',
    background: 'rgb(13, 18, 21)',
    borderStyle: 'dotted',
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    marginRight: '10px',
    width: '80%',
    outline: 'none'
  },
  button: {
    border: 0,
    outline: 'none',
    color: '#fff',
    backgroundColor: 'rgb(13, 18, 21)'
  }
}

export default styles;
