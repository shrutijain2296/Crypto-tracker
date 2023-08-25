import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import Search from '../components/Dashboard/Search';
import { Margin } from '@mui/icons-material';
import PaginationControlled from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  };

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const myCoins = await get100Coins();
    if(myCoins){
      setCoins(myCoins);
      setPaginatedCoins(myCoins.slice(0, 10));
      setIsLoading(false);
    }
   
  };

  return (
   <div>
    <Header />
    {isLoading ? (<Loader />) : ( <div>
      
      <Search search={search} onSearchChange={onSearchChange} />
      {filteredCoins.length === 0 ? (
        <p style={{ textAlign: "center", margin: "0rem 10rem" }}>No Cryptocurrencies Found.</p>
      ) : (
        <TabsComponent coins={search ? filteredCoins : paginatedCoins} setSearch={setSearch} />
      )}
      {!search && (
        <PaginationControlled page={page} handlePageChange={handlePageChange} />
      )}
    </div>)}
    <BackToTop />
   </div>
  );
}

export default DashboardPage;
