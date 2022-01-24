import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
//import { useStoreContext } from "../../app/context/StoreContext";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
    const alignItems = 'center';
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    //const { basket, setBasket, removeItem } = useStoreContext();
    //const [loading, setLoading] = useState(false);
    // const [status, setStatus] = useState({
    //     loading: false,
    //     name: ''
    // });

    // function handleAddItem(productId: number, name: string) {
    //     //setLoading(true);
    //     setStatus({ loading: true, name });
    //     agent.Basket.addItem(productId)
    //         .then(basket => dispatch(setBasket(basket)))
    //         .catch(error => console.log(error))
    //         .finally(() => setStatus({ loading: false, name: '' }))
    // }

    // function handleRemoveItem(productId: number, quantity = 1, name: string) {
    //     setStatus({ loading: true, name });
    //     agent.Basket.removeItem(productId, quantity)
    //         .then(() => dispatch(removeItem({productId, quantity})))
    //         .catch(error => console.log(error))
    //         .finally(() => setStatus({ loading: false, name: '' }))
    // }


    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
        // <h1>Buyer Id = {basket.buyerId}</h1>
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align={alignItems}>Price</TableCell>
                            <TableCell align={alignItems}>Quantity</TableCell>
                            <TableCell align={alignItems}>Subtotal</TableCell>
                            <TableCell align={alignItems}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
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
                                    <LoadingButton
                                        // loading={status.loading && status.name === 'rem' + item.productId} //handleRemoveItem(item.productId, 1, 'rem' + item.productId
                                        loading={status.includes('pendingRemoveItem' + item.productId)}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId }))}
                                        color='error'>
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        // loading={status.loading && status.name === 'add' + item.productId}
                                        loading={status.includes('pendingAddItem' + item.productId)}
                                        // onClick={() => handleAddItem(item.productId, 'add' + item.productId)}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                                        color='secondary'>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align={alignItems}>$ {((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align={alignItems}>
                                    <LoadingButton
                                        // loading={status.loading && status.name === 'del' + item.productId}
                                        loading={status.includes('pendingRemoveItem' + item.productId)}
                                        // onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity }))}
                                        color='error'>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>

    )
}

