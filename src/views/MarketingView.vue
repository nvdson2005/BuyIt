<script lang="ts" setup>
import {
  Ticket, Percent, Briefcase, Zap, Gift, Truck, Coins, Users,
  MessageSquare, Gamepad, Tv, Star, Facebook, ThumbsUp
} from "lucide-vue-next";
import ToolCard from "@/components/ui/ToolCard.vue";
import Section from "@/components/ui/Section.vue";

</script>

<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Công Cụ Marketing</h2>
      <a href="#" class="text-sm text-blue-600 hover:underline">
        Xem chương trình khuyến mãi của shop
        <span class="text-xs">&gt;</span>
      </a>
    </div>

    <div class="space-y-6">
      <!-- Section 1 -->
      <Section title="Tăng doanh số bằng các Công cụ Marketing">
        <ToolCard
          :icon="Ticket"
          title="Mã Giảm Giá Của Shop"
          description="Công cụ tăng đơn hàng bằng cách tạo mã giảm giá tặng cho người mua"
          @click="$emit('voucher')"
        />
        <ToolCard
          :icon="Percent"
          title="Chương Trình Của Shop"
          description="Công cụ tăng đơn hàng bằng cách tạo chương trình giảm giá"
          @click="$emit('program')"
        />
        <ToolCard
          :icon="Briefcase"
          title="Combo Khuyến Mãi"
          description="Tạo Combo Khuyến Mãi để tăng giá trị đơn hàng trên mỗi Người mua"
          @click="$emit('program')"
        />
        <ToolCard
          :icon="Gift"
          title="Mua Kèm Deal Sốc"
          description="Công cụ giúp tăng đơn hàng bằng cách tạo các Deal Sốc"
          tag="New"
        />
        <ToolCard
          :icon="Zap"
          title="Flash Sale Của Shop"
          description="Công cụ giúp tăng doanh số bằng cách tạo khuyến mãi khủng trong các khung giờ nhất định"
        />
        <ToolCard
          :icon="Truck"
          title="Khuyến Mãi Phí Vận Chuyển"
          description="Tạo Chương trình Khuyến Mãi Phí Vận Chuyển để thu hút nhiều Người mua hơn"
        />
        <ToolCard
          :icon="Coins"
          title="Xu Của Shop"
          description="Dùng Xu của Shop làm phần thưởng thu hút Người mua tham gia các hoạt động của Shop"
        />
        <ToolCard
          :icon="Users"
          title="Affiliate Marketing Solution"
          description="Leverage on Shopee’s extensive network of affiliate partners to boost your store promotion"
        />
      </Section>

      <!-- Section 2 -->
      <Section title="Tiếp cận với nhiều người mua hơn">
        <ToolCard
          :icon="MessageSquare"
          title="Tin Nhắn Quảng Bá"
          description="Chia sẻ chương trình, sự kiện của Shop tới người mua tiềm năng thông qua Tin Nhắn Quảng Bá"
        />
        <ToolCard
          :icon="Gamepad"
          title="Giải Thưởng Của Shop"
          description="Thu hút Người mua ghé thăm và mua sắm nhiều hơn tại shop của bạn nhờ các Game vui nhộn với giải thưởng hấp dẫn"
        />
        <ToolCard
          :icon="Users"
          title="Ưu Đãi Follower"
          description="Khuyến khích người mua theo dõi Shop bằng cách tặng voucher cho Người theo dõi mới"
          tag="New"
        />
        <ToolCard
          :icon="Tv"
          title="Shopee Live"
          description="Kết nối trực tuyến với người mua và trả lời các câu hỏi liên quan đến việc mua hàng một cách dễ dàng"
        />
        <ToolCard
          :icon="ThumbsUp"
          title="Xu thưởng đánh giá"
          description="Tăng Xu thưởng để khuyến khích người mua để lại đánh giá cho sản phẩm của Shop"
        />
      </Section>

      <!-- Section 3 -->
      <Section title="Tăng lượt truy cập cho shop của bạn">
        <ToolCard
          :icon="Star"
          title="Quảng cáo Shopee"
          description="Tăng mức độ hiển thị sản phẩm, thúc đẩy doanh số bán hàng"
          tag="New"
        />
        <ToolCard
          :icon="Facebook"
          title="Facebook Ads"
          description="Advertise your products on Facebook platforms including Facebook and Instagram"
        />
        <ToolCard
          :icon="Star"
          title="Top Sản Phẩm Bán Chạy"
          description="Tăng lượng truy cập của sản phẩm bằng cách hiển thị sản phẩm đó nổi bật trên những trang sản phẩm khác của Shop"
        />
      </Section>
    </div>
  </div>
</template>

