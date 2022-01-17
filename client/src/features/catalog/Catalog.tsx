//import React from 'react'
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import Loadingcomponent from '../../app/layout/LoadingComponent';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';

// interface Props {
// 	products: Product[];
// 	addProduct: () => void;
// }

export default function Catalog() {

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		agent.Catalog.list()
			.then(products => setProducts(products))
			.catch(error => console.log(error))
			.finally(()=> setLoading(false))
		//   fetch('http://localhost:5000/api/products')
		// 	.then(response => response.json())
		// 	.then(data => setProducts(data))
	}, []);

	if (loading) return <Loadingcomponent message='Loading products...' />


	// const addProduct = () => {
	//   setProducts(prevState =>
	// 	[...prevState,
	// 	{
	// 	  id: (prevState[prevState.length - 1].id) + 1,
	// 	  name: 'product' + (prevState.length + 1),
	// 	  price: (prevState.length * 100) + 100,
	// 	  brand: 'some brand',
	// 	  description: 'some description',
	// 	  pictureUrl: 'http://picsum.photos/200'
	// 	}
	// 	]);
	// }

	return (

		<>
			<ProductList products={products} />
			{/* <Button variant='contained' onClick={addProduct}>Add product</Button> */}
		</>
	)

}