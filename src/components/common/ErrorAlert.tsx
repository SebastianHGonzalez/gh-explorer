import { t } from "@/i18n/t";
import { HttpError } from "@/utils/HttpError";
import { ViewStyle } from "react-native";
import { Container } from "./Container";
import { P } from "./P";

interface ErrorAlertProps {
  error: Error;
  style?: ViewStyle;
}

export function ErrorAlert({ error, style }: ErrorAlertProps) {
  if (error instanceof HttpError && error.status === 403) {
    return (
      <Container variant="error" elevation={5} style={style}>
        <P>{t("ErrorAlert.403")}</P>
      </Container>
    );
  }

  if (error instanceof HttpError && error.status === 404) {
    return (
      <Container variant="error" elevation={5} style={style}>
        <P>{t("ErrorAlert.404")}</P>
      </Container>
    );
  }

  if (error instanceof HttpError && error.status === 500) {
    return (
      <Container variant="error" elevation={5} style={style}>
        <P>{t("ErrorAlert.500")}</P>
      </Container>
    );
  }

  if (error instanceof HttpError) {
    return (
      <Container variant="error" elevation={5} style={style}>
        <P>{t("ErrorAlert.default")}</P>
      </Container>
    );
  }

  return (
    <Container variant="error" elevation={5} style={style}>
      <P>{error.message}</P>
    </Container>
  );
}

export function renderErrorAlert(error: Error) {
  return <ErrorAlert error={error} />;
}
