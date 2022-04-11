import { ThreeSixtyOutlined } from '@material-ui/icons';
import React from 'react';
import { convertToObject } from 'typescript';
import { TimerCount, TimerProps, TimerState } from './models/models';

const START_TIME = 10;

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
      ticking: true,
    });
    this.startTimer();
  }

  componentDidUpdate() {
    if(!this.state.ticking) { //if not ticking
      if (!this.props.paused) { // and if playing
        this.startTimer(); // start the timer
        this.setState({
          ticking: true // set ticking to true
        });
      }  
    }
  }

  async startTimer() {
    // Loop through a list of [0,1,2,3...START_TIME-1]
      for (const num of Array(this.props.interval+1).keys()) { // new interval will take effect AFTER current interval has run out
        // Set a tick to occur every 1.000 * n seconds
          if (this.props.paused) {
            break;
          }
          await setTimeout(this.tick, 1000*(num+1));
      
      }
  }

  createTimeObj(seconds: number): TimerCount {
    return { minutes: Math.floor(seconds/60), seconds: seconds % 60 };
  }

  tick = async () => {
    console.log(this.props, this.state);

    const newTime = { ...this.state.time };
    if (!this.props.paused) { // if it's playing (not paused)
        if(this.state.time.seconds === 0) {
        if(this.state.time.minutes === 0) {
          console.log('times up!')
          this.props.skipToNextSong();
          this.setState({
            time: this.createTimeObj(this.props.interval),//(START_TIME),
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
    else { // if it's paused make sure ticking is false
      this.setState({
        ticking: false
      });
      return
    }
  }

  render() {
    return(
      <div>
        <div className="drink-counter" style={{float:"left"}}>
          <h4>Currently on</h4>
          <h1>Drink {this.state.songCount}/{this.props.numberOfSongs}</h1> 
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