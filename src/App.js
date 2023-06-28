import { useState } from 'react';
import logo from './assets/investment-calculator-logo.png';

function ResultsTable({ results }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (results.length === 0) {
    return (
      <div className="result">
        <p>No Results</p>
      </div>
    );
  }
  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map(
          ({
            year,
            totalSavings,
            yearlyInterest,
            totalInterest,
            totalInvestedCapital,
          }) => {
            return (
              <tr key={year}>
                <td>{year}</td>
                <td>{formatter.format(totalSavings)}</td>
                <td>{formatter.format(yearlyInterest)}</td>
                <td>{formatter.format(totalInterest)}</td>
                <td>{formatter.format(totalInvestedCapital)}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}

function App() {
  const [results, setResults] = useState([]);
  const initialInput = {
    'current-savings': '',
    'yearly-contribution': '',
    'expected-return': '',
    duration: '',
  };
  const [userInput, setUserInput] = useState(initialInput);

  const handleInputUpdate = (event) => {
    setUserInput({
      ...userInput,
      [event.target.id]: event.target.value,
    });
  };

  const calculateHandler = (event) => {
    event.preventDefault();
    const yearlyData = [];
    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];
    let totalInterest = 0;
    let totalInvestedCapital = 0;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const totalSavings = currentSavings + yearlyContribution * year;
      const yearlyInterest = totalSavings * expectedReturn;
      totalInterest += yearlyInterest;
      totalInvestedCapital += totalSavings;
      yearlyData.push({
        year,
        totalSavings,
        yearlyInterest,
        totalInterest,
        totalInvestedCapital,
      });
    }
    setResults(yearlyData);
  };

  function handleReset() {
    setResults([]);
    setUserInput(initialInput);
  }

  return (
    <div>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>

      <form className="form">
        <div className="input-group">
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input
              type="number"
              id="current-savings"
              defaultValue={+userInput['current-savings']}
              onChange={handleInputUpdate}
            />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input
              type="number"
              defaultValue={+userInput['yearly-contribution']}
              id="yearly-contribution"
              onChange={handleInputUpdate}
            />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input
              type="number"
              defaultValue={+userInput['expected-return']}
              id="expected-return"
              onChange={handleInputUpdate}
            />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input
              type="number"
              defaultValue={+userInput['duration']}
              id="duration"
              onChange={handleInputUpdate}
            />
          </p>
        </div>
        <p className="actions">
          <button type="reset" className="buttonAlt" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" onClick={calculateHandler} className="button">
            Calculate
          </button>
        </p>
      </form>
      <ResultsTable results={results} />
    </div>
  );
}

export default App;
