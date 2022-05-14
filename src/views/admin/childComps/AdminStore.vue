<template>
  <div class="house-info">
    <el-table :data="tableData" max-height="800" border style="width: 100%">
      <!-- 商家ID -->
      <el-table-column prop="uid" align="center" label="ID" width="80">
      </el-table-column>
      <!-- 商家用户名 -->
      <el-table-column
        prop="username"
        align="center"
        label="用户名"
        width="120"
      >
      </el-table-column>
      <!-- 商家密码 -->
      <el-table-column align="center" prop="password" label="密码" width="100">
      </el-table-column>
      <!-- 商家性别 -->
      <el-table-column align="center" prop="gender" label="性别" width="100">
      </el-table-column>
      <!-- 商家年龄 -->
      <el-table-column align="center" prop="age" label="年龄" width="100">
      </el-table-column>
      <!-- 商家电话 -->
      <el-table-column align="center" prop="telephone" label="电话" width="140">
      </el-table-column>
      <!-- 商家地址 -->
      <el-table-column align="center" prop="address" width="230" label="地址">
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <!-- 删除该商家 -->
          <el-button
            @click.native.prevent="outStore(scope.$index, tableData)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllStore, postDeleteUser } from "../../../network/admin";
export default {
  name: "AdminStore",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    // 获取所有商家信息
    getAllStore()
      .then((res) => {
        this.tableData = res.data;
      })
      .catch((err) => {
        console.log("获取所有商家信息失败", err);
      });
  },
  methods: {
    outStore(index, rows) {
      this.$confirm("是否确定移除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 请求删除该商家 传递该商家的uid
          postDeleteUser(rows[index].uid)
            .then((res) => {
              if (res.data.success) {
                rows.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "移除成功!",
                });
              }
            })
            .catch((err) => {
              console.log("移除商家失败！", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>

<style scoped>
.house-info {
  width: 1000px;
}
</style>
