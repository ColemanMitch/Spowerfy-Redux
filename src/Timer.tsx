import { ThreeSixty } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { device } from "./styles/sizes";
import { TimerCount, TimerProps, TimerState } from "./models/models";

const START_TIME = 10;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 1rem;
  @media ${device.mobileL} {
    flex-direction: row
  }
`

const DrinkCounter = styled.div`
  @media ${device.mobileL} {
    padding-left: 15%;
    float: left;
  }  
  padding-left: 5%;
  padding-right: 5%;
  min-width: 164px;
`;

const TimeCounter = styled.div`
  @media ${device.mobileL} {
    padding-right: 15%;
    float: right;
  }  
  padding-left: 5%;
  padding-right: 5%;
  min-width: 132px;
`;

class Timer extends React.Component<TimerProps, TimerState> {
  initialTimer: TimerCount = {
    ...this.createTimeObj(START_TIME),
  };

  state = { time: { ...this.initialTimer }, songCount: 1, ticking: false, partyOver: false };

  constructor(props: TimerProps) {
    super(props);
  }
  

  componentDidMount() {
    this.setState({
      ticking: true,
    });
    setInterval(this.tick, 1000);
  }

  componentDidUpdate() {
    if (!this.state.ticking) {
      //if not ticking
      if (!this.props.paused) {
        // and if playing
        this.setState({
          ticking: true, // set ticking to true
        });
      }
    }
  }

  createTimeObj(seconds: number): TimerCount {
    return { minutes: Math.floor(seconds / 60), seconds: seconds % 60 };
  }

  tick = async () => {
    if (!this.state.partyOver) {
      const newTime = { ...this.state.time };
      if (!this.props.paused) {
        // if it's playing (not paused)
        if (this.state.time.seconds === 0) {
          if (this.state.time.minutes === 0) {
            if (this.state.songCount < this.props.numberOfSongs) {
              this.props.skipToNextSong();
              this.setState({
                time: this.createTimeObj(this.props.interval), 
                songCount: this.state.songCount + 1,
                ticking: false,
              });
            } else
            {
              this.setState({
                partyOver: true,
              })
              this.props.partyOver();
            }
            return;
          }
          newTime.minutes -= 1;
          newTime.seconds = 60;
        }
        newTime.seconds -= 1;
        this.setState({
          time: newTime,
        });
      } else {
        // if it's paused make sure ticking is false
        this.setState({
          ticking: false,
        });
        return;
      }
    } 
    return;     
  };

  render() {
    return (
      <TimerContainer>
          <DrinkCounter>
            <h4>Currently on</h4>
            <h1>
              Drink {this.state.songCount}/{this.props.numberOfSongs}
            </h1>
          </DrinkCounter>
          <TimeCounter>
            <h4>Time Remaining:</h4>
            <h1>
              {this.state.time.minutes}m {this.state.time.seconds}s
            </h1>
          </TimeCounter>
          {this.state.partyOver && (
          "You finished!"
          )}
      </TimerContainer>
    );
  }
}

export default Timer;