import { Text } from "react-native"
import { Container } from "./Container"

interface ErrorAlertProps {
    error: Error;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
    return (
        <Container variant="error" elevation={5}>
            <Text>{error.message}</Text>
        </Container>
    )
}
