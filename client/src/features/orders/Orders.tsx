import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Loadingcomponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import { currencyFormat, dateFormat } from "../../app/util/util";
import OrderDetailed from "./OrderDetailed";

export default function Orders() {

    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);


    useEffect(() => {
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []);

    if (loading) return <Loadingcomponent message='loading orders...' />

    if (selectedOrderNumber > 0) return (
        <OrderDetailed
            order={orders?.find(o => o.id === selectedOrderNumber)!}
            setSelectedOrder={setSelectedOrderNumber}
        />
    )

    return (

        <>
            <Typography sx={{ p: 2 }} gutterBottom variant='h4'>Orders</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Number</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Order Date</TableCell>
                            <TableCell align="right">Order Status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow
                                key={order.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                                <TableCell align="right">{dateFormat(order.orderDate)}</TableCell>
                                <TableCell align="right">{order.orderStatus}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => setSelectedOrderNumber(order.id)}>View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}


    //const [viewOrder, setViewOrder] = useState<Order | null>(null);
    //const [detailsView, setDetailsView] = useState(false);

    // const handleView = (id: number) => {
    //     console.log(id);
    //     debugger
    //     agent.Orders.fetch(id)
    //         .then(order => {
    //             debugger
    //             setViewOrder(order)
    //         })
    //         .catch(error => console.log(error))
    //         .finally(() => setDetailsView(true))

    // }
    // const backOrders = () => {
    //     setViewOrder(null);
    //     setDetailsView(false);
    // }

//}
// <>{!detailsView &&
/*{ {detailsView &&
    <>
        <Box display='flex' alignItems='center'>
            <h2>{`Order# ${viewOrder?.id} - ${viewOrder?.orderStatus}`}</h2>
            <Button onClick={() => backOrders()}>
                Back To Orders
            </Button>
        </Box>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {viewOrder?.orderItems?.map((orderItem) => (
                        <TableRow
                            key={orderItem.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={orderItem.pictureUrl} alt={orderItem.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{orderItem.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{orderItem.price}</TableCell>
                            <TableCell align="right">{currencyFormat(orderItem.quantity)}</TableCell>
                            <TableCell align="right">{currencyFormat(orderItem.price * orderItem.quantity)}</TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </>} }
    </>
    */




