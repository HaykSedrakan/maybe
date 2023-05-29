import React, { useEffect, useState } from 'react'
import styles from './AddProductPage.module.scss'
import Header from '../Header/Header'
import { Radio, RadioGroup } from 'rsuite'
import { SelectPicker } from 'rsuite'
import './Rsuite.css'
import { Select, Space } from 'antd'
import NumericInput from './Numeric'
import { Input } from 'antd'
import storage from '../../firebase'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { toast } from 'react-toastify'
import imageCompression from 'browser-image-compression'
import { v4 as uuid } from 'uuid'
import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai'
import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'

const currencyData = {
  currency: ['$ (USD)', '֏ (AMD)', '₽ (RUB)'],
}

const data = [
  'Երևան',
  'Արմավիր',
  'Արարատ',
  'Կոտայք',
  'Շիրակ',
  'Լոռի',
  'Սյունիք',
  'Տավուշ',
  'Արագածոտն',
  'Վայոց Զոր',
].map((item) => ({ label: item, value: item }))

export default function AddProductPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [img, setImg] = useState([])
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [value, setValue] = useState('Վաճառք')
  const [place, setPlace] = useState(null)
  const [cities, setCities] = useState(currencyData.currency)
  const [currency, setCurrency] = useState(currencyData.currency[0])
  const [price, setPrice] = useState('')

  const handleCityChange = (value) => {
    setCurrency(value)
  }

  const onInputChange = (e) => {
    setImage(e.target.files)
  }

  const { TextArea } = Input

  useEffect(() => {
    const addInFirebase = async () => {
      let newFileNames = []
      let downloadURLs = []

      for (let i = 0; i < image?.length; i++) {
        const file = image[i]
        const newFileName = uuid() + '.' + file.name.split('.').pop()
        newFileNames.push(newFileName)

        const jpegImageRef = ref(
          storage,
          `images/testProducts/${newFileName}.jpeg`
        )
        const webpImageRef = ref(
          storage,
          `images/testProducts/${newFileName}.webp`
        )

        try {
          const compressedImage = await imageCompression(file, {
            maxSize: 500 * 1024,
            maxWidthOrHeight: 800,
          })

          const jpegCompressedImage = await imageCompression(compressedImage, {
            fileType: 'jpeg',
          })

          const webpCompressedImage = await imageCompression(compressedImage, {
            fileType: 'webp',
          })

          await uploadBytes(jpegImageRef, jpegCompressedImage)
          await uploadBytes(webpImageRef, webpCompressedImage).then(() => {
            toast.success('Image uploaded successfully!')
          })

          const jpegDownloadURL = await getDownloadURL(jpegImageRef)
          const webpDownloadURL = await getDownloadURL(webpImageRef)

          const imgObj = { jpeg: jpegDownloadURL, webp: webpDownloadURL }
          downloadURLs.push(imgObj)
        } catch (error) {
          toast.error(error.message)
        }
      }

      setImg((prev) => [...prev, ...downloadURLs])
    }

    addInFirebase()
  }, [image])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  console.log(img)

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.actions}>
            <div className={styles.typeContainer}>
              <div className={styles.typeContainer_title}>
                Հայտարարության տեսակը
              </div>
              <div className={styles.typeContainer_types}>
                <RadioGroup
                  inline
                  name="radio-name"
                  value={value}
                  onChange={setValue}>
                  <Radio value="Վաճառք">Վաճառք</Radio>
                  <Radio value="Փոխանակում">Փոխանակում</Radio>
                  <Radio value="Փնտրում">Փնտրում եմ</Radio>
                </RadioGroup>
              </div>
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.typeContainer_title}>Գտնվելու վայրը</div>
              <div className={styles.typeContainer_types}>
                <SelectPicker
                  value={place}
                  onChange={setPlace}
                  data={data}
                  style={{ width: 224 }}
                />
              </div>
            </div>
            <div className={styles.typeContainer}>
              <div className={styles.typeContainer_title}>Գին</div>
              <div className={styles.typeContainer_types}>
                <p className={styles.priceLabel}>Գին</p>
                <Space wrap>
                  <NumericInput
                    style={{
                      width: 120,
                    }}
                    value={price}
                    onChange={setPrice}
                  />
                  <Select
                    style={{
                      width: 120,
                    }}
                    value={currency}
                    onChange={handleCityChange}
                    options={cities?.map((city) => ({
                      label: city,
                      value: city,
                    }))}
                  />
                </Space>
              </div>
              <div className={styles.typeContainer}>
                <div className={styles.typeContainer_title}>
                  Մանրամասն տեղեկություն
                </div>
                <div className={styles.typeContainer_types}>
                  <p className={styles.priceLabel}>Անվանում</p>

                  <Input
                    placeholder="Ապռանքի Անունը"
                    onChange={handleChangeName}
                    value={name}
                  />
                </div>
              </div>
              <div className={`${styles.typeContainer}`}>
                <div
                  className={`${styles.typeContainer_types} ${styles.typeContainerStart}`}>
                  <p className={styles.priceLabel}>Նկարագիր</p>

                  <TextArea
                    rows={6}
                    showCount
                    style={{ resize: 'none' }}
                    placeholder="Մանրամասն նկարագրեք ձեր ապրանքատեսակը, նրա առավելությունները, թերությունները և ցանկացած այլ տեղեկատվություն, որը կօգնի գնորդին ճիշտ որոշում կայացնել:"
                    maxLength={6000}
                  />
                </div>
              </div>
              <div className={`${styles.typeContainer}`}>
                <input
                  multiple
                  type="file"
                  id="file"
                  accept="image/*"
                  hidden
                  onChange={onInputChange}
                />
                <div
                  className={`${styles.typeContainer_types} ${styles.typeContainerStart}`}>
                  <p className={styles.priceLabel}>Լուսանկարներ</p>
                  <button
                    className={styles.selectImage}
                    onClick={() => document.querySelector('#file').click()}>
                    Select Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
