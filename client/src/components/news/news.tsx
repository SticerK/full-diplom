import React from 'react';
import styles from './news.module.scss';
import Intro from './intro';
import news from '../../data/new';
import { useParams } from 'react-router-dom';
import Post from './post';

const News: React.FC = () => {
  const { id }: { id: string } = useParams();

  if (id) return <Post />;

  return (
    <div className={styles.wrapper}>
      {news.map((item, index) => (
        <Intro className={`post-${index + 1}`} data={item} />
      ))}
    </div>
  );
};

export default News;
