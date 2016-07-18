const styles = {
  underline: {
    textDecoration: 'underline'
  },
  borderless: {
    border: 'none !important'
  },
  detailColumn: {
    width:'30%',
    fontFamily: 'monospace',
    fontSize:'12px',
    textTransform: 'uppercase',
    background: "-moz-linear-gradient(left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)",
    background: "-webkit-linear-gradient(left, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)",
    background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)",
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=1 )"
  },
  hover: {
    color: '#0fc',
  },
  row: {
    borderBottom: '1px dotted #4a4a4a',
    padding: '20px 0',
    cursor: 'pointer'
  },
  descriptionColumn: {
    color: '#4a4a4a'
  },
  input: {
    date: {
      color: '#fff',
    },
    title: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    origin: {
      textTransform: 'uppercase'
    }
  },
  output: {
    date: {
      color: '#fff',
    },
    title: {
      color: '#fff',
      fontStyle: 'italic',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    author: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    origin: {
      textTransform: 'uppercase'
    }
  },
  dataRow: {
    position: 'absolute',
    top: '60px',
    width: '100%',
    pointerEvents: 'none'
  },
  json: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: '#FFF',
    fontFamily: 'TateNewPro',
    border: 0,
    fontSize: '14px',
  }
}

export default styles;
