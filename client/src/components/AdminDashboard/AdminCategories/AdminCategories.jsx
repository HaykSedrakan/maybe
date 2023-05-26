import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import styles from './AdminCategories.module.scss'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios'
import Switch from '@mui/material/Switch'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/system'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: -10,
  p: 4,
}
export default function AdminCategories() {
  const [sendCategoryLoading, setSendCategoryLoading] = useState(false)
  const [itemId, setItemId] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [open, setOpen] = useState(false)
  const [productsCategories, setProductsCategories] = useState([])
  const [value, setValue] = useState({
    category: '',
    disabled: 0,
  })

  const StyledIconButton = styled(IconButton)({
    '&:hover': {
      color: 'red',
    },
  })

  const handleInputChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setValue({ category: '', disabled: 0 })
  }

  async function handleSend(e) {
    e.preventDefault()

    if (value.category === '') {
      return toast.info(
        "You can't add a new category because the field doesn't have data"
      )
    }
    setSendCategoryLoading(true)
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/addcategory`, value)
        .then(({ data }) => {
          toast.success(data, {
            toastClassName: styles.myToast,
          })
          setSendCategoryLoading(false)
          setOpen(false)
          setValue({ category: '', disabled: 0 })
        })
    } catch (error) {
      toast.error(error.message)
      setSendCategoryLoading(false)
    }
  }

  const handleRowClicked = (row) => {
    setItemId(row.id)
  }

  const handleSwitchChange = (id) => (e) => {
    const value = e.target.checked ? 1 : 0
    setIsChecked(value)
    setItemId(id)
    try {
      axios.put(`${process.env.REACT_APP_API}/editCategory`, {
        isChecked: value,
        id: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchGetCategories = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/categories`, {
          withCredentials: true,
          sameSite: 'none',
        })
        console.log(res.data)
        setProductsCategories(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchGetCategories()
  }, [])

  async function handleDeleteCategory(id, e) {
    e.preventDefault()

    try {
      await axios.delete(`${process.env.REACT_APP_API}/deleteCategory/${id}`)
      const updatedCategories = await axios.get(
        `${process.env.REACT_APP_API}/categories`,
        {
          withCredentials: true,
          sameSite: 'none',
        }
      )
      setProductsCategories(updatedCategories.data)
    } catch (error) {
      console.log(error)
    }
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } }

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Categories',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Disabled',
      selector: (row) => (
        <div>
          {row.disabled ? (
            <Switch
              {...label}
              defaultChecked
              onChange={handleSwitchChange(row.id)}
            />
          ) : (
            <Switch {...label} onChange={handleSwitchChange(row.id)} />
          )}
        </div>
      ),
    },
    {
      name: 'Actions',
      selector: (row) => (
        <Stack direction="row" spacing={1}>
          <StyledIconButton aria-label="delete">
            <DeleteIcon
              color="error"
              onClick={(e) => {
                handleDeleteCategory(row.id, e)
              }}
            />
          </StyledIconButton>
        </Stack>
      ),
    },
  ]

  return (
    <DataTable
      title="Products List"
      columns={columns}
      data={productsCategories}
      fixedHeader
      fixedHeaderScrollHeight="450px"
      pagination
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      onRowClicked={handleRowClicked}
      actions={
        <div>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleOpen}>
              + Add Category
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className={styles.titleModal}>
                  Create New Category
                </Typography>
                <Box
                  className={styles.addInpCateogoryContainer}
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off">
                  <TextField
                    id="standard-basic"
                    label="Add Category"
                    value={value.category}
                    variant="standard"
                    color="primary"
                    name="category"
                    onChange={handleInputChange}
                  />
                </Box>
                <Box className={styles.sendButtonContainer}>
                  <Box sx={{ '& > button': { m: 1 } }}>
                    <LoadingButton
                      onClick={handleSend}
                      endIcon={<SendIcon />}
                      loading={sendCategoryLoading}
                      loadingPosition="end"
                      variant="contained">
                      <span>Send</span>
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
            </Modal>
          </Stack>
          <ToastContainer toastClassName={styles.myToast} />
        </div>
      }
    />
  )
}
