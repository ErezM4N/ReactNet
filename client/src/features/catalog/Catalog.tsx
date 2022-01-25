import { useEffect } from 'react';
import Loadingcomponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productSelectors } from './CatalogSlice';
import ProductList from './ProductList';


export default function Catalog() {
	const products = useAppSelector(productSelectors.selectAll);
	const { productsLoaded, status } = useAppSelector(state => state.catalog);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync());
	}, [productsLoaded, dispatch]);

	if (status.includes('pending')) return <Loadingcomponent message='Loading products...' />

	return (
		<>
			<ProductList products={products} />
		</>
	)

}