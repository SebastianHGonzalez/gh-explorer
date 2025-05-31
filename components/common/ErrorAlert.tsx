import { Text, ViewStyle } from "react-native"
import { Container } from "./Container"

interface ErrorAlertProps {
    error: Error;
    style?: ViewStyle
}

export function ErrorAlert({ error, style }: ErrorAlertProps) {
    return (
        <Container variant="error" elevation={5} style={style}>
            <Text>{error.message}</Text>
        </Container>
    )
}
