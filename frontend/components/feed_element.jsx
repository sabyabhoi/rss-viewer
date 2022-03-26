import { Button } from '@mui/material';
import styles from '../styles/FeedElement.module.css';

const FeedElement = ({ title, date, content }) => {
  return (
    <div className={styles.element}>
      <h2>{title}</h2>
      <h3>{date}</h3>
      <p>{content}</p>
      <Button variant='outlined'>Read more</Button>
    </div>
  );
};

export default FeedElement;
