<template>
  <div class="collect">
    <!-- 收藏夹展示 -->
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
            <!-- 地铁 -->
            <el-form-item label="地铁：">
              <span>{{ props.row.subway_num }}</span>
            </el-form-item>
            <!-- 距离地铁 -->
            <el-form-item label="距离地铁：">
              <span>{{ props.row.subway_distance }}</span>
            </el-form-item>
            <!-- 学习 -->
            <el-form-item label="学校：">
              <span>{{ props.row.school_type }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="房源 ID" prop="uuid"> </el-table-column>
      <el-table-column label="房源描述" prop="description"> </el-table-column>
      <el-table-column label="房源地址" prop="city"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="outCollect(scope.$index, tableData)"
            type="text"
            size="small"
          >
            取消收藏
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCollection, postCancelCollection } from "../../../network/user";
export default {
  name: "UserCollect",
  data() {
    return {
      tableData: [
        {
          uuid: "",
          description: "",
          city: "",
          address: "",
          price: "",
          house_standard: "",
          mode: "",
          type_: "",
          orientation: "",
          build_area: "",
          telephone: "",
          resource_from: "",
          subway_num: "",
          subway_distance: "",
          school_type: "",
        },
      ],
    };
  },
  methods: {
    // 取消收藏
    outCollect(index, rows) {
      this.$confirm("是否确定取消收藏?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送取消收藏请求
          postCancelCollection(rows[index].uuid)
            .then((res) => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "取消收藏成功!",
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
              console.log(err);
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
  created() {
    // 刚创建时，获取收藏夹信息
    console.log(this.tableData);
    getCollection()
      .then((res) => {
        this.tableData = res.data;
        console.log(this.tableData);
      })
      .catch((err) => {
        console.log("获取收藏夹信息失败");
      });
  },
};
</script>

<style scoped>
.collect {
  width: 800px;
  margin: 0 15%;
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
