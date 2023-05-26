import { useEffect, useState, useCallback, memo } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { getElementAtEvent } from 'react-chartjs-2';

import Diagram from '../../Components/Diagram/Diagram';
import { getProducts } from '../../api'
import monthsNames from '../../constants/constants';

import './startPage.css';

function StartPage() {
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [productsFactoryA, setProductsFactoryA] = useState(null);
  const [productsFactoryB, setProductsFactoryB] = useState(null);
  const [firstProductData, setFirstProductData] = useState(null);
  const [secondProductData, setSecondProductData] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) =>
    setSelectedProduct(event.target.value);

  const monthsProductData = (factoryData) => monthsNames.map((_, i) => {
    const selectedMonth = factoryData.filter(item => item.date?.split('/')[1] === String(i + 1));
    let sum = 0;
    selectedMonth.forEach(element => {
      if (selectedProduct === 'first') {
        sum += element.product1;
      } else if (selectedProduct === 'second') {
        sum += element.product2;
      } else {
        sum += element.product1 + element.product2 + element.product3;
      }
    });
    return Number(sum / 1000).toFixed(3);
  });

  const putFactorysData = (factoryAProducts, factoryBProducts) => {
    setFirstProductData(monthsProductData(factoryAProducts));
    setSecondProductData(monthsProductData(factoryBProducts));
  }

  useEffect(() => {
    getProducts().then(({ data: products }) => {
      const productsFactoryA = [];
      const productsFactoryB = [];

      products.forEach((product) => {
        switch (product.factory_id) {
          case 1:
            productsFactoryA.push(product);
            break;
          case 2:
            productsFactoryB.push(product);
            break;
          default:
            break;
        }
      })

      setProductsFactoryA(productsFactoryA);
      setProductsFactoryB(productsFactoryB);
      putFactorysData(productsFactoryA, productsFactoryB);
    })
  }, []);

  useEffect(() => {
    if (productsFactoryA && productsFactoryB)
      putFactorysData(productsFactoryA, productsFactoryB);
  }, [selectedProduct, productsFactoryA, productsFactoryB]);

  const handleClickNavigate = useCallback((event, ref) => {
    const clickfactory = getElementAtEvent(ref.current, event)?.[0];
    const factory_id = clickfactory.datasetIndex + 1;
    const month = clickfactory.index + 1;
    navigate(`/details/${factory_id}/${month}`);
  }, []);

  return (
    <div className="start-page">
      <div className="select-block">
        <Typography variant="h5">
          Фильтр по типу продукции
        </Typography>
        <Box sx={{ minWidth: 120, padding: '14px', borderRadius: '6px' }}>
          <FormControl size="small">
            <Select
              value={selectedProduct}
              onChange={handleChange}
              sx={{ fontSize: '18px', pr: '30px' }}
            >
              <MenuItem value={'all'}>Все продукты</MenuItem>
              <MenuItem value={'first'}>Продукт 1</MenuItem>
              <MenuItem value={'second'}>Продукт 2</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="graf-block">
        {(firstProductData && secondProductData) && (
          <Diagram
            firstProductData={firstProductData}
            secondProductData={secondProductData}
            monthsNames={monthsNames}
            handleClickNavigate={handleClickNavigate}
          />
        )}
      </div>
    </div>
  );
}

export default memo(StartPage);
