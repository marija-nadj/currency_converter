import React from 'react'

export default function CurrencyConvert(props) {
    const {
        currencyChoice,
        selectCurrency,
        onChangeCurrency,
        onChangeNumber,
        number
    } = props
    return (
      <div>
        <input type="number" className="input" value={number} onChange= {onChangeNumber}/>
        <select value={selectCurrency} onChange={onChangeCurrency}>
          {currencyChoice.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
}
