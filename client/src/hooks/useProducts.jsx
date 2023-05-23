import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const useProducts = (limit) => {
  const [products, setProducts] = useState([])
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      const fetchProducts = async () => {
        try {
          const res = await axios.get(
            'https://b18d-2a00-cc47-232c-1101-00-11aa.ngrok-free.app/products'
          )
          const limitedProducts = res.data.slice(0, limit)
          setProducts(limitedProducts)
        } catch (error) {
          console.log(error)
        }
      }
      fetchProducts()
    }
  }, [limit])

  return products
}

export default useProducts
