import React, {useState} from 'react';
import "./styles.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumber.js';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion";
import { IconButton } from '@mui/material';
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { addToWatchlist } from '../../../functions/addToWatchlist';
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { hasBeenAdded } from '../../../functions/hasBeenAdded';
import { removeFromWatchlist } from '../../../functions/removeFromWatchlist';

function List({ coin, delay, isWatchlistPage }) {
  const [added, setAdded] = useState(hasBeenAdded(coin.id));
  return (
    <Link to = {`/coin/${coin.id}`}>
        <motion.tr
            style={{ display: isWatchlistPage && !added && "none" }}
            className="list-row"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay }}
        >
            <Tooltip title="Logo"  placement="bottom-start">
                <td className='td-image'>
                    <img src = {coin?.image} className='coin-logo'/>
                </td>
            </Tooltip>
            <Tooltip title = "Symbol" placement="bottom-start">
                <td>
                    <div className='name-col'>
                        <p className='coin-symbol'>{coin?.symbol}</p>
                        <p className='coin-name'>{coin?.name}</p>
                    </div>
                </td>
            </Tooltip>
            <Tooltip title = "Price change in 24Hrs" placement="bottom-start">
                {coin?.price_change_percentage_24h > 0 ? (
                    <td className='chip-flex'>
                        <div className='price-chip'>{coin?.  price_change_percentage_24h.toFixed(2)
                        }%
                        </div>
                        <div className='icon-chip td-icon'>
                            <TrendingUpRoundedIcon />
                        </div>
                    </td>
                ) : (
                    <td className='chip-flex'>
                        <div className='price-chip chip-red'>{coin?.             price_change_percentage_24h.toFixed(2)
                            }%
                        </div>
                        <div className='icon-chip icon-red td-icon'>
                            <TrendingDownRoundedIcon />
                        </div>
                    </td>
                )}
            </Tooltip>
            <Tooltip title = "Current Price" placement="bottom-start">
                <td>
                    <h3 className='coin-price' style = {{color: coin?.price_change_percentage_24h < 0? "var(--red)" : "var(--green",}}>${coin?.current_price.toLocaleString()}</h3> 
                </td>
            </Tooltip>
            <Tooltip title = "Total Volume" placement="bottom-end">
                <td>
                    <p className='total_volume td-center-align td-total-volume'>
                        ${coin?.total_volume.toLocaleString()}
                    </p>  
                </td> 
            </Tooltip>
        
            <Tooltip title = "Market Cap" placement="bottom-end">
                <td className='desktop-td-mkt'>  
                    <p className='total_volume td-right-align'>
                        ${coin?.market_cap.toLocaleString()}
                    </p>  
                </td> 
            </Tooltip> 

            <Tooltip title = "Market Cap" placement="bottom-end">
                <td className='mobile-td-mkt'>  
                    <p className='total_volume td-right-align'>
                        ${convertNumber(coin?.market_cap)}
                    </p>  
                </td> 
            </Tooltip> 
            <td style={{ width: "fit-content" }}>
                <IconButton
                    onClick={(e) => {
                    e.preventDefault();
                    if (added) {
                        removeFromWatchlist(coin.id);
                        setAdded(false);
                    } else {
                        addToWatchlist(coin.id);
                        setAdded(true);
                    }
                    }}
                >
                    {added ? (
                    <StarRoundedIcon
                        className={`watchlist-icon ${
                        coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                        } `}
                    />
                    ) : (
                    <StarBorderRoundedIcon
                        className={`watchlist-icon ${
                        coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                        } `}
                    />
                    )}
                </IconButton>
            </td> 
            
        </motion.tr>
    </Link>
  )
}

export default List;