<template>
  <div class="collect">
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- 租房用户 -->
            <el-form-item label="租房用户：">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <!-- 租房用户电话 -->
            <el-form-item label="租房用户电话：">
              <span>{{ props.row.user_telephone }}</span>
            </el-form-item>
            <!-- 详细地址 -->
            <el-form-item label="详细地址：">
              <span>{{ props.row.house_address }}</span>
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
              <span>{{ props.row.house_telephone }}</span>
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
      <!-- 房源ID -->
      <el-table-column label="房源 ID" prop="uuid"> </el-table-column>
      <!-- 房源描述 -->
      <el-table-column label="房源描述" prop="description"> </el-table-column>
      <!-- 房源地址 -->
      <el-table-column label="房源地址" prop="city"> </el-table-column>
      <el-table-column fixed="right" label="状态" width="120">
        <el-tag>已租出</el-tag>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRentHouseByuid } from "../../../network/admin";
export default {
  name: "LoginHouse",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    // 获取房源状态信息
    getRentHouseByuid()
      .then((res) => {
        this.tableData = res.data;
      })
      .catch(() => {
        console.log("获取房源状态失败");
      });
  },
};
</script>

<style scoped>
.collect {
  width: 1000px;
}
.demo-table-expand {
  padding-left: 30px;
  font-size: 0;
}
.el-table /deep/ .demo-table-expand label {
  text-align: right;
  font-weight: 700;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
