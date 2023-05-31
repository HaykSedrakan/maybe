import styles from './AdminBanners.module.scss'
import {
  AiFillPlusCircle,
  AiOutlineCloudUpload,
  AiOutlineClose,
} from 'react-icons/ai'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { toast, ToastContainer } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import imageCompression from 'browser-image-compression'
import AddBannerModal from './AddBannerModal'
import storage from '../../../firebase'

export default function AdminBanners() {
  const [baners, setBaners] = useState([])
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [image, setImage] = useState(null)
  const [loadingSend, setLoadingSend] = useState(false)
  const [img, setImg] = useState(null)
  const [webpSupported, setWebpSupported] = useState(false)

  const onInputChange = (e) => {
    setImage(e.target.files[0])
  }

  async function onSubmit(e) {
    e.preventDefault()

    if (image === null) return
    const newName = image.name + uuid()

    try {
      const compressedImage = await imageCompression(image, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
      })

      const jpegImageRef = ref(storage, `images/baners/${newName}.jpeg`)
      await uploadBytes(jpegImageRef, compressedImage).then(() =>
        console.log('Success !')
      )

      const webpImage = await createImageBitmap(image)
      const webpCanvas = document.createElement('canvas')
      webpCanvas.width = webpImage.width
      webpCanvas.height = webpImage.height
      const webpCanvasContext = webpCanvas.getContext('2d')
      webpCanvasContext.drawImage(webpImage, 0, 0)

      const webpBlob = await new Promise((resolve) => {
        webpCanvas.toBlob((blob) => resolve(blob), 'image/webp', 0.9)
      })

      if (webpBlob) {
        const webpImageRef = ref(storage, `images/baners/${newName}.webp`)
        await uploadBytes(webpImageRef, webpBlob).then(() =>
          toast.success('Image uploaded success !')
        )

        const jpegDownloadURL = await getDownloadURL(jpegImageRef)
        const webpDownloadURL = await getDownloadURL(webpImageRef)
        const imgObj = { jpeg: jpegDownloadURL, webp: webpDownloadURL }

        setImg(imgObj)
        try {
          setLoadingSend(true)
          await axios
            .post(`${process.env.REACT_APP_API}/addbaner`, {
              img: JSON.stringify(imgObj),
            })
            .then(() => {
              setShowModalAdd(false)
            })
            .then(() => {
              setLoadingSend(false)
              window.location.reload()
            })
        } catch (error) {
          toast.error(error.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleShowModalAdd = () => {
    setShowModalAdd(true)
  }

  const handleCloseModal = () => {
    setShowModalAdd(false)
  }

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/baners`, {
          withCredentials: true,
          sameSite: 'none',
        })
        const datasParser =
          res.data &&
          res.data.map((item) => {
            return {
              id: item.id,
              img: JSON.parse(item.img),
            }
          })

        setBaners(datasParser)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchBanners()
  }, [])

  useEffect(() => {
    console.log(baners)
  }, [baners])

  async function handleDeleteBaner(id) {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/deletebaner/${id}`).then(window.location.reload)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const canvas = document.createElement('canvas')
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      setWebpSupported(true)
    } else {
      setWebpSupported(false)
    }
  }, [])

  return (
    <>
      <div>
        <main>
          <div className={styles.mainContainer}>
            <div className={styles.box}>
              <div className={styles.mainTitle}>
                <div className={styles.mainGreeting}>
                  <h1>Main Banner</h1>
                </div>
              </div>
              <div className={styles.mainAdd}>
                <div className={styles.mainAddbox}>
                  <Stack spacing={2} direction="row">
                    <Button onClick={handleShowModalAdd} variant="outlined">
                      Create Banner
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
            <div
              className={`${styles.charts} ${!baners.length && styles.empty}`}>
              {baners.length ? (
                baners?.map((baner, idx) => (
                  <div className={styles.chartsLeft} key={uuidv4()}>
                    <div className={styles.chartsLeftTitle}>
                      <img
                        src={
                          webpSupported ? baner?.img?.webp : baner?.img?.jpeg
                        }
                        alt="BANER"
                        className={styles.img}
                      />
                    </div>
                    <div className={styles.btnContainer}>
                      <div className={styles.btns}>
                        <button
                          onClick={() => handleDeleteBaner(baner.id)}
                          className={styles.delete}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <div id="apex1"></div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyBanersContainer}>
                  You don't have banners
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <div>
        <AddBannerModal
          show={showModalAdd}
          type="add"
          handleClose={handleCloseModal}>
          <div className={styles.container}>
            <input
              type="file"
              id="file"
              accept="image/*"
              hidden
              onChange={onInputChange}
            />
            <div
              className={`${styles.imgArea} ${
                selectedImage ? styles.active : ''
              }`}
              data-img="">
              {selectedImage ? (
                <div>
                  <img
                    src={webpSupported ? img?.webp : img?.jpeg}
                    alt="Selected"
                  />
                  <AiOutlineClose className={styles.deleteImg} />
                </div>
              ) : (
                <>
                  <AiOutlineCloudUpload />
                  <h3>Upload Image</h3>
                  <p>
                    Image size must be less than <span>2MB</span>
                  </p>
                </>
              )}
            </div>
            <button
              className={styles.selectImage}
              onClick={() => document.querySelector('#file').click()}>
              Select Image
            </button>
            <div className={styles.btnContainer}>
              <Stack direction="row" spacing={2}>
                <Button onClick={handleCloseModal} variant="outlixaned">
                  Cancel
                </Button>
                <LoadingButton
                  endIcon={<SendIcon />}
                  onClick={onSubmit}
                  loading={loadingSend}
                  variant="contained">
                  <span>Send</span>
                </LoadingButton>
              </Stack>
            </div>
          </div>
        </AddBannerModal>
        <ToastContainer />
      </div>
    </>
  )
}
