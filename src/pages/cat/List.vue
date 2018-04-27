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

        <div class="pagination">
            <el-pagination
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, total, jumper"
                background
                :total="total"
                @current-change="listCats">
            </el-pagination>
        </div>


  </div>
</template>

<script>
export default {
  name: 'CatList',
  data () {
    return {
      currentPage: 1, // 当前页码
      pageSize: 30,
      total: 0,
      msg: 'cat list',
      result_list: []
    }
  },
  mounted() {
    this.listCats();
  },
  methods: {
    listCats() {
      let _this = this;
      // 以post形式提交
      // this.$http.post('/cat/list',params).then(
      this.$http.post('/cat/list', {state: 1, page: this.currentPage, pageSize: this.pageSize}).then(
        data=> {
          if (data.status == 200) {
            //  数据获取成功
            _this.result_list = data.data;
            _this.total = data.total;
          } else {
            console.log("数据获取失败 . . " + data.msg);
          }
        }
      )
    }
  }
}
</script>

<style lang="scss">

</style>
