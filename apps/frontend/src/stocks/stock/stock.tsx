import { Button, Card, Spin } from "antd";
import { IStock } from "../stock.interface";
import { useEffect, useState } from "react";
import { request } from "../../utils/request";
import { useNavigate, useParams } from "react-router-dom";
import { FmpClient } from "@interview-starter-kit/services";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

/**
 * A React component that displays the details of a single stock.
 * 
 * - Fetches the stock data from the server using the stock ID from the URL parameters.
 * - Displays a loading spinner while the data is being fetched.
 * - Shows a card with stock name, symbol, and price once the data is loaded.
 * - Provides a button to navigate back to the stocks list page.
 * 
 * @returns {JSX.Element} The JSX element of the component.
 */
export const Stock: React.FC = (): JSX.Element => {

  const { id } = useParams();
  const history = useNavigate();

  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<IStock>();

  useEffect(() => {
    setLoading(true);
    request(`http://localhost:3000/api/${id}`).then(res => {
      setLoading(false);

      const client = new FmpClient();
      client.getQuote(res.existingStock.symbol).then(q => {
        const stock = {
          ...res.existingStock,
          ...q[0]
        };

        setStock(stock);
      });
    })
  }, [id])

  /**
   * Navigates back to the stocks list page.
   *
   * @param e The click event object.
   */

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    history('/');
  }

  return (
    <Spin tip="Loading" spinning={loading}>
      <Button type="primary" onClick={handleBack} style={{ marginBottom: 16 }}>Back to Stocks</Button><br/>
      {stock ? (
        <Card title={stock?.name}>
          <div>
            <Card.Meta title={stock?.symbol} description={stock?.price} />
            <div>
              <p>{stock?.changesPercentage}%</p>
              <p><ArrowUpOutlined />{stock?.dayHigh}</p>
              <p><ArrowDownOutlined />{stock?.dayLow}</p>
            </div>
          </div>
        </Card>
      ) : `Unable to fetch Stock information`}
    </Spin>
  )
};