<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  date: String
})
</script>

<template>
  <el-card class="date-card box-card" center>
    <div class="date-title">{{ title }}</div>
    <div class="date-value">{{ date }}</div>
  </el-card>
</template>

<style scoped>
.date-card {
  border-radius: 10px;
}

.date-value {
  font-size: 20px;
}
</style>