import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/configureStore";

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    roles?: string[];
}


const PrivateRoute = ({ component: Component, roles, ...rest }: Props) => { //{ children, ...rest }
    //let auth = useAuth();
    const { user } = useAppSelector(state => state.account);
    return (
        <Route {...rest} render={props => {
                if (!user) {//state: { from: location }
                    return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                }

                if (roles && !roles?.some(r => user.roles?.includes(r))) {
                    toast.error('Not authorised to access this area');
                    return <Redirect to={{ pathname: "/catalog" }} /> //, state: { from: props.location }
                }

                return <Component {...props} />
            }}
        />
    );
}
export default PrivateRoute;

             // render={({ location }) =>
            //     user ? (
            //     <Component {...props} />
            // ) : (
                    
            //     )