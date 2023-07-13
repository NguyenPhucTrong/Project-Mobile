$(document).ready(function () {
  $(".delete-product").on("click", function (e) {
    var $target = $(e.currentTarget);
    const id = $target.data("id");
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
            window.location.href = "/products/product";
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

// $(document).ready(function () {
//   $(".delete-product").on("click", function (e) {
//     var $target = $(e.currentTarget);
//     var id = $target.data("id");

//     if (id) {
//       $.ajax({
//         type: "DELETE",
//         url: "/products/delete-product/" + id,
//         success: function (response) {
//           console.log(response);
//           alert(response.message);
//           window.location.href = "/";
//         },
//         error: function (err) {
//           console.log(err);
//         },
//       });
//     } else {
//       console.log("Invalid product id");
//     }
//   });
// });
