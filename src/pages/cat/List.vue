<template>
  <section class="cat-list">

<!-- 可作参考 https://github.com/jerry9022/LitAdmin -->

<el-container>
	<!-- 顶栏 -->
	<el-header style="text-align: right; line-height: 60px;">
      <el-dropdown @command="handleSettingDropdown">
      	<span class="el-dorpdown-link">
					王小虎
        	<i class="el-icon-setting" style="margin-right: 15px"></i>
				</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="e">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
	<!-- /顶栏 -->

	<el-container>
		<!-- 侧边栏 -->
		<el-aside>

			<el-menu default-active="4" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
				<el-menu-item index="4">
					<i class="el-icon-menu"></i>
					<span slot="title">图片管理</span>
				</el-menu-item>
			</el-menu>

		</el-aside>
		<!-- /侧边栏 -->

		<el-container>
			<!-- 主内容 -->
			<el-main>
				<div class="container el-row">
					<div class="waterfall el-col el-col-24">
						<div class="el-card item is-always-shadow" style="padding: 0px;" v-for="(item, index) in result_list" :key="item.id">

							<img :style="{backgroundImage:'url('+item.picUrl+')'}" class="image"
							v-preview="item.picUrl"
							preview-title-enable="true"
							preview-nav-enable="true">

							<div style="padding: 14px;">
								<div class="bottom clearfix">
									<el-button icon="el-icon-search" circle @click="openImage(this, item.picUrl)"></el-button>
									<el-button type="danger" icon="el-icon-delete" circle @click="deletePicture(index)"></el-button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="list" v-for="(n, index) in imageList" :data-index="index">
  <img @click="open($event)" :src="n.url">
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
import fancyBox from 'vue-fancybox'
export default {
  name: 'List',
  mounted() {
    this.listCats();
  },
  data () {
    return {
    	activeIndex: '1', // 顶部导航选中项
    	isCollapse: false, // 侧边栏是否折叠
      currentPage: 1, // 当前页
      pageSize: 20, // 每页记录数
      totalSize: 1000, // 总记录数
			result_list: [],
			imagePreview: [
			],
			imageList: [
        { width: 900, height: 675, url: 'http://ocm0knkb1.bkt.clouddn.com/1-1.jpg' },
        { width: 601, height: 1024, url: 'http://ocm0knkb1.bkt.clouddn.com/1-2.jpg' },
        { width: 1024, height: 8024, url: 'https://img1.soor.com.cn/11/20180208/abefe5714b7dd3c4ac4dfad552e204722faf6ab64cba8-dDEc0U.png' }
      ]
    }
  },
  methods: {
    deletePicture(index) { // 移除图片
    	this.$confirm('确认删除图片？')
          .then(_ => {
            // 以post形式提交
            this.$http.post('/cat/delete', this.result_list[index]).then(
              data=> {
                if (data.code == 200) {
                  this.result_list.splice(index, 1);
                }
              }
            )
          })
          .catch(_ => {});
    },
    handlePageSizeChange(val) {
      this.pageSize = val;
      this.listCats();
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.listCats();
    },
    handleOpen(key, keyPath) {
      // TODO 打开侧边栏
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // TODO 收起侧边栏
        console.log(key, keyPath);
      },
    listCats() {
      this.result_list = [];
      // 以post形式提交
      this.$http.post('/cat/list', {state: 1, page: this.currentPage, pageSize: this.pageSize}).then(
        data=> {
          if (data.code == 200) {
            //  数据获取成功
            this.result_list = data.result;
            this.totalSize = data.total;
          }
        }
      )
		},
		handleSettingDropdown(command) {
			switch (command) {
				case 'e':
					this.logout();
					break;
			}
		},
		logout() {
    	this.$confirm('确认退出？')
          .then(_ => {
						sessionStorage.removeItem('user');
        		location.href = '/';
          })
          .catch(_ => {});
		},
		openImage(e, targetUrl) {
			console.log("openImage . ." + e.target);


			let u = { width: 900, height: 675, url: targetUrl };

			this.imagePreview.push(u);

			console.log("openImage . ." + this.imagePreview + " . . . " + u.url);

			let imageList = [
        { width: 900, height: 675, url: 'http://ocm0knkb1.bkt.clouddn.com/1-1.jpg' },
        { width: 601, height: 1024, url: 'http://ocm0knkb1.bkt.clouddn.com/1-2.jpg' },
        { width: 1024, height: 700, url: 'http://ocm0knkb1.bkt.clouddn.com/1-3.jpg' }
      ];

			fancyBox(e, imageList);
		},
		open (e) {
      fancyBox(e.target, this.imageList);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cat-list {
	
	.el-header {
		border: 1px solid #e6e6e6;
	}

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
		height: 250px;
		background-position: center;
		background-size: cover;
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
}
</style>
