function sendData(input) {
  const searchResult = document.getElementById("searchResult");
  let match2 = input.value.match(/^\s*$/);
  if (match2 !== null) {
    searchResult.innerHTML = "";
    document.querySelectorAll(".product .card").forEach((card) => {
      card.style.display = "flex";
    });
    return;
  }
  fetch("/getsearch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload: input.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      let payload = data.payload;
      searchResult.innerHTML = "";
      if (payload.length < 1) {
        searchResult.innerHTML = "<p>Sorry. Nothing Found.</p>";
        return;
      }
      document.querySelectorAll(".product .card").forEach((card) => {
        let cardTitle = card
          .querySelector(".card-title")
          .innerText.toLowerCase();
        const cardDescription = card
          .querySelector(".card-text")
          .innerText.toLowerCase();
        if (
          cardTitle.includes(input.value.toLowerCase()) ||
          cardDescription.includes(input.value.toLowerCase())
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
}
