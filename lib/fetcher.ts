export default function fetcher(
  url: string,
  data = undefined,
  type = undefined
) {
  const reqType = data ? "POST" : "GET";
  return fetch(`${window.location.origin}/api${url}`, {
    method: type ?? reqType,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
}
