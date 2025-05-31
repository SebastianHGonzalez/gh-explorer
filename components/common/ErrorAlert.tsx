import { Text, StyleSheet } from "react-native"
import { Container } from "./Container"

interface ErrorAlertProps {
    error: Error;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
    return (
        <Container>
            <Text>{error.message}</Text>
        </Container>
    )
}
