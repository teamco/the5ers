# FMP Client Service Documentation

## Overview
The `FmpClient` service provides an interface to interact with the Financial Modeling Prep (FMP) API. It allows fetching stock quotes and a list of stocks with related information.

### Import
To use the `FmpClient` in your application, import it as follows:

```typescript
import { FmpClient } from '@interview-starter-kit/services';
```

---

## API Key and Base URL
The service utilizes the following constants to connect to the FMP API:
- **API Key**: `AMwWW9RMCg9kJykTCBjzyB0AfYmrGUzx`
- **Base URL**: `https://financialmodelingprep.com/api/v3`

These are hardcoded in the service but can be updated as required.

---

## Methods

### 1. `getQuote`
Fetches the quote details for a specific stock symbol.

#### Method Signature
```typescript
public async getQuote(quote: string): Promise<GetQuoteResponse>
```

#### Parameters
- `quote` (string): The stock symbol for which the quote is to be fetched.

#### Returns
- A `Promise` resolving to a `GetQuoteResponse` object.

#### Example Usage
```typescript
const client = new FmpClient();
const quote = await client.getQuote('AAPL');
console.log(quote);
```

#### Response Format (`GetQuoteResponse`)
An array of objects with the following structure:

```typescript
{
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: number;
  timestamp: number;
}
```

---

### 2. `getStockList`
Fetches a list of all available stocks.

#### Method Signature
```typescript
public async getStockList(): Promise<StockListItem[]>
```

#### Parameters
- None

#### Returns
- A `Promise` resolving to an array of `StockListItem` objects.

#### Example Usage
```typescript
const client = new FmpClient();
const stockList = await client.getStockList();
console.log(stockList);
```

#### Response Format (`StockListItem`)
An array of objects with the following structure:

```typescript
{
  symbol: string;
  name: string;
  price: number;
  exchange: string;
  exchangeShortName: string;
  type: string;
}
```

## Notes
- Handle errors from the Axios client appropriately to ensure robust application behavior.

