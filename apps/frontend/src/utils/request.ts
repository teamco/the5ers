  /**
   * A helper function to make a JSON request to the server.
   *
   * @param url - The URL of the request.
   * @param opts - Optional request options to be merged with the default options.
   * @returns A promise that resolves to the JSON response from the server.
   */
  export const request = async (url: string, opts = {}): Promise<any> => {
    return fetch(url, { ...opts, headers: { "Content-Type": "application/json" } }).then(res => res.json());
  }
