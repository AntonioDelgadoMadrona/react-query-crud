import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, deleteProduct, updateProduct } from '../../api/productsAPI';
import './Products.css'

export function Products() {

    const queryClient = useQueryClient();

    const { isLoading, data: products, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        select: products => products.sort((a, b) => a.name.localeCompare(b.name))
    });

    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            console.log('Product deleted!!')
            queryClient.invalidateQueries('products')
        },
    })

    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            console.log('Product updated!!')
            queryClient.invalidateQueries('products')
        },
    })

    return (
        <div className='products-component'>
            <h2>Products List</h2>
            {isLoading && <h4 className='loading'>Loading...</h4>}
            {isError && <h4 className='error'>{error.message}</h4>}
            {products && products.map((product) => (
                <div key={product.id} className='product'>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <button onClick={() => deleteProductMutation.mutate(product.id)}>Delete</button>
                    <input
                        checked={product.inStock}
                        type="checkbox"
                        name="inStock"
                        id={`inStock-${product.id}`}
                        onChange={() => updateProductMutation.mutate({ ...product, inStock: !product.inStock })}
                    />
                    <label htmlFor={`inStock-${product.id}`}>InStock</label>
                </div>
            ))}
        </div>
    );
}

