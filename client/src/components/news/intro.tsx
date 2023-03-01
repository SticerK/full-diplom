import React from 'react';
import styles from './news.module.scss';
import { Link } from 'react-router-dom';
import { newsData } from '../../data/new';

interface PostProps {
  className: string;
  data: newsData;
}

const Intro: React.FC<PostProps> = ({ className, data }) => {
  return (
    <div className={[className, styles.post].join(' ')}>
      <img src={data.url} className={styles.postImg} />
      <Link to={`/news/${data.id}`} className={styles.shadow}></Link>
      <div className={styles.descr}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.text}>{data.sr}</div>
      </div>
    </div>
  );
};

export default Intro;
