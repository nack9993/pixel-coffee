export default function fetcher(
  url: string,
  data = undefined,
  type = undefined
) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: type ?? data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
}
