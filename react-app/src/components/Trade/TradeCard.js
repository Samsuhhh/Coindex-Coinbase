import React, { useEffect, useState } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import BuySellModal from '../BuySell';
import './tradeall.css'
import coinImgs from '../BuySell/cryptoImgData';
import { symbols } from '../BuySell/cryptoImgData';
import { capitalizeFirstLetter } from '../utils/utilityFunctions';


const TradeCard = ({name, allAssets}) => {
    const history = useHistory();
    const redirectHandler = (value) => {
        console.log('hello from the other side', value)
        history.push(`/trade/${value}`)

    }


    return (
        <tbody>
            <tr className='row-styling' key={name} onDoubleClick={(e) => redirectHandler(name)} >

                <td className='crypto-name-td'>
                    <div className='img-name-div-flex'>
                        <div className='logo-div'>
                            <img src={coinImgs[name]} alt='yfii-finance-logo' className='logo-img' />
                        </div>
                        <div>
                            <div className='crypto-bold'>{capitalizeFirstLetter(name)}</div>
                            <div className='symbol-light'>{symbols[name]}</div>
                        </div>
                    </div>
                </td>
                <td>${allAssets[name]['usd']}</td>
                <td className={allAssets[name]['usd_24h_change']?.toFixed(2).slice(0, 1) === '-' ? 'negative' : 'positive'}>
                    {allAssets[name]['usd_24h_change']?.toFixed(2).slice(0, 1) === '-' ?
                        allAssets[name]['usd_24h_change']?.toFixed(2) :
                        `+${allAssets[name]['usd_24h_change']?.toFixed(2)}`}%
                </td>
                <td>${allAssets[name]['usd_market_cap']?.toFixed(0).length < 8 ?
                    `${allAssets[name]['usd_market_cap']?.toFixed(2).slice(0, 3)}M` :
                    `${allAssets[name]['usd_market_cap']?.toFixed(2).slice(0, 3)}B`}
                </td>
                <td>
                    <div>
                        <BuySellModal name={name}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default TradeCard;