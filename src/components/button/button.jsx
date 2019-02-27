import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Button fills the entire div it is contained in
const GenericButtonStyle = styled.button`
  background: ${props => props.backgroundColor};
  color: ${props => props.color};
  border: 2px solid ${props => props.borderColor};
  padding: 3px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 18px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.65' : '1.0')};

  :focus {
    outline: 1px solid blue;
  }
`;

const GenericButton = props => {
  const { onClickFunction, text, backgroundColor, color, width, height, type, disabled, testId, borderColor } = props;
  return (
    <GenericButtonStyle
      data-testid={testId}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      color={color}
      onClick={onClickFunction}
      width={width}
      height={height}
      type={type}
      disabled={disabled}
    >
      {text}
    </GenericButtonStyle>
  );
};

GenericButton.propTypes = {
  onClickFunction: PropTypes.func,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  testId: PropTypes.string
};

GenericButton.defaultProps = {
  onClickFunction: () => {},
  backgroundColor: '#0074d9',
  borderColor: '#0d47a1',
  color: '#ffffff',
  width: '100%',
  height: '100%',
  type: 'button',
  disabled: false,
  testId: 'generic-button'
};

export default GenericButton;
