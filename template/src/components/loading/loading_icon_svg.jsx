/**
 * Created by Amg on 2017/3/10.
 */
import React from 'react';
import PropTypes from 'prop-types';

const LoadingIconSvg = (props) => {
  const { color, count, width, height, radius, offset, speed } = props;

  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="uil-default"
    >
      {
        Array(count).fill('').map((item, idx) => {
          const dAngle = 360 / count;
          const dTime = 1 / count;
          return (
            <rect
              key={idx}
              x={`${50 - (width / 2)}`}
              y={`${50 - (height / 2)}`}
              width={width}
              height={height}
              rx={radius}
              ry={radius}
              fill={color}
              transform={`rotate(${(dAngle * idx)} 50 50) translate(0 -${(offset)} )`}
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur={`${speed}s`}
                begin={`${(dTime * idx)}s`}
                repeatCount="indefinite"
              />
            </rect>
          );
        })
      }
    </svg>
  );
};

LoadingIconSvg.defaultProps = {
  color: '#ffffff',
  count: 8,
  width: 8,
  height: 25,
  radius: 5,
  offset: 25,
  speed: 1,
};

LoadingIconSvg.propTypes = {
  color: PropTypes.string,
  count: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  offset: PropTypes.number,
  speed: PropTypes.number,
};

export default LoadingIconSvg;
