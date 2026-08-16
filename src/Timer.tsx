import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { device } from "./styles/sizes";
import { TimerCount, TimerProps } from "./models/models";

const START_TIME = 10;

const createTimeObj = (seconds: number): TimerCount => {
  return { minutes: Math.floor(seconds / 60), seconds: seconds % 60 };
};

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

const Timer = (props: TimerProps) => {
  const [time, setTime] = useState<TimerCount>(() => createTimeObj(START_TIME));
  const [songCount, setSongCount] = useState(1);
  const [partyOver, setPartyOver] = useState(false);

  const tick = () => {
    if (partyOver || props.paused) {
      return;
    }
    const newTime = { ...time };
    if (time.seconds === 0) {
      if (time.minutes === 0) {
        if (songCount < props.numberOfSongs) {
          props.skipToNextSong();
          setTime(createTimeObj(props.interval));
          setSongCount(songCount + 1);
        } else {
          setPartyOver(true);
          props.partyOver();
        }
        return;
      }
      newTime.minutes -= 1;
      newTime.seconds = 60;
    }
    newTime.seconds -= 1;
    setTime(newTime);
  };

  // Keep the interval callback pointing at the latest props and state
  const savedTick = useRef(tick);
  useEffect(() => {
    savedTick.current = tick;
  });

  useEffect(() => {
    const id = setInterval(() => savedTick.current(), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <TimerContainer>
        <DrinkCounter>
          <h4>Currently on</h4>
          <h1>
            Drink {songCount}/{props.numberOfSongs}
          </h1>
        </DrinkCounter>
        <h4>
          {partyOver && (
          "You finished!"
          )}
        </h4>
        <TimeCounter>
          <h4>Time Remaining:</h4>
          <h1>
            {time.minutes}m {time.seconds}s
          </h1>
        </TimeCounter>
    </TimerContainer>
  );
};

export default Timer;
