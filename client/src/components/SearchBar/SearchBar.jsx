import React, { useState } from 'react'
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function SearchBar() {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3020/products')
        res.data && setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  const handleFilter = (event) => {
    const searchWord = event.target.value
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

  return (
    <div className="searchBar-div">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search..."
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
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
