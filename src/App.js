import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Chart } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

ChartJS.register(CategoryScale, LinearScale, TimeScale, CandlestickController, CandlestickElement);

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';
const SYMBOLS = {
  'ETH/USDT': 'ethusdt',
  'BNB/USDT': 'bnbusdt',
  'DOT/USDT': 'dotusdt',
};

const INTERVALS = {
  '1m': '1 minute',
  '3m': '3 minutes',
  '5m': '5 minutes',
};

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState('ETH/USDT');
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [chartData, setChartData] = useState({});
  const chartRef = useRef(null);
  const ws = useRef(null);

  const destroyPreviousChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
  };

  const initializeWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }

    const symbol = SYMBOLS[selectedSymbol];
    const streamUrl = `${BINANCE_WS_URL}/${symbol}@kline_${selectedInterval}`;
    ws.current = new WebSocket(streamUrl);

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const candle = message.k;

      setChartData((prevData) => {
        const data = { ...prevData };

        if (!data[selectedSymbol]) {
          data[selectedSymbol] = {};
        }

        if (!data[selectedSymbol][selectedInterval]) {
          data[selectedSymbol][selectedInterval] = [];
        }

        data[selectedSymbol][selectedInterval].push({
          time: candle.t,
          open: candle.o,
          high: candle.h,
          low: candle.l,
          close: candle.c,
        });

        localStorage.setItem('chartData', JSON.stringify(data));
        return data;
      });
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }, [selectedSymbol, selectedInterval]);

  useEffect(() => {
    const storedData = localStorage.getItem('chartData');
    if (storedData) {
      setChartData(JSON.parse(storedData));
    }
    initializeWebSocket();

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [selectedSymbol, selectedInterval, initializeWebSocket]);

  const renderChartData = (symbol, interval) => {
    if (!chartData[symbol] || !chartData[symbol][interval]) {
      return [];
    }
    return chartData[symbol][interval].map((item) => ({
      x: item.time,
      o: item.open,
      h: item.high,
      l: item.low,
      c: item.close,
    }));
  };

  useEffect(() => {
    if (chartRef.current) {
      destroyPreviousChart();
    }

    const data = renderChartData(selectedSymbol, selectedInterval);
    if (data.length > 0) {
      chartRef.current = new Chart(document.getElementById('myChart'), {
        type: 'candlestick',
        data: {
          datasets: [
            {
              label: `${selectedSymbol} - ${selectedInterval}`,
              data: data,
              borderColor: '#42A5F5',
              borderWidth: 1,
              backgroundColor: 'rgba(66, 165, 245, 0.5)',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute',
              },
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Price',
              },
            },
          },
        },
      });
    }
  }, [selectedSymbol, selectedInterval, chartData]);

  return (
    <div className="App container my-4">
      <h1 className="text-center">Binance Market Data</h1>

      <div className="row justify-content-center my-4">
        <div className="col-md-4">
          <label htmlFor="symbol" className="form-label">Select Cryptocurrency:</label>
          <select
            id="symbol"
            className="form-select"
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
          >
            {Object.keys(SYMBOLS).map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="interval" className="form-label">Select Interval:</label>
          <select
            id="interval"
            className="form-select"
            value={selectedInterval}
            onChange={(e) => setSelectedInterval(e.target.value)}
          >
            {Object.keys(INTERVALS).map((interval) => (
              <option key={interval} value={interval}>
                {INTERVALS[interval]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <canvas id="myChart" />
        </div>
      </div>
    </div>
  );
}

export default App;
