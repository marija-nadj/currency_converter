import React, { useEffect, useState } from 'react'
import './App.css';
import CurrencyConvert from './CurrencyConvert';

const RATES_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyChoice, setCurrencyChoice] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [number, setNumber] = useState(1)
  const [numberInFromCurrency, setNumberInFromCurrency] = useState(true)


  let toNumber, fromNumber
  if (numberInFromCurrency) {
    fromNumber = number
    toNumber = number * exchangeRate
  } else {
    toNumber = number
    fromNumber = number / exchangeRate
  }

  useEffect(() => {
    fetch(RATES_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyChoice([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${RATES_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromNumberChange(e) {
    setNumber(e.target.value)
    setNumberInFromCurrency(true)
  }
  function handleToNumberChange(e) {
    setNumber(e.target.value)
    setNumberInFromCurrency(false)
  }


  return (
    <>
      <h1>Free Online Currency Converter</h1>
      <CurrencyConvert
        currencyChoice={currencyChoice}
        selectCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeNumber={handleFromNumberChange}
        number={fromNumber}
      />
      <div className="equivalent">=</div>
      <CurrencyConvert
        currencyChoice={currencyChoice}
        selectCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeNumber={handleToNumberChange}
        number={toNumber}
      /> 
      </>
      )
}

export default App;
