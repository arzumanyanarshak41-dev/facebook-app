import { memo } from 'react'
import styles from './MarketplaceSearchedResult.module.css'
import { useNavigate } from 'react-router-dom'

export const MarketplaceSearchedResult = memo(({ result }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.allFinded}>
            {result.map(product => (
                <div className={styles.marketplaceSearchedResult} key={product.id} onClick={() => navigate(`${product.id}`)}>
                    <img src={product.image} alt="" />
                    <div className={styles.prodInfo}>
                        <h4>{product.title}</h4>
                        <p>{product.type}: {product.price}$</p>
                    </div>
                </div>
            ))}
        </div>
    )
})