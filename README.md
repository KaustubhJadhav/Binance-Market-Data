# Binance Market Data Dashboard

This is a React-based web application that displays live candlestick charts for cryptocurrency pairs from Binance. The data is fetched using Binance's WebSocket API, and Chart.js is used to visualize the candlestick data.

## Working Link: https://binance-market-data.onrender.com

## Features

- **Real-time WebSocket Integration:** Fetches live market data from Binance using WebSocket for various cryptocurrency pairs like ETH/USDT, BNB/USDT, and DOT/USDT.
- **Candlestick Chart Visualization:** Displays live candlestick charts for the selected cryptocurrency pair with dynamic updates.
- **Cryptocurrency Toggle:** Users can switch between ETH/USDT, BNB/USDT, and DOT/USDT, and the chart will update accordingly.
- **Interval Selection:** Users can toggle between 1-minute, 3-minute, and 5-minute intervals for viewing candlestick charts.
- **Data Persistence:** The app uses local storage to store chart data for each cryptocurrency and time interval, allowing smooth toggling without losing data.

## Screenshots

### 1. Main Dashboard with Chart for ETH/USDT

![{8EFDA909-AB91-4726-9E79-39A26C798F24}](https://github.com/user-attachments/assets/6d2ff4bf-8257-4527-92e3-0c25d8db5886)


The main interface shows a real-time candlestick chart for the selected cryptocurrency pair.

### 2. Dropdown to Select Cryptocurrency Pair

![{80BA317B-3902-4A3F-B64D-76E93EE24A8C}](https://github.com/user-attachments/assets/7db3d241-5cb6-4bf2-a4af-48612939dbdc)


Users can toggle between different pairs (ETH/USDT, BNB/USDT, DOT/USDT) using the dropdown.

### 3. Interval Selector for Candlestick Chart

![{6A3D6E3B-D62A-49E7-BB78-6F205025849C}](https://github.com/user-attachments/assets/325fe528-c1a6-4f24-a76f-7c322053b694)


Users can change the time interval (1m, 3m, 5m) for the candlestick chart, which updates dynamically with Binance's market data.


The user interface is clean and responsive, providing an optimal experience across devices.

## Technology Stack

- **Frontend:**
  - React.js
  - Bootstrap for styling
  - Chart.js (with chartjs-chart-financial) for candlestick chart rendering

- **Backend (Data Source):**
  - Binance WebSocket API for real-time data

