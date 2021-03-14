import React from 'react';
import { TimerCount, TimerProps, TimerState } from './models/models';

const START_TIME: number = 10;

class Timer extends React.Component<TimerProps, TimerState> {

  initialTimer: TimerCount = {
    ...this.createTimeObj(START_TIME)
  }

  state = { time: { ...this.initialTimer }, songCount: 1, ticking: false };

  constructor(props: TimerProps) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.setState({
      ticking: true
    });
    this.startTimer();
  }

  componentDidUpdate() {
    if(!this.state.ticking) {
      this.startTimer();
      this.setState({
        ticking: true
      });
    }
  }

  async startTimer() {
    // Loop through a list of [0,1,2,3...START_TIME-1]
    for (const num of Array(START_TIME+1).keys()) {
      // Set a tick to occur every 1.000 * n seconds
      await setTimeout(this.tick, 1000*(num+1), num);
    }
  }

  createTimeObj(seconds: number): TimerCount {
    return { minutes: Math.floor(seconds/60), seconds: seconds % 60 };
  }

  tick = async (num: number) => {
    // Unroll this.state.time into new object (basically clone it)
    let newTime = { ...this.state.time };
    if(this.state.time.seconds === 0) {
      if(this.state.time.minutes === 0) {
        this.props.skipToNextSong();
        this.setState({
          time: this.createTimeObj(START_TIME),
          songCount: this.state.songCount + 1,
          ticking: false
        });
        return;
      }
      newTime.minutes -= 1;
      newTime.seconds = 60;
    }
    newTime.seconds -= 1;
    this.setState({
      time: newTime
    });
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