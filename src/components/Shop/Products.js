import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: 'The Great Gatsby',
    price: 10.99,
    description: 'A classic novel by F. Scott Fitzgerald.',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    price: 12.99,
    description: 'A Pulitzer Prize-winning novel by Harper Lee.',
  },
  {
    id: 3,
    title: 'Pride and Prejudice',
    price: 9.99,
    description: 'A beloved novel by Jane Austen.',
  },
  {
    id: 4,
    title: '1984',
    price: 11.99,
    description: 'A dystopian novel by George Orwell.',
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    price: 10.99,
    description: 'A coming-of-age novel by J.D. Salinger.',
  },
  {
    id: 6,
    title: 'To the Lighthouse',
    price: 13.99,
    description: 'A modernist novel by Virginia Woolf.',
  },
  {
    id: 7,
    title: 'Brave New World',
    price: 11.99,
    description: 'A dystopian novel by Aldous Huxley.',
  },
  {
    id: 8,
    title: 'Moby-Dick',
    price: 14.99,
    description: 'A classic novel by Herman Melville.',
  },
  {
    id: 9,
    title: 'The Hobbit',
    price: 9.99,
    description: 'A fantasy novel by J.R.R. Tolkien.',
  },
  {
    id: 10,
    title: 'Jane Eyre',
    price: 12.99,
    description: 'A Gothic novel by Charlotte Brontë.',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
