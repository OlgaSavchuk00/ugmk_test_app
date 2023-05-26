import { useState, useEffect, memo } from 'react';

import { useParams } from 'react-router-dom';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Typography } from '@mui/material';

import { getProductByFactoryId } from '../../api';
import CircleDiagram from '../../Components/CircleDiagram/CircleDiagram';
import monthsNames from '../../constants/constants';

import './statisticPage.css';

Chart.register(ArcElement, Tooltip, Legend);

function StatisticPage() {
  const { factory_id, month } = useParams();
  const [product, setProduct] = useState(null);

  const factoryName = factory_id === '1' ? 'А' : 'Б';
  const products = ['Продукт 1', 'Продукт 2'];
  const nameOfMonth = monthsNames[month - 1]

  const getProductData = (factory) => {
    const oneProduct = products.map((_, index) => {
      return Number(factory.reduce((acc, factory) => {
        if (index === 0) return acc + factory.product1;
        else return acc + factory.product2;
      }, 0) / 1000).toFixed(3);
    });
    return oneProduct;
  }

  useEffect(() => {
    getProductByFactoryId(factory_id).then(({ data: product }) => {
      const monthData = product.filter(item => item.date?.split('/')[1] === month);
      setProduct(getProductData(monthData));
    })
  }, [factory_id, month])


  return (
    <div className="statistic-page">
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 10 }}>
        Статистика по продукции фабрики {factoryName} за {nameOfMonth}
      </Typography>
      <div className="circle-diagram">
        <CircleDiagram product={product} />
      </div>
    </div>
  )
}

export default memo(StatisticPage);
