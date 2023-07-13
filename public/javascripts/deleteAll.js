$(document).ready(function () {
  $(".delete-all-products-link").on("click", function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
    if (confirm("Bạn có chắc chắn muốn xoá tất cả sản phẩm?")) {
      $.ajax({
        type: "DELETE",
        url: $(this).attr("href"), // Lấy URL từ thuộc tính href của liên kết
        success: function (response) {
          console.log(response);
          alert(response.message);
          window.location.href = "/products/product";

          // Thực hiện các hành động khác sau khi xóa thành công tất cả sản phẩm (nếu cần)
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  });
});
