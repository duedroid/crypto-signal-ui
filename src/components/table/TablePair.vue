<script setup>
const props = defineProps({
  title: String,
  data: Array
})
</script>
    
<template>
  <div class="pair-table-title">{{ title }}</div>
  <el-table :data="data" style="width: 100%">
    <el-table-column>
      <template #default="scope">
        <div class="pair-table-col pair-table-icon">
          <el-avatar size="small" :src="scope.row.base_icon" />
          <el-avatar size="small" :src="scope.row.quote_icon" />
        </div>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <div class="pair-table-col">
          <div class="pair-table-col">{{ scope.row.base }} / {{ scope.row.quote }}</div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
    
<style scoped>
.pair-table-title {
  font-size: 20px;
}

.pair-table-icon {
  column-gap: 0.5rem
}

.pair-table-col {
  display: flex;
  align-items: center;
}

.date-card {
  border-radius: 10px;
}

.date-value {
  font-size: 20px;
}
</style>