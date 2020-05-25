/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteFlagPng from '../../resources/white_flag.png';
import bombPng from '../../resources/bomb.png';
import explosionPng from '../../resources/boom.png';

const imgStyle = { height: '80%' };

function Node({
  x,
  y,
  onRevealNode,
  onFlagNode,
  onQuestionMarkNode,
  explosion,
  mine,
  hint,
  flag,
  questionMark,
  size,
}) {
  useEffect(() => {
    const elem = document.getElementById(`node-${x}.${y}`);
    if (!elem) return;
    const handler = event => {
      if (event) {
        event.preventDefault();
        onFlagNode();
      }
    };
    elem.addEventListener('contextmenu', handler);
    return () => elem.removeEventListener('contextmenu', handler);
  }, [onFlagNode]);
  const gotHint = hint || hint === '0' || hint === 0;
  let content = '';
  if (explosion) {
    content = <img src={explosionPng} style={imgStyle} alt="T" />;
  } else if (gotHint) {
    content = hint > 0 ? hint : '';
  } else if (mine) {
    content = <img src={bombPng} style={imgStyle} alt="T" />;
  } else if (flag) {
    content = <img src={whiteFlagPng} style={imgStyle} alt="T" />;
  } else if (questionMark) {
    content = '?';
  }
  return (
    <div
      id={`node-${x}.${y}`}
      onClick={i => {
        if (i.altKey) {
          onQuestionMarkNode();
        } else {
          onRevealNode();
        }
      }}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderStyle: 'solid',
        borderWidth: 'thin',
        background: gotHint ? 'white' : 'grey',
        margin: '1px',
        fontSize: `${Math.floor(size * 0.6)}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {content}
    </div>
  );
}

Node.defaultProps = {
  hint: null,
  flag: false,
  explosion: false,
  mine: false,
};

Node.propTypes = {
  onRevealNode: PropTypes.func.isRequired,
  onFlagNode: PropTypes.func.isRequired,
  onQuestionMarkNode: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  hint: PropTypes.number,
  flag: PropTypes.bool,
  questionMark: PropTypes.bool,
  explosion: PropTypes.bool,
  mine: PropTypes.bool,
  size: PropTypes.number,
};

export default Node;
