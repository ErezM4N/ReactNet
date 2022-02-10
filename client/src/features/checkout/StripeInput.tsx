import { InputBaseComponentProps } from "@mui/material";
import { useImperativeHandle } from "react";
import { useRef } from "react";
import { Ref } from "react";
import { forwardRef } from "react";

interface Props extends InputBaseComponentProps {}

export const StripeInput = forwardRef(function StripeInput({ component: Component, ...props }: Props,
    ref: Ref<unknown>) {
    const elementRef = useRef<any>();

    useImperativeHandle(ref, () => ({
        focus: () => elementRef.current.focus
    }));

    return (
        <Component
            onReady={(element: any) => elementRef.current = element}
            {...props}
        />
    )
})