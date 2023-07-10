$(document).ready(function () {
  $(".delete-product").on("click", function (e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "Delete",
      url: "/products/delete-product/" + id,
      success: function (response) {
        console.log(response);
        $.ajax({
          type: "DELETE",
          url: "/products/delete-product/" + id,
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
