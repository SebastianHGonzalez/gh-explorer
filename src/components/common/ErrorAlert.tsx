import { ViewStyle } from "react-native";
import { Container } from "./Container";
import { P } from "./P";

interface ErrorAlertProps {
    error: Error;
    style?: ViewStyle
}

export function ErrorAlert({ error, style }: ErrorAlertProps) {
    return (
        <Container variant="error" elevation={5} style={style}>
            <P>{error.message}</P>
        </Container>
    )
}
