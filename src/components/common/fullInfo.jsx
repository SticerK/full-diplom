import MyButton from '../UI/MyButton';
import Section from './section';

const FullInfo = ({ title, descr, url }) => {
  return (
    <div className='container'>
      <Section>
        <div className='fullInfo'>
          <img src={url} alt='' className='fullInfo-image' />
          <div className='fullInfo-text'>
            <div className='fullInfo-title'>{title}</div>
            <div className='fullInfo-descr'>{descr}</div>
            <div className='fullInfo-footer'>
              <MyButton path={'/flight'}>Назад</MyButton>
              <MyButton path={'/flight'}>Купить</MyButton>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FullInfo;
