function sendData(e) {
  fetch("getsearch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload: e.value }),
  });
}
