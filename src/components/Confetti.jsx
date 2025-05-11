import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Celebration = ({ trigger = false }) => {
  const { width, height } = useWindowSize();

  if (!trigger || !width || !height) return null;

  return <Confetti width={width} height={height} />;
};

export default Celebration;
