import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Input extends Component {
  constructor(props) {
    super(props);
    const { name } = this.props;

    this.state = {
      [name]: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, type, value, dataTestId, placeholder, onChange, onBlur } = this.props;
    const { [name]: inputValue } = this.state;

    return (
      <div className="container-input">
        <input
          data-testid={ dataTestId }
          onBlur={ onBlur }
          onChange={ onChange || this.handleOnChange }
          name={ name }
          value={ value || inputValue }
          type={ type }
          placeholder={ placeholder }
        />
      </div>
    );
  }
}

Input.defaultProps = {
  name: 'inputValue',
  type: 'text',
  value: false,
  placeholder: '',
  dataTestId: '',
  onChange: false,
  onBlur: () => {},
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  placeholder: PropTypes.string,
  dataTestId: PropTypes.string,
  onChange: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onBlur: PropTypes.func,
};

export default Input;
