import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function getOnePizza() {
      try {
        const { data } = await axios.get(`https://63a6f4be7989ad3286e69023.mockapi.io/items/` + id);
        setItem(data);
      } catch (error) {
        console.log('Ошибка при получении пиццы', error);
      }
    }

    getOnePizza();
  }, []);

  if (!item) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className="container ">
      <div className="fullpizza">
        <img className="fullpizza__img" src={item.imageUrl} alt="Pizza" />
        <h2 className="fullpizza__title">{item.title}</h2>
        <h4 className="fullpizza__price">{item.price} P</h4>
      </div>
    </div>
  );
};

export default FullPizza;
