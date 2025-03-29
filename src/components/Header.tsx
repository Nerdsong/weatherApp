import SearchBar from "./ui/SearchBar";
import Button from "./ui/Button";
import "./Header.css";
import { useContext } from "react";
import { searchContext } from "../App";



function Header() {

  const context = useContext(searchContext)
  const shouldSearch = context?.setShouldSearch
  return (
    <nav className='header'>
        <SearchBar/>
        <Button onClickFunction={() => shouldSearch?.((prev) => !prev)} />
    </nav>
  )
}

export default Header