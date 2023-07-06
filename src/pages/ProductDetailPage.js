import { useParams, Link } from 'react-router-dom';

function ProductsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Product {id} Page</h1>
      <div>
        <Link to="..">
          Go back home / relative path with default relative="route"
        </Link>
      </div>
      <div>
        <Link to="/">Go back home / absolute path</Link>
      </div>

      <div>
        <Link to=".." relative="path">
          Go back products / relative path
        </Link>
      </div>
      <div>
        <Link to="/products">Go back products / absolute path</Link>
      </div>
    </div>
  );
}

export default ProductsPage;
