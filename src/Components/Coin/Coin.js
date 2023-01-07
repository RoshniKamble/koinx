import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import "./Coin.css";

const columns = [
  {
    name: '',
    selector: row => <i class="far fa-star"></i>,
    width: '60px'
  },
  {
    name: '#',
    selector: row => row.market_cap_rank,
    width: '100px'
  },
  {
    name: '',
    cell: row => <img src={row.image} width={20} alt={row.name}></img>,
    selector: row => row.coverimage,
    width: '30px'
  },
  {
    name: 'NAME',
    selector: row => row.name,
    width: '130px'
  },

  {
    name: 'PRICE',
    selector: row => row.current_price,
    width: '100px'
  },
  {
    name: '24H',
    selector: row => row.price_change_percentage_24h,
    width: '100px'
  },
  {
    name: '7D',
    selector: row => row.ath_change_percentage,
    width: '100px'
  },
  {
    name: 'MARKET CAP',
    selector: row => row.market_cap,
    width: '150px'
  },
  {
    name: 'VOLUME(24H)',
    selector: row => row.total_volume,
    width: '130px'
  },
  {
    name: 'CIRCUTATING SUPPLY',
    selector: row => row.circulating_supply,
    width: '160px'
  },
  {
    name: '',
    selector: row => <i class="fa fa-ellipsis-v"></i>,
    width: '40px'
  },
];


function Coin() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData(1, perPage);
  }, [perPage])

  const fetchData = async (page, per_page) => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d?page=${page}&per_page=${per_page}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setIsLoaded(true);
          setItems(result);
          setTotalRows(result.size());
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const handlePageChange = page => {
    fetchData(page, perPage);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container App">
        <h2>Top 100 Cryptocurrencies by Market Cap</h2>
        <div className='fav d-flex'>
          <p className='para1'><i class="far fa-star"></i> Favourites</p>
          <p className='para2'>Cryptocurrencies</p>
          <p className='para3'>DeFi</p>
          <p className='para4'>NFTs & Collectibles</p>
        </div>
        <DataTable
          columns={columns}
          data={items}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </div>
    );
  }
}

export default Coin;