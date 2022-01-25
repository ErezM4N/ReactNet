import { useEffect } from 'react';
import Loadingcomponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productSelectors } from './CatalogSlice';
import ProductList from './ProductList';


export default function Catalog() {

	//const [products, setProducts] = useState<Product[]>([]);
	//const [loading, setLoading] = useState(true);

	const products = useAppSelector(productSelectors.selectAll);
	const { productsLoaded, status } = useAppSelector(state => state.catalog);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync());
		// agent.Catalog.list()
		// 	.then(products => setProducts(products))
		// 	.catch(error => console.log(error))
		// 	.finally(()=> setLoading(false))
	}, [productsLoaded, dispatch]);

	if (status.includes('pending')) return <Loadingcomponent message='Loading products...' />

	return (
		<>
			<ProductList products={products} />
		</>
	)

}