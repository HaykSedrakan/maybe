import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Dropdown } from 'antd'
import { MdFormatListBulleted } from 'react-icons/md'
import { ImTable2 } from 'react-icons/im'
import { MdLocationPin } from 'react-icons/md'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './ProductsPage.scss'
import Header from '../Header/Header'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../redux/category/categoryActions'
import styles from './RowDirection.module.scss'

export default function ProductsPage() {
  const dispatch = useDispatch()
  const category = useSelector((state) => state.category.category)
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchValue = searchParams.get('search')
  const [currency, setCurrency] = useState('All')
  const [direction, setDirection] = useState('row')
  const [currencies, setCurrencies] = useState([
    {
      currency: 'All',
      label: (
        <a
          onClick={() => handleChangeCurrency('All')}
          className="dropDownItem"
          rel="noopener noreferrer">
          All
        </a>
      ),
    },
    {
      currency: '$ (USD)',
      label: (
        <a
          onClick={() => handleChangeCurrency('$ (USD)')}
          className="dropDownItem"
          rel="noopener noreferrer">
          $ (USD)
        </a>
      ),
    },
    {
      currency: '֏ (AMD)',
      label: (
        <a
          onClick={() => handleChangeCurrency('֏ (AMD)')}
          className="dropDownItem"
          rel="noopener noreferrer">
          ֏ (AMD)
        </a>
      ),
    },
    {
      currency: '₽ (RUB)',
      label: (
        <a
          onClick={(e) => handleChangeCurrency('₽ (RUB)')}
          className="dropDownItem"
          rel="noopener noreferrer">
          ₽ (RUB)
        </a>
      ),
    },
  ])
  const [categories, setCategories] = useState([
    {
      category: 'All',
      label: (
        <a
          onClick={(e) => handleChangeCategory('All')}
          value="All"
          className="dropDownItem"
          rel="noopener noreferrer">
          All
        </a>
      ),
    },
  ])

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/categories`)
        const filteredDatas =
          res.data &&
          res.data
            .filter((item) => !item.disabled)
            .map((item) => {
              return {
                label: (
                  <a
                    onClick={(e) => handleChangeCategory(item?.category)}
                    value={item?.category}
                    className="dropDownItem"
                    rel="noopener noreferrer">
                    {item.category}
                  </a>
                ),
                id: item.id,
                category: item?.category,
                disabled: item?.disabled,
              }
            })
        setCategories((prev) => [...prev, ...filteredDatas])
      } catch (error) {
        console.log(error)
      }
    }
    fetchDatas()
  }, [])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/productsNew`)
        const filteredData =
          res.data &&
          res.data
            .filter((item) => {
              if (searchValue) {
                return (
                  item.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) &&
                  ((currency === 'All' && category === 'All') ||
                    (currency === 'All' && item.category === category) ||
                    (item.currency.includes(currency) &&
                      (category === 'All' || item.category === category)))
                )
              } else {
                return (
                  (currency === 'All' && category === 'All') ||
                  (currency === 'All' && item.category === category) ||
                  (item.currency.includes(currency) &&
                    (category === 'All' || item.category === category))
                )
              }
            })
            .map((item) => {
              return {
                price: item.price,
                description: item.description,
                currency: item.currency,
                location: item.location,
                img: JSON.parse(item.img),
                userId: item.userId,
                id: item.id,
                title: item.title,
                type: item.type,
              }
            })
        setProducts(filteredData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [currency, category, searchValue])

  const handleChangeCategory = (value) => {
    dispatch(setCategory(value))
  }

  const handleChangeCurrency = (value) => {
    setCurrency(value)
  }

  const handleNavigate = (id) => {
    navigate(`/product/details/${id}`)
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="content">
          <div className="filters">
            <div className="show-type">
              <div className="show-type__icons">
                <div className="row-icon">
                  <MdFormatListBulleted onClick={() => setDirection('row')} />
                </div>
                <div className="cell-icon">
                  <ImTable2 onClick={() => setDirection('column')} />
                </div>
              </div>
            </div>
            <div className="sorts">
              <div className="currency">
                {currencies !== [] && (
                  <Dropdown
                    menu={{
                      items: currencies,
                    }}
                    placement="bottom"
                    arrow={{
                      pointAtCenter: true,
                    }}>
                    <div className="category">Currency</div>
                  </Dropdown>
                )}
              </div>
              <div className="catagory">
                {categories.length > 0 && (
                  <Dropdown
                    menu={{
                      items: categories,
                    }}
                    placement="bottom"
                    arrow={{
                      pointAtCenter: true,
                    }}>
                    <div className="category">Category</div>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
          <div className="adverts-div">
            <div className="adverts-title">Adverts</div>
            <div className="adverts">
              {products && direction === 'row' ? (
                products.map((item) => (
                  <div
                    className="advert"
                    onClick={() => handleNavigate(item?.id)}
                    key={item?.id}>
                    <div className="img-div">
                      <img
                        alt="img"
                        src={item?.img[0]?.jpeg}
                        className="advert-img"
                      />
                    </div>
                    <div className="info-div">
                      <div className="title-div">{item?.title}</div>
                      <div className="price-div">
                        {item?.currency === '$ (USD)' ? '$' : '֏'}
                        {item?.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                      </div>
                      <div className="location-div">
                        {<MdLocationPin className="location-icon" />}{' '}
                        <span className="location-title">{item?.location}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.productCardsContainer}>
                  {products.map((item) => (
                    <div
                      onClick={() => handleNavigate(item?.id)}
                      className={styles.card}
                      key={item.id}>
                      <img
                        className={styles.img}
                        src={item?.img[0]?.jpeg}
                        alt={item?.label}
                      />
                      <div className={styles.cardContent}>
                        <div className={styles.price}>
                          {' '}
                          {item?.currency === 'USD' ? '$' : '֏'}{' '}
                          {item?.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                        </div>
                        <div className={styles.title}>{item?.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
