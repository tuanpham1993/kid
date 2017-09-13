import React from 'react';
import ReactDOM from 'react-dom';

const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'red', 'blue', 
'yellow', 'grey', 'orange', 'black', 'pink', 'brown', 'white', 'green', 'dog','cat','elephant','chicken','monkey','bear','fish',
'bird', 'goat', 'pig'];

const point = 10 / words.length;

const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

shuffle(words);

class Image extends React.Component {
  render() {
    return <div>
            <img width="100" height="100" src={'src/img/' + words[this.props.index] + '.png'} />
            <img width="100" height="100" src={'src/img/' + words[this.props.index] + '.jpg'} />
            </div>
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      value: '',
      currentPoint: 10
    }
    this.handle = this.handle.bind(this);
    this.suggest = this.suggest.bind(this);
  }
  render() {
    return this.renderImage(0);
  }

  check() {
    if (this.state.index === words.count) {
      return;
    }
    if (words[this.state.index] === this.state.value) {
      this.setState({index: this.state.index + 1, value: ''});
    } else if (this.state.currentPoint > 0) {
      this.setState({currentPoint: this.state.currentPoint - point});
    }
  }

  suggest() {
    alert(words[this.state.index]);
    this.setState({currentPoint: this.state.currentPoint - 1});
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  handle(e) {
    if(e.key === 'Enter') {
      this.check();
    }
  }

  renderImage() {
    return (
      <div className="app-container">
        <Image index={this.state.index} />
        <input type="text" placeholder="Type here" value={this.state.value} onChange={(e) => this.handleChange(e.target.value)} onKeyPress={this.handle}/>
        <button onClick={ this.suggest }>
          Suggest
        </button>
        <label>{this.state.currentPoint}</label>
        <br/>
        <label>{this.state.index + 1}</label><span>/{words.length}</span>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
