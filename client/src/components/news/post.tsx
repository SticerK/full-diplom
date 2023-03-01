import React from 'react';
import news, { newsData } from '../../data/new';
import { useParams, useHistory } from 'react-router-dom';
import styles from './news.module.scss';
import MyButton from '../UI/MyButton';

const Post: React.FC = () => {
  const [post, setPost] = React.useState({} as newsData);

  const { id }: { id: string } = useParams();
  const history = useHistory();
  React.useEffect(() => {
    const text = news.find((item) => String(item.id) === id);
    setPost(text as newsData);
  }, []);

  return (
    <div className={styles.wrapperNews}>
      <img src={post.url} className={styles.postHeader} />
      <div className={styles.fullDescr}>{post.descr}</div>
      <MyButton func={() => history.go(-1)}>Назад</MyButton>
    </div>
  );
};

export default Post;
