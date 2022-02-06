import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
}


export default function PrivateRoute({ component: Component, ...rest }: Props) { //{ children, ...rest }
    //let auth = useAuth();
    const { user } = useAppSelector(state => state.account);
    return (
        <Route
            {...rest}
            render={props => // render={({ location }) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location } //state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}