import PropTypes from 'prop-types';
import './Title.css'; 

const Title = ({ level, children, className }) => {
  const Tag = `h${level}`; // Define o nível do título dinamicamente (h1, h2, h3, etc.)

  return (
    <Tag className={`title ${className}`}>
      {children}
    </Tag>
  );
};

Title.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired, // O nível do título (h1-h6)
  children: PropTypes.node.isRequired, // O conteúdo do título
  className: PropTypes.string, // Classes CSS adicionais, se necessário
};

export default Title;
