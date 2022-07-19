import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react';
import { BusinessEntryApi } from '../../api/businessEntry/businessEntryApi';
import SearchIcon from '@mui/icons-material/Search';
import './home.scss';
import { BusinessEntry } from '../../models';
import { BusinessCard } from '../../components';
import { CircularProgress, debounce } from '@mui/material';

export const HomePage = () => {
  const [results, setResults] = useState<BusinessEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getEntities = () => {
    BusinessEntryApi.get().then((data) => {
      setResults(data);
      setLoading(false);
    });
  }
  const sendQuery = useCallback((q: string) => {
    setLoading(true);
    if (q) {
      BusinessEntryApi.search(q).then((data) => {
        setResults(data);
        setLoading(false);
      });
    } else {
      getEntities();
    }
  }, []);

  const search = useCallback(debounce(q => sendQuery(q), 500), []);

  useEffect(() => {
    getEntities();
  }, []);

  return <div className='root'>
    <TextField
      fullWidth
      label="Search"
      onChange={(e) => { search(e.target.value) }}
      placeholder="Search business entries"
      id="outlined-start-adornment"
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>,
      }}
    />
    {!loading && <div className='results-container'>
      {results.map((item: BusinessEntry) => {
        return <BusinessCard key={item.displayWhat} entity={item}></BusinessCard>
      })}
    </div>
    }
    {
      loading && <div className='loader'><CircularProgress /></div>
    }
  </div>
}