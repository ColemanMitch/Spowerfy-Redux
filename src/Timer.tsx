import React from 'react';
import styled from 'styled-components';
import { TimerCount, TimerProps, TimerState } from './models/models';

const START_TIME = 10;

const DrinkCounter = styled.div`
  padding-left: 15%;
  float: left;
`;

const TimeCounter = styled.div`
  padding-right: 15%;
  float: right;
`;

class Timer extends React.Component<TimerProps, TimerState> {
  initialTimer: TimerCount = {
    ...this.createTimeObj(START_TIME)
  }

  state = { time: { ...this.initialTimer }, songCount: 1, ticking: false };

  constructor(props: TimerProps) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      ticking: true,
    });
    setInterval(this.tick, 1000)
  }

  componentDidUpdate() {
    if(!this.state.ticking) { //if not ticking
      if (!this.props.paused) { // and if playing
        this.setState({
          ticking: true // set ticking to true
        });
      }  
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
        <DrinkCounter>
          <h4>Currently on</h4>
          <h1>Drink {this.state.songCount}/{this.props.numberOfSongs}</h1> 
        </DrinkCounter>
        <TimeCounter>
          <h4 >Time Remaining:</h4> 
          <h1 >{this.state.time.minutes}m {this.state.time.seconds}s</h1>
        </TimeCounter>
      </div>
    );
  }
}

export default Timer;