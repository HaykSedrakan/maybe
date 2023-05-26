import styles from './ProductsPage.module.scss'
import Header from '../Header/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

export default function ProductsPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchValue = searchParams.get('search')

  console.log(searchValue)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/products`)
        const filteredDatas =
          res.data &&
          res.data.filter((item) =>
            item?.label.toLowerCase().includes(searchValue.toLowerCase())
          )
        setProducts(filteredDatas)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  const handleNavigate = (id) => {
    navigate(`/product/details/${id}`)
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.filterSection}>
          {/* Верхняя часть для фильтрации */}
          {/* Здесь можно добавить компоненты для фильтрации продуктов */}
        </div>
        <div className={styles.productSection}>
          <section style={{ backgroundColor: ' #eee' }}>
            <div className="container py-5">
              <div className="row justify-content-center mb-3">
                <div className="col-md-12 col-xl-10">
                  <div className="card shadow-0 border rounded-3">
                    <div className="card-body">
                      <div className="row">
                        {products &&
                          products.map((item) => (
                            <div className="row justify-content-center mb-3">
                              <div className="col-md-12 col-xl-10">
                                <div className="card shadow-0 border rounded-3">
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                          <img
                                            src={item?.image}
                                            className="w-100"
                                          />
                                          <a href="#!">
                                            <div className="hover-overlay">
                                              <div
                                                className="mask"
                                                style={{
                                                  backgroundColor:
                                                    'rgba(253, 253, 253, 0.15)',
                                                }}></div>
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-lg-6 col-xl-6">
                                        <h5>{item?.label}</h5>
                                        <div className="d-flex flex-row">
                                          <span>{item?.location}</span>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                        <div className="d-flex flex-row align-items-center mb-1">
                                          <h4 className="mb-1 me-1">$14.99</h4>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.filterPanel}>
            <div className={styles.actions}>
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
                nostrum cum earum, dolor voluptatum eius ex suscipit laboriosam
                porro autem asperiores fugit. Est explicabo, minima fugiat
                commodi perferendis totam placeat.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.productsContainer}>
            <div className={styles.products}>
              <div className={styles.product}>
                <div class="sr-page__list__item">
                  <a
                    id="myButton"
                    href="javascript:void(0);"
                    class="item-fav j-i-fav"
                    data="{id:27752}"
                    data-placement="right"
                    data-toggle="services-tooltip"
                    title=""
                    data-original-title="Ավելացնել ընտրանում"></a>

                  <a
                    href="https://ivi.am/item/notbuq-hp-pavilion-2p1p2ea-27752.html"
                    style={{ textDecoration: 'none' }}>
                    <table>
                      <tbody>
                        <tr>
                          <td className="sr-page__list__item_img">
                            <span className="rel inlblk">
                              <a
                                className="thumb stack rel inlblk"
                                href="https://ivi.am/item/notbuq-hp-pavilion-2p1p2ea-27752.html"
                                title="Նոթբուք HP PAVILION-2P1P2EA">
                                <img
                                  id="lazy"
                                  className="rel br2 zi3 shadow img-zoomed"
                                  src="//ivi.am/files/images/items/27/27752mf40602aa.jpg"
                                  data-original="//ivi.am/files/images/items/27/27752mf40602aa.jpg"
                                  alt="Նոթբուք HP PAVILION-2P1P2EA"
                                  style={{ display: 'inline' }}
                                />

                                <span className="photo-count1">
                                  <i className="fa fa-camera white"></i> 5
                                </span>
                              </a>
                            </span>
                          </td>

                          <td className="sr-page__list__item_descr">
                            <div className="list_descr title flex">
                              <h3>
                                <a
                                  href="https://ivi.am/item/notbuq-hp-pavilion-2p1p2ea-27752.html"
                                  className="premium fontbold">
                                  Նոթբուք HP PAVILION-2P1P2EA
                                </a>
                              </h3>
                            </div>
                            <div className="price-plock">
                              <div className="prc">
                                <strong>1 798₾</strong>
                              </div>
                            </div>
                            <div className="loc-info">
                              <span className="location-block">
                                <i className="fa-solid fa-location-dot"></i>
                                &nbsp;Երևան, Մալաթիա Սեբաստիա
                              </span>
                              <span
                                className="delivery-icon-svg"
                                data-placement="top"
                                data-toggle="services-tooltip"
                                title=""
                                data-original-title="Գործում է նաև առաքում !"></span>
                            </div>

                            <div className="ct-block">
                              <a
                                className="cat-link"
                                href="//ivi.am/search/elektronika/kompyutery/noutbuki"
                                target="_blank"
                                rel="nofollow">
                                Համակարգիչներ և սարքավորումներ › Նոութբուքեր{' '}
                              </a>
                            </div>

                            <div className="date-block">
                              Թարմացված է Այսօր 14:41
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </a>
                </div>
                {products &&
                  products.map((item) => (
                    <div
                      onClick={() => handleNavigate(item?.id)}
                      className={styles.card}
                      key={item.id}>
                      <img src={item?.image} alt={item?.label} />
                      <div className={styles.cardContent}>
                        <p onClick={() => handleNavigate(item.id)}>
                          {item?.label}
                        </p>
                        <p className={styles.price}>
                          {item?.currency} {item?.price}
                        </p>
                        <p>{item?.description}</p>
                      </div>

                      <button>Details</button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}
