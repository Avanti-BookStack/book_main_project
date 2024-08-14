import PropTypes from 'prop-types'
import "../Button/Button.css"

const Button = ({ label, type, onClick }) => {
  return (
    <button 
    className='button'
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
  onClick: PropTypes.func
}

export default Button