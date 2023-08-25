import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./styles.css";

export default function PaginationControlled({page, handlePageChange}) {


  return (
    <div className='pagination-component'>
      <Pagination count={10} page={page} onChange={(event, value) => handlePageChange(event, value)} 
      sx = {{
        color: "var(--white)","& .Mui-selected ": {
            backgroundColor:"var(--blue) !important",
            color: "#fff !important",
            borderColor: "var(--blue) !important"
        },
        "& .MuiPaginationItem-ellipsis": {
            border: "0px solid var(--grey) !important",
        },
        "& .MuiPaginationItem-text": {
            color: "var(--white)",
            border: "1px solid var(--grey)",
        },
      }}/>
    </div>
  );
}

// [0, 99]
// Page 1 -> [0, 10)
// Page 2 -> [10, 20)
// Page 3 -> [20, 30)
// .....
// Page 10 -> [90, 100)

// Page 1 -> coins.slice(0, 10)
// var page = 1
// var initialIndex = page-1*10
// coins.slice(initialIndex, initialIndex+10)