import React from 'react';

class Timer extends React.Component {
    constructor() {
      super();
      this.state = { time: {}, seconds: 60, songCount: 1};
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
    secondsToTime(secs){
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.state.seconds//this.secondsToTime();
      this.setState({ time: timeLeftVar });
      this.startTimer()
    }
  
    startTimer() {
      if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.props.getCurrentlyPlaying(this.props.token);
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      // Check if we're at zero.
      if (seconds === 0) { 
        console.log(this.props)
        console.log('we\'ve hit zero, time for next song')
        this.props.skipToNextSong(this.props.token);
        clearInterval(this.timer);
        this.setState({time: {}, seconds: 60})
        let incrementCount = this.state.songCount+1;
        this.setState({songCount: incrementCount})
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer()
        this.timer = setInterval(this.countDown, 1000);

      }
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
        <h1 >{this.state.time.m}m {this.state.time.s}s</h1>
        </div>
        </div>
      );
    }
}

export default Timer;