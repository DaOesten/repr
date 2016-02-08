import React, { PropTypes } from 'react';

import TimerDisplay from './Timer';
import countdown from './countdown';
import say from './speech';

const PHASES = ['down', 'pause', 'up'];

export default class RepTimer extends React.Component {
  state = {
    prep: 5,
    reps: 2,
    down: 3,
    pause: 1,
    up: 3,
    countdown: null
  };

  render() {
    let params = ['prep', 'reps'];
    params = params.concat(PHASES);

    /// debug
    /* let timers = [];
       let { reps, prep, down, pause, up } = this.state;
       for (let i = prep + reps * (down + pause + up); i >= 0; i -= 1) {
       timers.push(<TimerDisplay {...this.state} countdown={i} />);
       } */

    return (
      <div className="row">
        <h1>Repr</h1>
        <div className="form-inline">
          {params.map(param => this._renderInput(param))}
        </div>
        <TimerDisplay {...this.state} />
        <button
                className="btn btn-success"
                onClick={this._getReady}>Start!
        </button>
      </div>
    );
  }

  _renderInput(param) {
    return (
      <div className="form-group" key={param} style={{paddingRight: 5}}>
        <label>
          {param.toUpperCase()}
        </label>
        {' '}
        <input
                className="form-control"
                type="number"
                value={this.state[param]}
                onChange={this._setValue.bind(this, param)}
        />
      </div>
    );
  }

  _setValue(param, e) {
    let time = e.target.value;
    this.setState({[param]: time});
  }

  _getReady = () => {
    let utterance = say('get ready');
    utterance.onend = this._countSet;
  };

  _countSet = () => {
    let { reps, prep, down, pause, up } = this.state;
    let totalTime = prep + reps * (down + pause + up);
    countdown(
      totalTime,
      (counter) => this.setState({
        countdown: counter
      })
    );
  };
}
