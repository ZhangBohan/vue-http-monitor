<template>
  <h1>{{ this.uuid }}</h1>
    
</template>

<script>
import { getRequest } from '../api/api'

export default {
  name: 'RequestDetail',
  data () {
    return {
      uuid: '047195f6-6d35-4595-8091-7299b9f741ff'
    }
  },
  methods: {
    getRequest: function (uuid) {
      getRequest(uuid).then(response => {
        console.log('response')
      })
    }
  },
  mounted () {
    this.getRequest(this.uuid)
  }
}
</script>
