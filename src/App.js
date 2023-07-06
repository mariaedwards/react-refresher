import './App.css';
import { useState } from 'react';

const DUMMY_DATA = [
  {
    id: 1,
    name: 'Avocado Toast',
    price: 9.99,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: true,
  },
  {
    id: 2,
    name: 'Grilled Chicken Salad',
    price: 12.99,
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: true,
  },
  {
    id: 3,
    name: 'Margherita Pizza',
    price: 14.99,
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: false,
  },
  {
    id: 4,
    name: 'Quinoa Bowl',
    price: 10.99,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: true,
  },
  {
    id: 5,
    name: 'Steak Sandwich',
    price: 16.99,
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
  },
  {
    id: 6,
    name: 'Veggie Burger',
    price: 11.99,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: false,
  },
  {
    id: 7,
    name: 'Salmon Sushi Roll',
    price: 9.99,
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: true,
  },
  {
    id: 8,
    name: 'Spinach and Feta Stuffed Mushrooms',
    price: 8.99,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: true,
  },
  {
    id: 9,
    name: 'Chicken Pad Thai',
    price: 13.99,
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
  },
  {
    id: 10,
    name: 'Vegetable Curry',
    price: 12.99,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: true,
  },
];

function sortData(data, type, sortType) {
  return [...data].sort((a, b) => {
    if (a[type] < b[type]) {
      return sortType === 'asc' ? -1 : 1;
    }
    if (a[type] > b[type]) {
      return sortType === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

function App() {
  const [data, setData] = useState(DUMMY_DATA);
  const handleSort = (e, type, sortType) => {
    const sortedData = sortData(data, type, sortType);
    setData(sortedData);
  };
  return (
    <div>
      <header>
        <h1>Table sort</h1>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>
                Name
                <button
                  onClick={(e) => {
                    handleSort(e, 'name', 'asc');
                  }}>
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    handleSort(e, 'name', 'desc');
                  }}>
                  ↓
                </button>
              </th>
              <th>
                Price
                <button
                  onClick={(e) => {
                    handleSort(e, 'price', 'asc');
                  }}>
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    handleSort(e, 'price', 'desc');
                  }}>
                  ↓
                </button>
              </th>
              <th>
                Is Vegan{' '}
                <button
                  onClick={(e) => {
                    handleSort(e, 'isVegan', 'asc');
                  }}>
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    handleSort(e, 'isVegan', 'desc');
                  }}>
                  ↓
                </button>
              </th>
              <th>
                Is Vegetarian{' '}
                <button
                  onClick={(e) => {
                    handleSort(e, 'isVegetarian', 'asc');
                  }}>
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    handleSort(e, 'isVegetarian', 'desc');
                  }}>
                  ↓
                </button>
              </th>
              <th>
                Is Gluten Free{' '}
                <button
                  onClick={(e) => {
                    handleSort(e, 'isGlutenFree', 'asc');
                  }}>
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    handleSort(e, 'isGlutenFree', 'desc');
                  }}>
                  ↓
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{String(item.isVegan)}</td>
                <td>{String(item.isVegetarian)}</td>
                <td>{String(item.isGlutenFree)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
