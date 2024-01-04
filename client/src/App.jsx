import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [stocks, setStocks] = useState([]);
  const [inputString, setInputString] = useState('');

  const fetchStocks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/stocks/${inputString}`);
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  useEffect(() => {
    fetchStocks(); // Fetch stocks on initial render
    const interval = setInterval(fetchStocks, 15000); // Polling every second
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [inputString]);

  const handleInputChange = (event) => {
    setInputString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStocks(); // Fetch stocks when the form is submitted
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Stock Prices</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            value={inputString}
            onChange={handleInputChange}
            placeholder="Enter number of stocks"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">Fetch Stocks</button>
        </div>
      </form>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {stocks.map((stock, index) => (
          <div key={index} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title font-weight-bold">Name: {stock.name}</h5>
                <p className="card-text">Symbol: {stock.symbol}</p>
                <p className="card-text">Open Price: {stock.openPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
