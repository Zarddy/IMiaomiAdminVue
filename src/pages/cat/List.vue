// 图片列表

<template>
  <div class="cat-list">
    <h1>{{ msg }}</h1>

    <el-table
      :data="result_list"
      style="width: 100%">

      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>

      <el-table-column
        prop="randomDir"
        label="randomDir"
        width="180">
      </el-table-column>

      <el-table-column
        prop="picUrl"
        label="picUrl"
        width="180">
      </el-table-column>

      <el-table-column
        prop="source"
        label="source">
      </el-table-column>

    </el-table>



  </div>
</template>

<script>
export default {
  name: 'CatList',
  data () {
    return {
      mPage: 1,
      msg: 'cat list',
      result_list: []
    }
  },
  mounted() {
    this.listCats(this.mPage);
  },
  methods: {
    listCats(page) {
      let _this = this;
      let params = new FormData();
                    params.append("state", 1);
                    params.append("page", page);
                    // 以post形式提交
                    this.$http.post('/cat/list',params).then(
                        data=> {
                            if (data.status == 200) {
                                //  数据获取成功
                                _this.result_list = data.data;
                            }
                        }
                    )
    }
  }
}
</script>

<style lang="scss">

</style>
