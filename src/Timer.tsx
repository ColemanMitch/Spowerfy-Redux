import React from 'react';
import { TimerProps, TimerState } from './models/models';

const START_TIME = 100;

class Timer extends React.Component<TimerProps, TimerState> {

  state = { time: { minutes: 1, seconds: 0 }, songCount: 1};

  constructor(props: TimerProps) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  async startTimer() {
    // Loop through a list of [0,1,2,3...START_TIME-1]
    for (const num of Array(START_TIME).keys()) {
      // Set a tick to occur every 1.000 * n seconds
      await setTimeout(this.tick, 1000*num, num);
    }
  }

  tick = async (num: number) => {
    // Unroll this.state.time into new object (basically clone it)
    let newTime = { ...this.state.time };
    if(this.state.time.seconds === 0) {
      if(this.state.time.minutes === 0) {
        this.props.skipToNextSong();
        return;
      }
      newTime.minutes -= 1;
      newTime.seconds = 60;
    }
    newTime.seconds -= 1;
    this.setState({
      time: newTime
    })
    console.log('tick ', num);
  }

  render() {
    return(
      <div>
        <div className="drink-counter" style={{float:"left"}}>
          <h4>Currently on</h4>
          <h1>Drink #{this.state.songCount}</h1> 
        </div>
        <div className="time-counter" style={{float:"right"}}>
          <h4 >Time Remaining:</h4> 
          <h1 >{this.state.time.minutes}m {this.state.time.seconds}s</h1>
        </div>
      </div>
    );
  }
}

export default Timer;