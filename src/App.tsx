import './App.css';
import { useEffect, useState } from 'react';

interface Card {
  id: string;
  name: string;
}

interface ApiResponse {
  cards: Card[];
}

const cashedCards = new Map();

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const isLastPage =
    totalPages / pageSize === Math.floor(totalPages / pageSize);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      const id = `page-${page}-pageSize-${pageSize}`;
      if (cashedCards.has(id)) {
        console.log('Using cached cards');
        setCards(cashedCards.get(id));
      } else {
        console.log('Fetching new cards');
        try {
          const validatedPage = Math.max(1, Math.floor(page));
          const validatedPageSize = Math.min(
            100,
            Math.max(10, Math.floor(pageSize))
          );
          const response: any = await fetch(
            'https://api.magicthegathering.io/v1/cards?page=' +
              validatedPage +
              '&pageSize=' +
              validatedPageSize
          );
          if (!response.ok) {
            throw new Error('Failed to fetch cards');
          }
          const data: ApiResponse = await response.json();
          setTotalPages(response.headers.get('Total-Count'));
          setCards(data.cards);
          cashedCards.set(id, data.cards);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Something went wrong');
          }
        }
      }

      setLoading(false);
    }

    fetchCards();
  }, [page, pageSize]);

  function increasePage() {
    setPage((previousPage) => previousPage + 1);
  }
  function decreasePage() {
    setPage((previousPage) => previousPage - 1);
  }

  function handlePageSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    let selectedPageSize = Number(event.target.value);
    if (selectedPageSize < 10) {
      selectedPageSize = 10;
    } else if (selectedPageSize > 100) {
      selectedPageSize = 100;
    }

    setPageSize(Number(selectedPageSize));
  }

  return (
    <div>
      <header>
        <h1>MTG Cards</h1>
        <div
          style={{
            display: 'flex',
          }}>
          <button
            style={{
              display: 'flex',
              marginLeft: '1rem',
            }}
            onClick={decreasePage}
            disabled={page === 1}>
            Prev Page
          </button>
          <span
            style={{
              display: 'flex',
              marginLeft: '1rem',
              width: '2rem',
              justifyContent: 'center',
              marginRight: '1rem',
            }}>
            {page}
          </span>
          <button
            style={{
              display: 'flex',
            }}
            onClick={increasePage}
            disabled={isLastPage}>
            Next Page
          </button>
          <div
            style={{
              display: 'flex',
              marginLeft: '1rem',
            }}>
            <label htmlFor="page-size" style={{ marginRight: '1rem' }}>
              Page Size
            </label>
            <input
              onChange={handlePageSizeChange}
              id="page-size"
              type="number"
              defaultValue={pageSize}
              min="10"
              max="100"
              step="10"
            />
          </div>
        </div>
      </header>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && cards.length === 0 && <p>No cards found</p>}
      {!loading && cards.length !== 0 && (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>{card.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
