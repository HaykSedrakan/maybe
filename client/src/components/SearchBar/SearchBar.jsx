import React, { useState } from 'react'
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SearchBar() {
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')
  const [products, setProducts] = useState([])
  const [inpVal, setInpVal] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/products`)
        res.data && setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setInpVal(searchWord)
    setWordEntered(searchWord)
    const newFilter =
      products &&
      products.filter((value) => {
        return value.label.toLowerCase().includes(searchWord.toLowerCase())
      })

    if (searchWord === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  const clearInput = () => {
    setFilteredData([])
    setWordEntered('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/product/search?search=${inpVal}`)
      window.location.reload()
    }
  }

  return (
    <div className="searchBar-div">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search..."
          value={wordEntered}
          onChange={handleFilter}
          onKeyDown={handleKeyDown}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon  className='search-icon'/>
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link className="dataItem" to={`/product/details/${value.id}`}>
                <p>{value.label}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
