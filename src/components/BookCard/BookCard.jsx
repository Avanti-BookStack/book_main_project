import PropTypes from 'prop-types';
import styles from './BookCard.module.css';

const BookCard = ({ title, category, author, publisher, publicationYear, description, coverImage, availableNow, registrationDate }) => {
  return (
    <div className={styles.card}>
      <img src={coverImage} alt={`Capa do livro ${title}`} className={styles.coverImage} />
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p><strong>Categoria:</strong> {category}</p>
        <p><strong>Autor:</strong> {author}</p>
        <p><strong>Editora:</strong> {publisher}</p>
        <p><strong>Ano de Publicação:</strong> {publicationYear}</p>
        <p><strong>Descrição:</strong> {description}</p>
        <p><strong>Disponível Agora:</strong> {availableNow ? 'Sim' : 'Não'}</p>
        <p><strong>Data de Registro:</strong> {new Date(registrationDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  publicationYear: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  availableNow: PropTypes.bool.isRequired,
  registrationDate: PropTypes.string.isRequired,
};

export default BookCard;

