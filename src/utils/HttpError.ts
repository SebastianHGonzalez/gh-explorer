export class HttpError extends Error {
  constructor(
    public status: number,
    public message: string,
    public cause?: Error
  ) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.cause = cause;
  }

  static fromResponse(response: Response): Promise<HttpError> {
    return response.text().then((text) => {
      const errorMessage = text || response.statusText;
      return new HttpError(response.status, errorMessage);
    });
  }
}
