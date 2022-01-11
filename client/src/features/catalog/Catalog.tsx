//import React from 'react'
import { useEffect, useState } from 'react';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';

// interface Props {
// 	products: Product[];
// 	addProduct: () => void;
// }

export default function Catalog() {

	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
	  fetch('http://localhost:5000/api/products')
		.then(response => response.json())
		.then(data => setProducts(data))
	}, []);
  
  
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