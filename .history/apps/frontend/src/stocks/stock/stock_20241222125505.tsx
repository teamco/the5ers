import { Button, Card, Spin } from "antd";
import { IStock } from "../stock.interface";
import { useEffect, useState } from "react";
import { request } from "../../utils/request";
import { useNavigate, useParams } from "react-router-dom";

export const Stock = () => {

  const {id} = useParams();
  const history = useNavigate();

  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<IStock>();

  useEffect(() => {
    setLoading(true);
    request(`http://localhost:3000/api/${id}`).then(res => {
      setStock(res.existingStock);
      setLoading(false);
    })
  }, [id])

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    history('/stocks');
  }

  return (
    <Spin tip="Loading" spinning={loading}>
      <Button type="primary" onClick={handleBack}>Back to Stocks</Button>
      <Card title={stock?.name}>
        <Card.Meta title={stock?.symbol} description={stock?.price} />
      </Card>
    </Spin>
  )
};