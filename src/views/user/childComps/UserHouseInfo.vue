<template>
  <div class="house-info">
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- 详细地址 -->
            <el-form-item label="详细地址：">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <!-- 租金 -->
            <el-form-item label="租金：">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <!-- 户型 -->
            <el-form-item label="户型：">
              <span>{{ props.row.house_standard }}</span>
            </el-form-item>
            <!-- 方式 -->
            <el-form-item label="方式：">
              <span>{{ props.row.mode }}</span>
            </el-form-item>
            <!-- 类型 -->
            <el-form-item label="类型：">
              <span>{{ props.row.type_ }}</span>
            </el-form-item>
            <!-- 朝向 -->
            <el-form-item label="朝向：">
              <span>{{ props.row.orientation }}</span>
            </el-form-item>
            <!-- 建筑面积 -->
            <el-form-item label="建筑面积：">
              <span>{{ props.row.build_area }}</span>
            </el-form-item>
            <!-- 联系电话 -->
            <el-form-item label="联系电话：">
              <span>{{ props.row.telephone }}</span>
            </el-form-item>
            <!-- 房源来自 -->
            <el-form-item label="房源来自：">
              <span>{{ props.row.resource_from }}</span>
            </el-form-item>
            <!-- 地铁线 -->
            <el-form-item label="地铁线：">
              <span>{{ props.row.subway_num }}</span>
            </el-form-item>
            <!-- 距离地铁 -->
            <el-form-item label="距离地铁：">
              <span>{{ props.row.subway_distance }}</span>
            </el-form-item>
            <!-- 学校 -->
            <el-form-item label="学校：">
              <span>{{ props.row.school_type }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 房源 ID -->
      <el-table-column label="房源 ID" prop="uuid"> </el-table-column>
      <!-- 房源描述 -->
      <el-table-column label="房源描述" prop="description"> </el-table-column>
      <!-- 房源地址 -->
      <el-table-column algin="center" label="房源地址" prop="city">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="outHouse(scope.$index, tableData)"
            type="text"
            size="small"
          >
            退房
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRentHouse, postCancelRent } from "../../../network/user";
export default {
  name: "UserHouseInfo",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    // 获取租房房源信息
    getRentHouse()
      .then((res) => {
        console.log(res.data);
        this.tableData = res.data;
        console.log(this.tableData);
      })
      .catch(() => {
        console.log("获取房源信息失败");
      });
  },
  methods: {
    // 监听退房按钮点击
    outHouse(index, rows) {
      this.$confirm("是否确定退房?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送取消租房请求
          postCancelRent(rows[index].uuid)
            .then((res) => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "退房成功!",
                });
                rows.splice(index, 1);
              } else {
                this.$message({
                  type: "error",
                  message: res.data.error,
                });
              }
            })
            .catch((err) => {
              console.log("退房失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退房",
          });
        });
    },
  },
};
</script>

<style scoped>
.house-info {
  width: 1000px;
  margin: 0 15%;
}
.demo-table-expand {
  padding-left: 30px;
  font-size: 0;
}
.el-table /deep/.demo-table-expand label {
  font-weight: 700;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
