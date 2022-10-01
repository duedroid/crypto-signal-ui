<script setup>
import { reactive, onMounted, inject } from 'vue'

import CardDateTime from "../components/card/CardDateTime.vue";
import TablePair from '../components/table/TablePair.vue';

const dayjs = inject('dayjs')
const axios = inject('axios')

const data = reactive({
  last_updated: null,
  next_updated: null,
  short_data: [],
  long_data: [],
})

function getData() {
  axios.get('/trends/signal', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    }
  })
    .then(response => {
      data.last_updated = dayjs(response.data.last_updated).format('MMMM D, YYYY HH:mm')
      data.next_updated = dayjs(response.data.next_updated).format('MMMM D, YYYY HH:mm')
      let short_data = []
      let long_data = []
      let usdt_icon = 'https://cryptoicon.s3.amazonaws.com/32/color/usdt.png'
      response.data.result.forEach(element => {
        let pair_split = element.pair.split("/")
        let base = pair_split[0]
        let quote = pair_split[1]
        let spot_link = `https://www.tradingview.com/chart/?symbol=BINANCE%3A${base}${quote}`
        let pair_data = {
          base: base,
          quote: quote,
          base_icon: `https://cryptoicon.s3.amazonaws.com/32/color/${base.toLowerCase()}.png`,
          quote_icon: usdt_icon,
          spot_link: spot_link,
          future_link: `${spot_link}PERP`
        }
        if (element.side == 's') {
          short_data.push(pair_data)
        } else if (element.side == 'l') {
          long_data.push(pair_data)
        }
      })
      data.short_data = [...short_data]
      data.long_data = [...long_data]
    })
    .catch(error => {
      console.log(error);
    })
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-row justify="center">
          <el-col class="custom-col" :xs="24" :sm="6">
            <CardDateTime title="Last Updated" :date="data.last_updated" />
          </el-col>
          <el-col class="custom-col" :xs="24" :sm="6">
            <CardDateTime title="Next Updated" :date="data.next_updated" />
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col class="custom-col" :xs="24" :sm="6">
            <TablePair title="Short Signal" :data="data.short_data" />
          </el-col>
          <el-col class="custom-col" :xs="24" :sm="6">
            <TablePair title="Long Signal" :data="data.long_data" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.custom-col {
  margin: 20px;
}
</style>