import PropTypes from 'prop-types';
import './TextInput.css'

const TextInput = ({ inputValue, setInputValue, label, placeholder, type, required, htmlFor }) => {

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="input-container">
    {label && <label htmlFor={htmlFor} className='label-input'>{label}</label>}
      <input
        id={htmlFor}
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        className="text-input"
      />
    </div>
  );
};

// Define o tipo da prop
TextInput.propTypes = {
  label: PropTypes.string,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  htmlFor: PropTypes.string
};

export default TextInput;
