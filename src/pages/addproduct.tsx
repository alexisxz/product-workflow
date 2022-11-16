/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

// styles
import styles from '../styles/Home.module.scss'

// types
import { Switcher } from '../types/Product'

// reducer
import { addProduct } from '../features/productSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useRouter } from 'next/router'

const initialFormState = {
    sku: '',
    name: '',
    price: 0,
    productType: 'Book',
    measure: '',
    size: '',
    weight: '',
    height: '',
    width: '',
    length: '',
}

export default function AddProduct() {
    const switches = [Switcher.Book, Switcher.DVD, Switcher.Furniture]
    const [formData, setFormData] = useState(initialFormState)

    const products = useAppSelector(state => state.products.products)
    const dispatch = useAppDispatch()
    const router = useRouter()

    // useEffects
    useEffect(() => { setFormData({ ...formData, measure: '' }) }, [formData.productType])


    useEffect(() => {
        if (formData.productType === Switcher.Book) {
            const newMeasure = 'Weight: ' + formData.weight + 'KG'
            { !formData.weight ? setFormData({ ...formData, measure: '' }) : setFormData({ ...formData, measure: newMeasure, size: '', height: '', width: '', length: '' }) }
        }

    }, [formData.weight])

    useEffect(() => {
        if (formData.productType === Switcher.DVD) {
            const newMeasure = 'Size: ' + formData.size + ' MB'
            { !formData.size ? setFormData({ ...formData, measure: '' }) : setFormData({ ...formData, measure: newMeasure, weight: '', height: '', width: '', length: '' }) }
        }
    }, [formData.size])

    useEffect(() => {
        if (formData.productType === Switcher.Furniture) {
            const newMeasure = 'Dimension: ' + formData.height + 'x' + formData.width + 'x' + formData.length
            { !formData.height || !formData.length || !formData.width ? setFormData({ ...formData, measure: '' }) : setFormData({ ...formData, measure: newMeasure, weight: '', size: '' }) }
        }
    }, [formData.height, formData.length, formData.width])

    //handle
    const handleChange = (event: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [event.currentTarget.name]: event.currentTarget.value })

    }

    const handleSave = () => {
        if (!formData.sku || !formData.name || formData.price === 0 || !formData.productType || !formData.measure) return alert('Please, submit required data');

        if (products.find(product => product.sku === formData.sku)) return alert('SKU already exist, please update with a new SKU')

        const newProduct = {
            sku: formData.sku,
            name: formData.name,
            price: formData.price,
            productType: formData.productType,
            measure: formData.measure
        }
        dispatch(addProduct(newProduct))
        setFormData(initialFormState)
        router.replace('/')
    }

    const handleCancel = () => {
        router.replace('/')
    }

    // helpers
    const swticherForm = () => {
        if (formData.productType === Switcher.DVD) {
            return (
                <div>
                    <label>Size (MB)</label>
                    <input required id='size' type="number" name='size' value={formData?.size} onChange={e => handleChange(e)} />
                    {!formData.size ? <span style={{ color: 'red' }}>Size is required</span> : ''}
                    <p>Please provide the size in MB.</p>
                </div>
            )
        }
        if (formData.productType === Switcher.Furniture) {
            return (
                <div>
                    <label>Height (CM)</label>
                    <input required id='height' type="number" name='height' value={formData?.height} onChange={e => handleChange(e)} />
                    <label>Width (CM)</label>
                    <input required id='width' type="number" name='width' value={formData?.width} onChange={e => handleChange(e)} />
                    <label>Length (CM)</label>
                    <input required id='length' type="number" name='length' value={formData?.length} onChange={e => handleChange(e)} />
                    {!formData.width || !formData.height || !formData.length ? <span style={{ color: 'red' }}>HxWxL is required</span> : ''}
                    <p>Please provide the dimension in HxWxL format.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <label>Weigth (KG)</label>
                    <input required id='weight' type="number" name='weight' value={formData?.weight} onChange={e => handleChange(e)} />
                    {!formData.weight ? <span style={{ color: 'red' }}>Weight is required</span> : ''}
                    <p>Please provide the weight in KG.</p>
                </div>
            )
        }
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Add product page</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <main className={styles.main}>

                <div className={styles.header}>
                    <h1>Add Product</h1>
                    <div className='header-btn'>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>

                <form id='product_form' className={styles.form}>
                    <div className={styles.labels}>
                        <div>
                            <label>SKU</label>
                            <input required id='sku' type="text" name='sku' value={formData?.sku} onChange={e => handleChange(e)} />
                            {!formData.sku ? <span style={{ color: 'red' }}>SKU is required</span> : ''}
                        </div>

                        <div>
                            <label>Name</label>
                            <input required id='name' type="text" name='name' value={formData?.name} onChange={e => handleChange(e)} />
                            {!formData.name ? <span style={{ color: 'red' }}>Name is required</span> : ''}
                        </div>

                        <div>
                            <label>Price ($)</label>
                            <input required id='price' type="number" name='price' value={formData?.price} onChange={e => handleChange(e)} />
                            {!formData.price ? <span style={{ color: 'red' }}>Price is required</span> : ''}
                        </div>

                        <div>
                            <label>Type Switcher</label>
                            <select id='productType' name='productType' value={formData?.productType} onChange={handleChange}>
                                {switches.map((switcher: any, index: any) => (
                                    <option key={index} value={switcher} >{switcher}</option>
                                ))}
                            </select>
                        </div>
                        {swticherForm()}
                    </div>

                </form>


            </main>
            <footer className={styles.footer}>
                <p>Scandiweb Test assigment <a target='_blank' rel='noreferrer' href='https://alexisxz.github.io/my-site/'>Alexis Matos da Silva</a></p>
            </footer>
        </div>

    )
}