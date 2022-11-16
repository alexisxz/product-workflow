import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import styles from '../styles/Home.module.scss'

// types
import { IProduct } from '../types/Product'

// actions
import { selectProduct, unSelectProduct } from '../features/productSlice'

const ProductCard = ({ product }: { product: IProduct }) => {
    const [isSelected, setIsSelected] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    const handleOnChange = () => {
        setIsSelected(!isSelected)

        if (isSelected === true) {
            dispatch(selectProduct(product.sku))
        } else {
            dispatch(unSelectProduct(product.sku))
        }
    }

    const formatPrice = () => {
        return Number(product.price).toFixed(2) + ' $'
    }

    return (
        <article className={styles.card}>
            <div>
                <input type="checkbox" className='delete-checkbox' onChange={handleOnChange} />
            </div>
            <div>
                <h3>{product.sku}</h3>
                <p>{product.name}</p>
                <p>{formatPrice()}</p>
                <p>{product.measure}</p>
            </div>
        </article>
    )
}

export default ProductCard