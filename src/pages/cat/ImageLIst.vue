<template>
  <section class="list">

<!-- 可作参考 https://github.com/jerry9022/LitAdmin -->

<el-container>
	<!-- 顶栏 -->
	<el-header style="text-align: right; line-height: 60px;">
      <el-dropdown>
      <span>王小虎</span>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
	<!-- /顶栏 -->

	<el-container>
		<!-- 侧边栏 -->
		<el-aside>

			<el-menu default-active="1-4-1" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span slot="title">导航一</span>
					</template>
					<el-menu-item-group>
						<span slot="title">分组一</span>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-2">选项2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="分组2">
						<el-menu-item index="1-3">选项3</el-menu-item>
					</el-menu-item-group>
					<el-submenu index="1-4">
						<span slot="title">选项4</span>
						<el-menu-item index="1-4-1">选项1</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="2">
					<i class="el-icon-menu"></i>
					<span slot="title">导航二</span>
				</el-menu-item>
				<el-menu-item index="3" disabled>
					<i class="el-icon-document"></i>
					<span slot="title">导航三</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-setting"></i>
					<span slot="title">导航四</span>
				</el-menu-item>
			</el-menu>

		</el-aside>
		<!-- /侧边栏 -->

		<el-container>
			<!-- 主内容 -->
			<el-main>
				<div class="container el-row">
					<div class="waterfall el-col el-col-24">
						<div class="el-card item is-always-shadow" style="padding: 0px;" v-for="(item, index) in result_list">
							<img :src="item.picUrl" class="image">
							<div style="padding: 14px;">
								<div class="bottom clearfix">
									<el-button icon="el-icon-search" circle></el-button>
									<el-button type="danger" icon="el-icon-delete" circle @click="deletePicture(index)"></el-button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<el-pagination
					:page-size="pageSize"
					:page-sizes="[20, 50, 100]"
					:pager-count="11"
					layout="prev, pager, next, total, sizes, jumper"
					:total="totalSize"
					@size-change="handlePageSizeChange"
					@current-change="handleCurrentPageChange">
				</el-pagination>
			</el-main>
			<!-- 主内容 -->

			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
</el-container>









  </section>
</template>

<script>
export default {
  name: 'List',
  mounted() {

  },
  data () {
    return {
    	activeIndex: '1', // 顶部导航选中项
    	isCollapse: false, // 侧边栏是否折叠
      currentPage: 1, // 当前页
      pageSize: 20, // 每页记录数
      totalSize: 1000, // 总记录数
      result_list: [
      	{
      		id: 1,
      		picUrl: 'http://f.hiphotos.baidu.com/image/pic/item/3ac79f3df8dcd1007fde3f4e7e8b4710b9122f1b.jpg'
      	},
      	{
      		id: 2,
      		picUrl: 'http://d.hiphotos.baidu.com/image/pic/item/bd315c6034a85edff62cdd7045540923dc5475c4.jpg'
      	},
      	{
      		id: 3,
      		picUrl: 'http://e.hiphotos.baidu.com/image/h%3D300/sign=67599edcdd58ccbf04bcb33a29d9bcd4/aa18972bd40735fa324a79d792510fb30f240821.jpg'
      	},
      	{
      		id: 4,
      		picUrl: 'http://h.hiphotos.baidu.com/image/pic/item/21a4462309f790525fe7185100f3d7ca7acbd5e1.jpg'
      	},
      	{
      		id: 5,
      		picUrl: 'http://c.hiphotos.baidu.com/image/pic/item/5243fbf2b21193138277eddd69380cd791238da2.jpg'
      	},
      	{
      		id: 1,
      		picUrl: 'http://f.hiphotos.baidu.com/image/pic/item/3ac79f3df8dcd1007fde3f4e7e8b4710b9122f1b.jpg'
      	},
      	{
      		id: 2,
      		picUrl: 'http://d.hiphotos.baidu.com/image/pic/item/bd315c6034a85edff62cdd7045540923dc5475c4.jpg'
      	},
      	{
      		id: 3,
      		picUrl: 'http://e.hiphotos.baidu.com/image/h%3D300/sign=67599edcdd58ccbf04bcb33a29d9bcd4/aa18972bd40735fa324a79d792510fb30f240821.jpg'
      	},
      	{
      		id: 4,
      		picUrl: 'http://c.hiphotos.baidu.com/image/pic/item/5243fbf2b21193138277eddd69380cd791238da2.jpg'
      	},
      	{
      		id: 5,
      		picUrl: 'http://h.hiphotos.baidu.com/image/pic/item/21a4462309f790525fe7185100f3d7ca7acbd5e1.jpg'
      	}
      ]
    }
  },
  methods: {
    deletePicture(index) { // 移除图片

    	this.$confirm('确认删除图片？')
          .then(_ => {
          	this.result_list.splice(index, 1);
          })
          .catch(_ => {});
    },
    handlePageSizeChange(val) {
    	console.log(`每页 ${val} 条`);
    },
    handleCurrentPageChange(val) {
    	console.log(`当前页: ${val}`);
    },
    handleNavMenuSelect(key, keyPath) {
    	console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-col {
	margin: 10px;
}

.el-card__body {
	padding: 0px
}

.time {
	font-size: 13px;
	color: #999;
}

.bottom {
	margin-top: 13px;
	line-height: 12px;
}

.button {
	padding: 0;
	float: right;
}

.image {
	width: 100%;
	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}

.clearfix:after {
	clear: both
}


/*大层*/
.container{
	width:90%;
	margin: 0 auto;
}
/*瀑布流层*/
.waterfall{
	-moz-column-count:5; /* Firefox */
	-webkit-column-count:5; /* Safari 和 Chrome */
	column-count:5; /* 用整数值来定义列数。不允许负值 */
	-moz-column-gap: 1em;
	-webkit-column-gap: 1em;
	column-gap: 1em; /*用长度值来定义列与列之间的间隙。不允许负值*/
}
/*一个内容层*/
.item{
	margin: 0 0 1em 0;
	-moz-page-break-inside: avoid;
	-webkit-column-break-inside: avoid;
	break-inside: avoid;
}
</style>
