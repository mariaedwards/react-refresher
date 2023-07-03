import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          'https://react-refresher-476ad-default-rtdb.firebaseio.com/meals.json'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch meals.');
        }
        const data = await response.json();
        const meals = [];
        for (const key in data) {
          meals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(meals);
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
      setLoading(false);
    };

    fetchMeals();
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && (
          <ul>
            {meals.map((meal) => (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
