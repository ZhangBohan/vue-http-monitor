<template>
  <div>
    <div v-if="request">
      <el-row :gutter="20" class="request">
        <el-col :span="24">
          {{ "//" + request.host + request.path }}
          <el-tag :type="methodTagType">{{ request.method }}</el-tag>
          <el-tag :type="statusCodeType">{{ request.status_code }}</el-tag>
        </el-col>
      </el-row>
      <el-collapse accordion v-model="activeNames">
        <el-collapse-item title="请求体" name="0">
          <pre>{{ stringify(request.body) }}</pre>  
        </el-collapse-item>
        <el-collapse-item title="响应" name="1">
          <pre>{{ stringify(response) }}</pre>  
        </el-collapse-item>
        <el-collapse-item title="响应头" name="2">
          <pre>{{ stringify(responseHeaders) }}</pre>  
        </el-collapse-item>
        <el-collapse-item title="请求头" name="3">
          <pre>{{ stringify(requestHeaders) }}</pre>  
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-alert title="错误的地址" type="error" v-if="editBaseUrlAlert"></el-alert>
    <el-row type="flex" justify="center" class="input-box" v-if="baseUrl">
      <el-col :span="8">
        <el-input v-model="uuid"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="uuidChange">搜索</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="input-box">
      <el-col :span="12">
        <el-input v-model="editBaseUrl" placeholder="请输入请求地址" :disabled="baseUrl != null"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="warning" @click="baseUrlChange" v-if="baseUrl != null">修改</el-button>
        <el-button type="success" @click="baseUrlSave" v-if="baseUrl == null">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getRequest } from '../api/api'

export default {
  name: 'Requests',
  data () {
    let uuid = this.$route.params.uuid
    let url = localStorage.getItem('baseUrl')
    return {
      uuid: uuid,
      activeNames: ['3'],
      request: null,
      requestHeaders: null,
      response: null,
      responseHeaders: null,
      baseUrl: url,
      editBaseUrl: url,
      editBaseUrlAlert: false
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
      return data[this.request.method]
    },
    statusCodeType () {
      let statusCode = parseInt(this.request.status_code)
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
      console.log('uuid:', uuid)
      if (!uuid) {
        return
      }
      let url = this.baseUrl + uuid + '/'
      console.log('getRequest:', url)
      getRequest(url).then(response => {
        console.log('response', response.body)
        let data = response.body
        this.request = data.request
        this.response = data.response
        this.requestHeaders = data.request_headers
        this.responseHeaders = data.response_headers
      })
    },
    stringify (data) {
      if (typeof (data) === 'string') {
        data = JSON.parse(data)
      }
      return JSON.stringify(data, null, '  ')
    },

    uuidChange () {
      this.getRequest(this.uuid)
    },
    baseUrlChange () {
      this.baseUrl = null
    },
    baseUrlSave () {
      getRequest(this.editBaseUrl).then(response => {
        console.log('baseUrlSave response:', response)
        if (!this.editBaseUrl.endsWith('/')) {
          this.editBaseUrl += '/'
        }
        this.baseUrl = this.editBaseUrl
        localStorage.setItem('baseUrl', this.baseUrl)
        this.editBaseUrlAlert = false
      }).catch(err => {
        console.log('error!', err)
        this.editBaseUrlAlert = true
      })
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

  .input-box {
    margin: 20px 0;
  }
</style>
