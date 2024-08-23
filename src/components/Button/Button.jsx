import PropTypes from 'prop-types'
import "../Button/Button.css"

const Button = ({ label, type, onClick, additionalClass }) => {
  return (
    <button 
    className={`button ${additionalClass ? additionalClass : ''}`}
    type={type}
    onClick={onClick}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  additionalClass: PropTypes.string
}

export default Button