import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addProduct } from '../../api/productsAPI'
import './ProductForm.css'

export function ProductForm() {

    const queryClient = useQueryClient();

    const addProductMutatio = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            console.log('Product added!!')
            queryClient.invalidateQueries('products')
        },
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const { name, description, price } = event.target
        const product = {
            name: name.value,
            description: description.value,
            price: price.value,
            inStock: true
        }
        addProductMutatio.mutate(product)
    }

    return (
        <div className='productForm'>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" />

                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" />

                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}