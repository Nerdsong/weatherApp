import {searchContext} from '../../App.tsx';
import { useContext,useState } from 'react';
import Autocomplete from './Autocomplete.tsx';



function SearchBar() {

    const contextValue = useContext(searchContext);
    
        if (!contextValue) {
            throw new Error('context is undefined');
        }
    
        const {searchRef } = contextValue;
    //-------------------------------------------------------------
        
        const [searchValue, setSearchValue] = useState <string | null > (null);


  return (
    <div className='search-bar'>
         <input ref={searchRef} type="text" onChange = {() => searchRef.current && setSearchValue(searchRef.current.value)} placeholder='City Name'/>
         <Autocomplete searchValue={searchValue} setSearchValue={setSearchValue} searchRef={searchRef}/>
    </div>
  )
}

export default SearchBar