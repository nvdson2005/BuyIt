<script setup lang="ts">
import SearchButton from '../ui/SearchButton.vue'
import ShopButton from '../ui/ShopButton.vue'
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
        <img src="/src/assets/images/Logo.png" alt="Logo" style="width: 50px; height: 50px" />
        <h2 class="font-bold text-2xl">BuyIt</h2>
      </div>
      <div class="middle-section" style="flex-grow: 1">
        <div class="search-section" style="display: flex; align-items: center; flex-grow: 1">
          <input
            class="input-box"
            type="text"
            placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn..."
            style="width: 100%; height: 40px; border-radius: 5px; padding: 0 10px; font-size: 14px"
          />
          <div class="w-20 h-10">
            <SearchButton></SearchButton>
          </div>
        </div>
        <p style="font-size: 14px; margin-top: 3px; margin-bottom: 5px">
          Điện thoại, Laptop, Tai nghe, Phụ kiện
        </p>
      </div>
      <div class="h-full w-25 scale-125 flex items-center justify-center">
        <ShopButton></ShopButton>
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
  padding-top: 5px;
}

.navbar-header-with-search {
  margin-top: 10px;
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
