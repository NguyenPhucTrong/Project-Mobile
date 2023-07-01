let list = document.querySelectorAll(".navigation-menu li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation-menu");
let main = document.querySelector(".main-menu");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

$(document).ready(function () {
  $(".delete-product").on("click", function (e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "GET",
      url: "/product/delete-product/" + id,
      success: function (response) {
        console.log(response);
        $.ajax({
          type: "DELETE",
          url: "/product/delete-product/" + id + "?_csrf=" + response.csrfToken,
          success: function (response) {
            alert(response.messsage);
            window.location.href = "/";
          },
          error: function (err) {
            console.log(err);
          },
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
