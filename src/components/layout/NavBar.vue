<script setup lang="ts">
import '../../assets/styles/Variables.css'
</script>

<template>
  <nav>
    <div class="navbar-header">
      <div class="left-section">
        <p>Trung tâm người bán</p>
        <p class="divider">|</p>
        <p>Tải xuống</p>
        <p class="divider">|</p>
        <p>Theo dõi chúng tôi</p>
      </div>
      <div class="right-section">
        <p>Thông báo</p>
        <p class="divider">|</p>
        <p>Tiếng Việt</p>
        <p class="divider">|</p>
        <p>Đăng ký/ Đăng nhập</p>
      </div>
    </div>
    <div class="navbar-header-with-search">
      <div class="logo-section">
        <img src="/public/Logo.png" alt="Logo" style="width: 50px; height: 50px" />
        <h2>BuyIt</h2>
      </div>
      <div class="middle-section" style="flex-grow: 1">
        <div class="search-section" style="display: flex; align-items: center; flex-grow: 1">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn..."
            style="width: 100%; height: 40px; border-radius: 5px; padding: 0 10px; font-size: 14px"
          />
          <button style="height: 40px; border-radius: 5px; padding: 0 10px; font-size: 14px">
            Tìm kiếm
          </button>
        </div>
        <p style="font-size: 14px; margin-top: 3px; margin-bottom: 5px">
          Điện thoại, Laptop, Tai nghe, Phụ kiện
        </p>
      </div>
      <div class="cart-section">
        <p>Giỏ hàng</p>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  height: 100%;
  background-color: var(--red);
  color: white;
}

.navbar-header {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
}
.divider {
  margin: 0 10px;
  color: var(--light-pink);
}
.navbar-header * {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.navbar-header-with-search {
  margin-left: 10%;
  margin-right: 10%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.navbar-header-with-search .logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  cursor: pointer;
}
</style>
