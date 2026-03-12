import { useEffect, useState } from 'react'
import styles from './Products.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Icon } from '../../../SVG/Icon'
import { logedUserAPI } from '../../../Store/Slices/LogedUserSlice/LogedUserAPI'
import { usersFetch } from '../../../Store/Slices/UserSlice/API'
import { useDispatch } from 'react-redux'
export const Products = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const navigate = useNavigate()
    const logedID = localStorage.getItem("ID")
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:3010/marketplace/${id}`)
            setProduct(response.data)
        }
        fetchProduct()
        dispatch(logedUserAPI())
        dispatch(usersFetch())
    }, [])
    async function deleteProduct(id) {
        const deletedProd = await fetch(`http://localhost:3010/marketplace/${id}`, {
            method: "DELETE"
        })
        navigate("/home/marketplace")
    }
    return (
        <div className={styles.fullWindow}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <img src={product.image} alt={product.about} />
                    <div className={styles.bottomBox}>
                        <h2>{product.type?.toUpperCase()}</h2>
                        <h4>{product.time?.slice(0, 10)}</h4>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.info}>
                        <h2>{product.title}</h2>
                        <h3>{product.price} USD</h3>
                        <p>address: {product.address?.country} {product.address?.city} {product.address?.street}</p>
                        <p>tel: {product.phone}</p>
                        {
                            logedID !== product.userId ? <button onClick={() => navigate(`/home/messenger/${product.userId}`)}>Chat in Messenger</button> :
                                <button className={styles.deleteButton} onClick={() => deleteProduct(product.id)}>Delete Post</button>
                        }
                        <h5>{product.about}</h5>
                    </div>
                </div>
            </div>
            <span className={styles.close} onClick={() => navigate(-1)}><Icon name="xIcon" /></span>
        </div>
    )
}