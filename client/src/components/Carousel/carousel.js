// import React from 'react'
// import Carousel from 'react-material-ui-carousel'
// import { Typography, Button, Card, CardContent } from '@mui/material'
// import styled from 'styled-components'

// const CarouselBanner = styled.div`
//   align-items: center;
//   justify-content: center;
//   margin-right: 80px;
//   img {
//     box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
//       rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
//   }
// `

// const CardContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   margin-left: 80px;
//   height: auto;
//   backgroud: #222629;
// `

// const CarouselComponent = () => {
//   var items = [
//     {
//       catagory: 'Cars For Sale',
//       image1: 'https://s.list.am/g/916/70123916.webp',
//       alt1: 'carousel-image-cars-1',
//       image2: 'https://s.list.am/g/690/69226690.webp',
//       alt2: 'carousel-image-cars-2',
//       image3: 'https://s.list.am/g/619/65369619.webp',
//       alt3: 'carousel-image-cars-3',
//       link: '/catagories/cars',
//     },
//     {
//       catagory: 'Electronics',
//       image1: 'https://s.list.am/g/096/63039096.webp',
//       alt1: 'carousel-image-elect-1',
//       image2: 'https://s.list.am/g/214/67631214.webp',
//       alt2: 'carousel-image-elect-2',
//       image3: 'https://s.list.am/g/225/63017225.webp',
//       alt3: 'carousel-image-elect-3',
//       link: '/catagories/electronics',
//     },
//     {
//       catagory: 'Real State',
//       image1: 'https://s.list.am/g/476/65967476.webp',
//       alt1: 'carousel-image-realstate-1',
//       image2: 'https://s.list.am/g/512/70212512.webp',
//       alt2: 'carousel-image-realstate-2',
//       image3: 'https://s.list.am/g/408/67357408.webp',
//       alt3: 'carousel-image-realstate-3',
//       link: '/catagories/realstate',
//     },
//     {
//       catagory: 'Home & Accessories',
//       image1: 'https://s.list.am/g/500/70038500.webp',
//       alt1: 'carousel-image-Home-1',
//       image2: 'https://s.list.am/g/477/58180477.webp',
//       alt2: 'carousel-image-Home-2',
//       image3: 'https://s.list.am/g/317/67218317.webp',
//       alt3: 'carousel-image-Home-3',
//       link: '/catagories/homeaccessories',
//     },
//   ]

//   return (
//     <CarouselBanner>
//       <div
//         style={{
//           marginTop: '50px',
//           marginBottom: '50px',
//           color: '#494949',
//         }}>
//         <br />
//         <Carousel>
//           {' '}
//           {items.map((item, i) => (
//             <Item key={i} item={item} />
//           ))}{' '}
//         </Carousel>{' '}
//       </div>{' '}
//     </CarouselBanner>
//   )
// }

// function Item(props) {
//   return (
//     <div
//       style={{
//         display: 'flex',
//       }}>
//       <CardContainer>
//         <Card
//           style={{
//             width: '100%',
//             height: '100%',
//             background: '#86C232',
//             borderRadius: 1,
//           }}>
//           <CardContent>
//             <Typography variant="h3" color="#222629">
//               {' '}
//               {props.item.catagory}{' '}
//             </Typography>{' '}
//             <br />
//             <Button
//               size="large"
//               sx={{
//                 color: '#222629',
//                 border: 'black',
//               }}>
//               Browse{' '}
//             </Button>{' '}
//           </CardContent>{' '}
//         </Card>{' '}
//       </CardContainer>{' '}
//       <img src={props.item.image1} alt={props.item.alt1} />{' '}
//       <img src={props.item.image2} alt={props.item.alt2} />{' '}
//       <img src={props.item.image3} alt={props.item.alt3} />{' '}
//     </div>
//   )
// }

// export default CarouselComponent
