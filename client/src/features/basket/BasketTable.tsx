import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

const BasketTable = ({ items, isBasket = true }: Props) => {
    const alignItems = 'center';
    const { status } = useAppSelector(state => state.basket); // basket, 
    const dispatch = useAppDispatch();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align={alignItems}>Price</TableCell>
                        <TableCell align={alignItems}>Quantity</TableCell>
                        <TableCell align={alignItems}>Subtotal</TableCell>
                        {isBasket && <TableCell align={alignItems}></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => ( //basket.items
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align={alignItems}>$ {(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell align={alignItems}>
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, name: 'rem' }))}
                                        color='error'>
                                        <Remove />
                                    </LoadingButton>}
                                {item.quantity}
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === 'pendingAddItem' + item.productId}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                                        color='secondary'>
                                        <Add />
                                    </LoadingButton>}
                            </TableCell>
                            <TableCell align={alignItems}>$ {((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                            {isBasket &&
                                <TableCell align={alignItems}>
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.productId + 'del'}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: 'del' }))}
                                        color='error'>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default BasketTable;