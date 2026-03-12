import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './Marketplace.module.css'
import axios from 'axios'
import { Icon } from '../../SVG/Icon'
import allPNG from '../../Asets/allMarket.png'
import vehIcon from '../../Asets/vheticlesMarket.png'
import clotesIcon from '../../Asets/clotesMarket.png'
import childrenIcon from '../../Asets/ChildrenMarket.png'
import toyIcon from '../../Asets/ToysMarket.png'
import realEstateyIcon from '../../Asets/EstateMarket.png'
import sportIcon from '../../Asets/SportMarket.png'
import animalsIcon from '../../Asets/AnimalsMarket.png'
import electroIcon from '../../Asets/electronicMarket.png'
import { useNavigate } from 'react-router-dom'
import { CreateNewAd } from '../../Components/CreateNewAd/CreateNewAd'
import { MarketplaceSearchedResult } from '../../Components/MarketplaceSearchedResult/MarketplaceSearchedResult'
import { logedUserAPI } from '../../Store/Slices/LogedUserSlice/LogedUserAPI'
import { usersFetch } from '../../Store/Slices/UserSlice/API'
import { useDispatch } from 'react-redux'
export const Marketplace = () => {
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [createNewOpen, setcreateNewOpen] = useState(false)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const MarketFetch = async () => {
            const result = axios.get("http://localhost:3010/marketplace")
            setProducts((await result).data)
        }
        MarketFetch()
        dispatch(logedUserAPI())
        dispatch(usersFetch())
    }, [])
    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter(el => el.type === selectedCategory)
    const finded = useMemo(() => {
        if (search == "") return [];
        return filteredProducts.filter(el => el.title.startsWith(search))
    }, [search])
    return (
        <div className={styles.marketplace}>
            {createNewOpen && <CreateNewAd setcreateNewOpen={setcreateNewOpen} products={products} setProducts={setProducts} />}
            <div className={!createNewOpen ? styles.leftside : `${styles.leftside} ${styles.bluring}`}>
                <h1 className='h1'>Marketplace</h1>
                <div className={styles.searchBox}>
                    <span><Icon name="Search" size={"20px"} /></span>
                    <input type="text" placeholder='Search in Market' onChange={(e) => setSearch(e.target.value)} />
                    {search !== "" && <MarketplaceSearchedResult result={finded} />}
                </div>
                <button className={styles.addToMarket} onClick={() => setcreateNewOpen(!createNewOpen)}>Create a New Ad +</button>
                <h3 className={styles.categorys}>Categorys</h3>
                <div className={styles.all} onClick={() => setSelectedCategory("all")}>
                    <img src={allPNG} alt="" />
                    <p>All</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("vehicles")}>
                    <img src={vehIcon} alt="" />
                    <p>Vehicles</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("clothes")}>
                    <img src={clotesIcon} alt="" />
                    <p>Clothes</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("children")}>
                    <img src={childrenIcon} alt="" />
                    <p>Children`s</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("toy")}>
                    <img src={toyIcon} alt="" />
                    <p>Toys</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("realEstatey")}>
                    <img src={realEstateyIcon} alt="" />
                    <p>Real Estate</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("sport")}>
                    <img src={sportIcon} alt="" />
                    <p>Sport</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("animals")}>
                    <img src={animalsIcon} alt="" />
                    <p>Animals</p>
                </div>
                <div className={styles.all} onClick={() => setSelectedCategory("electronic")}>
                    <img src={electroIcon} alt="" />
                    <p>Electronic</p>
                </div>
            </div>
            <div className={!createNewOpen ? styles.products : `${styles.products} ${styles.bluring}`}>
                {[...filteredProducts].reverse().map(el => {
                    return (
                        <div className={styles.productBox} key={el.id} onClick={() => { navigate(`${el.id}`) }}>
                            <img src={el.image} alt="" />
                            <h3>{el.price} USD</h3>
                            <p>{el.title}</p>
                            <p>{el.address?.city}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}