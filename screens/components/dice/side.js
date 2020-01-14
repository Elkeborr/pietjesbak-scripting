import React from "react";
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask
} from "react-native-svg";

const Square = props => {
  return (
    <Rect
      {...props}
      x={4}
      y={4}
      width={94}
      height={94}
      rx={10}
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth={5}
    ></Rect>
  );
};

const Dot = props => {
  return <Circle {...props} r={10}></Circle>;
};

const Side = props => {
  return (
    <Svg height={100} width={100}>
      <Square></Square>
      {props.children}
    </Svg>
  );
};

export const SideOne = props => (
  <Side>
    <Dot cx={50} cy={50}></Dot>
  </Side>
);

export const SideTwo = props => (
  <Side>
    <Dot cx={75} cy={75}></Dot>
    <Dot cx={25} cy={25}></Dot>
  </Side>
);

export const SideThree = props => (
  <Side>
    <Dot cx={75} cy={75}></Dot>
    <Dot cx={50} cy={50}></Dot>
    <Dot cx={25} cy={25}></Dot>
  </Side>
);

export const SideFour = props => (
  <Side>
    <Dot cx={75} cy={75}></Dot>
    <Dot cx={75} cy={25}></Dot>
    <Dot cx={25} cy={75}></Dot>
    <Dot cx={25} cy={25}></Dot>
  </Side>
);

export const SideFive = props => (
  <Side>
    <Dot cx={75} cy={75}></Dot>
    <Dot cx={75} cy={25}></Dot>
    <Dot cx={50} cy={50}></Dot>
    <Dot cx={25} cy={75}></Dot>
    <Dot cx={25} cy={25}></Dot>
  </Side>
);

export const SideSix = props => (
  <Side>
    <Dot cx={75} cy={75}></Dot>
    <Dot cx={75} cy={50}></Dot>
    <Dot cx={75} cy={25}></Dot>
    <Dot cx={25} cy={75}></Dot>
    <Dot cx={25} cy={50}></Dot>
    <Dot cx={25} cy={25}></Dot>
  </Side>
);

export default Side;
