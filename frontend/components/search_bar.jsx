import { TextField, Button } from '@mui/material';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ setUrl, children, setRss }) => {
  const changeUrlEvent = (e) => {
    setUrl(e.target.value);
  };

  const fetchDataEvent = async () => {
    if (children === '') {
      return;
    }
    const response = await fetch('http://localhost:8080', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: encodeURI(children) }),
    });
    const raw = await response.text();
    const json = await JSON.parse(raw);

    console.log(json.msg);
    //		json.msg.content = parse(json.msg.content);

    setRss(json.msg);
  };

  return (
    <div className={styles.search_bar}>
      <TextField
        className={styles.outlined_basic}
        label='url'
        variant='outlined'
        onChange={changeUrlEvent}
      />
      <Button onClick={fetchDataEvent} variant='contained' color='primary'>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
