<template>
  <div v-if="data">
    <el-row :gutter="20" class="request">
      <el-col :span="24">
        {{ "//" + data.request.host + data.request.path }}
        <el-tag :type="methodTagType">{{ data.request.method }}</el-tag>
        <el-tag :type="statusCodeType">{{ data.request.status_code }}</el-tag>
      </el-col>
    </el-row>
    <el-collapse accordion v-model="activeNames">
      <el-collapse-item title="响应" name="1">
        <pre>{{ stringify(data.response) }}</pre>  
      </el-collapse-item>
      <el-collapse-item title="响应头" name="2">
        <pre>{{ stringify(data.response_headers) }}</pre>  
      </el-collapse-item>
      <el-collapse-item title="请求头" name="3">
        <pre>{{ stringify(data.request_headers) }}</pre>  
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getRequest } from '../api/api'
import { Loading } from 'element-ui'

export default {
  name: 'RequestDetail',
  data () {
    return {
      uuid: this.$route.params.uuid,
      activeNames: ['3'],
      data: null,
      fullscreenLoading: Loading.service({ fullscreen: true })
    }
  },
  computed: {
    methodTagType () {
      let data = {
        'GET': 'success',
        'POST': 'warning',
        'PUT': 'primary',
        'DELETE': 'danger',
        'PATCH': 'gray'
      }
      return data[this.data.request.method]
    },
    statusCodeType () {
      let statusCode = parseInt(this.data.request.status_code)
      console.log('statusCode:', statusCode)
      if (statusCode < 300 && statusCode >= 200) {
        return 'success'
      } else if (statusCode < 400 && statusCode >= 300) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  methods: {
    getRequest (uuid) {
      getRequest(uuid).then(response => {
        console.log('response', response)
        this.data = response.body
        this.fullscreenLoading.close()
      })
    },
    stringify (data) {
      return JSON.stringify(data, null, '  ')
    }
  },
  created () {
    this.getRequest(this.uuid)
  }
}
</script>

<style scoped>
  .request {
    margin: 10px;
  }
</style>
