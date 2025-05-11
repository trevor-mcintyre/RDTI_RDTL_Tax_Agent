import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Celebration = ({ trigger }) => {
  const { width, height } = useWindowSize();
  return trigger ? <Confetti width={width} height={height} /> : null;
};

export default Celebration;