export default function handleResponseFromAPI (promise) {
  return promise
    .then((_message) => {
      console.log('Got a response from the API');
    })
    .catch(() => {
      return new Error();
    });
}
