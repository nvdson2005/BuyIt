<script lang="ts" setup>
import {
  Ticket, Percent, Briefcase, Zap, Gift
} from "lucide-vue-next";
import ToolCard from "@/components/ui/ToolCard.vue";
import Section from "@/components/ui/Section.vue";

</script>

<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Marketing Tools</h2>
    </div>

    <div class="space-y-6">
      <!-- Section 1 -->
      <Section title="Boost Sales using Marketing Tools">
        <ToolCard
          :icon="Ticket"
          title="Shop Voucher"
          description="Boosting orders number by creating new vouchers"
          @click="$emit('voucher')"
        />
        <ToolCard
          :icon="Percent"
          title="Shop Program"
          description="Boosting orders number by creating new promotion program"
          @click="$emit('program')"
        />
        <ToolCard
          :icon="Briefcase"
          title="Shop Promotion"
          description="Creating Promotion Combo for boosing Revenue"
          @click="$emit('program')"
        />
        <ToolCard
          :icon="Gift"
          title="Buy With Shock Deal"
          description="Boosting orders number by creating shock deals"
          tag="New"
          @click="$emit('program')"

        />
        <ToolCard
          :icon="Zap"
          title="Shop Flash Sale"
          description="Boosting Revenue by creating flash sale in specific period"
          @click="$emit('program')"

        />
      </Section>
    </div>
  </div>
</template>

