import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51KRFYsKbnRSxzMYD62r8NsqyT4fM7xdFBEvR8p2j9HiigS4Mx0KAKOpIXrQ8zAWzsnJji1v7FITVy4rFZrldukPn00tweIsAAf');

export default function CheckoutWrapper() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payment.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch]);


    if (loading) return <LoadingComponent message='loading checkout...'/>


    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}
