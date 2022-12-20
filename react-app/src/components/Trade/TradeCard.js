import React from 'react';
import { useHistory } from 'react-router-dom';
import BuySellModal from '../BuySell';
import './tradeall.css'
import coinImgs from '../BuySell/cryptoImgData';
import { symbols } from '../BuySell/cryptoImgData';
import { capitalizeFirstLetter } from '../utils/utilityFunctions';
import star from '../../aIMGS/star.svg';
import { addWatchlist, deleteWatchlist, loadWatchlist, } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';


const TradeCard = ({ name, allAssets }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const watchlistState = useSelector(state => state.session.watchlist);
    const watchCheck = Object.keys(watchlistState);

    const redirectHandler = (value) => {
        console.log('hello from the other side', value)
        history.push(`/trade/${value}`)
    }

    const updateWatchlist = async (asset) => {

        if (watchCheck.includes(asset)) {
            await dispatch(deleteWatchlist(asset))
            await dispatch(loadWatchlist())
            return
        } else {

            const watchlist = {
                asset: `${asset}`,
                user_id: currentUser.id
            }

            await dispatch(addWatchlist(watchlist));
            await dispatch(loadWatchlist());
            return
        }

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
                    <div id='buy-sell-button'>
                        <BuySellModal name={name} />
                    </div>
                </td>
                <td>
                    <div className='watch-td' >
                        <img src={star} alt='star' className={watchCheck.includes(name) ? 'watchlist-star-clicked' : 'watchlist-star'}
                            onClick={() => updateWatchlist(name)}
                        />
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default TradeCard;