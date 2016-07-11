const tateicons = {
    fontFamily: "tateicons",
    fontStyle: "normal",
    fontWeight: "normal",
    src: "url('fonts/tateicons.eot')",
    src: "url('fonts/tateicons.eot?cce82p#iefix') format('embedded-opentype')",
    src: "url('fonts/tateicons.ttf') format('truetype')",
    src: "url('fonts/tateicons.woff') format('woff')",
    src: "url('fonts/tateicons.svg?cce82p#tateicons') format('svg')",
};

const styles = {
  bg: {
    position: 'fixed',
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%',
    zIndex: -1,
    filter: "blur(5px) brightness(80%)"
  },
  downIcon: {
    fontFamily: tateicons,
    fontSize: '20px',
    color: '#FFF',
    content: "\e90a"
  },
  imgTate: {

  },
  mainTitle: {
    fontSize: '2.5em',
    color: '#FFF',
    textAlign: 'center'
  },
  column: {
    fontSize: '14px',
    color: '#FFF',
    h2: {

    },
    hr: {
    }
  },
  gray: {
    color: '#4a4a4a'
  },
  black: {
    color: '#0d1215'
  },
  green: {
    color: '#00ffcc'
  }
}

export default styles;
