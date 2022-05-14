<template>
  <div class="house-info">
    <el-table :data="tableData" max-height="800" border style="width: 100%">
      <!-- 用户ID -->
      <el-table-column prop="uid" align="center" label="ID" width="80">
      </el-table-column>
      <!-- 用户名 -->
      <el-table-column
        prop="username"
        align="center"
        label="用户名"
        width="120"
      >
      </el-table-column>
      <!-- 用户密码 -->
      <el-table-column prop="password" label="密码" align="center" width="100">
      </el-table-column>
      <!-- 用户性别 -->
      <el-table-column prop="gender" label="性别" align="center" width="80">
      </el-table-column>
      <!-- 年龄 -->
      <el-table-column prop="age" label="年龄" align="center" width="80">
      </el-table-column>
      <!-- 电话 -->
      <el-table-column prop="telephone" align="center" label="电话" width="140">
      </el-table-column>
      <!-- 地址 -->
      <el-table-column prop="address" width="230" align="center" label="地址">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <!-- 删除该用户 -->
          <el-button
            @click.native.prevent="outUser(scope.$index, tableData)"
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
import { getAllUser, postDeleteUser } from "../../../network/admin";
export default {
  name: "AdminUser",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    // 获取所有用户信息
    getAllUser()
      .then((res) => {
        this.tableData = res.data;
      })
      .catch((err) => {
        console.log("获取所有用户数据失败", err);
      });
  },
  methods: {
    // 监听删除用户按钮点击
    outUser(index, rows) {
      this.$confirm("是否确定移除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求 删除该用户 传递该用户uid
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
              console.log("删除用户失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除",
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
