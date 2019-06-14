import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInputGroup = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error
}) => {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          className={classnames('form-control form-control-lg', {
            'is-invalid': error
          })}
          onChange={onChange}
        />
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  );
};
TextInputGroup.defaultProps = {
  type: 'text'
};
TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default TextInputGroup;
