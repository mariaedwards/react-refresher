import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  function navigationHandler() {
    navigate('/products');
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={navigationHandler}>Go to Products</button>
    </div>
  );
}

export default HomePage;
