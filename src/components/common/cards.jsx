import Card from '../common/card';

const Cards = ({ items }) => {
  return items.map((item, index) => <Card data={item} index={index} key={item.id} />);
};

export default Cards;
