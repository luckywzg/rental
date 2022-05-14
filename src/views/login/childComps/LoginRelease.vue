<template>
  <div class="house-info">
    <el-table :data="tableData" style="width: 100%" max-height="800">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- 房源描述 -->
            <el-form-item label="房源描述：">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <!-- 房源地址 -->
            <el-form-item label="房源地址：">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <!-- 详细地址 -->
            <el-form-item label="详细地址：">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <!-- 租金 -->
            <el-form-item label="租金：">
              <span>{{ props.row.price }} (元/月)</span>
            </el-form-item>
            <!-- 户型 -->
            <el-form-item label="户型：">
              <span>{{ props.row.type_ }}</span>
            </el-form-item>
            <!-- 方式 -->
            <el-form-item label="方式：">
              <span>{{ props.row.mode }}</span>
            </el-form-item>
            <!-- 类型 -->
            <el-form-item label="类型：">
              <span>{{ props.row.house_standard }}</span>
            </el-form-item>
            <!-- 朝向 -->
            <el-form-item label="朝向：">
              <span>{{ props.row.orientation }}</span>
            </el-form-item>
            <!-- 建筑面积 -->
            <el-form-item label="建筑面积：">
              <span>{{ props.row.build_area }} (m²)</span>
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
              <span>{{ props.row.subway_distance }} (m)</span>
            </el-form-item>
            <!-- 学校 -->
            <el-form-item label="学校：">
              <span>{{ props.row.school_type }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 房源ID -->
      <el-table-column label="房源 ID" prop="uuid" width="auto">
      </el-table-column>
      <!-- 房源描述 -->
      <el-table-column label="房源描述" align="center" prop="description">
      </el-table-column>
      <!-- 房源地址 -->
      <el-table-column label="房源地址" prop="city" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <!-- 删除按钮 -->
          <el-button
            @click.native.prevent="outHouse(scope.$index, tableData)"
            type="text"
            size="small"
          >
            移除
          </el-button>
          <!-- 编辑按钮 -->
          <el-button
            @click.native.prevent="houseEdit(scope.$index, tableData)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <!-- 编辑按钮控制弹框 -->
          <el-dialog
            class="dialog"
            title="提示"
            :visible.sync="dialogVisible"
            width="59%"
            :before-close="handleClose"
            center
            :append-to-body="true"
          >
            <div class="edit clear-fix">
              <!-- 编辑表单 -->
              <login-edit :editData="editData" ref="edit"></login-edit>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getReleases, postDeleteReleaseHouse } from "../../../network/admin";
import LoginEdit from "./LoginEdit.vue";
export default {
  components: { LoginEdit },
  name: "LoginRelease",
  data() {
    return {
      editIndex: 0,
      isEdit: false,
      editData: {},
      rightHeader: [
        {
          label: "详细地址：",
          key: "address",
        },
        {
          label: "租金：",
          key: "price",
        },
        {
          label: "户型",
          key: "type_",
        },
        {
          label: "方式：",
          key: "mode",
        },
        {
          label: "类型：",
          key: "house_standard",
        },
        {
          label: "朝向：",
          key: "orientation",
        },
        {
          label: "建筑面积：",
          key: "build_area",
        },
        {
          label: "联系电话：",
          key: "telephone",
        },
        {
          label: "房源来自：",
          key: "resource_from",
        },
        {
          label: "地铁：",
          key: "subway_num",
        },
        {
          label: "距离地铁：",
          key: "subway_distance",
        },
        {
          label: "学校：",
          key: "school_type",
        },
      ],
      dialogVisible: false,
      tableData: [],
    };
  },
  mounted() {
    // 获取我的发布，已发布房源信息失败
    getReleases()
      .then((res) => {
        this.tableData = res.data;
      })
      .catch((err) => {
        console.log("获取我的发布数据失败", err);
      });
  },
  methods: {
    // 监听删除按钮点击
    outHouse(index, rows) {
      this.$confirm("是否确定移除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求删除已发布的房源信息
          postDeleteReleaseHouse(rows[index].uuid)
            .then((res) => {
              if (res.data.success) {
                rows.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "移除成功!",
                });
              }
              if (res.data.error) {
                this.$message({
                  type: "error",
                  message: res.data.error,
                });
              }
            })
            .catch((err) => {
              console.log("移除失败!", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除",
          });
        });
    },
    // 编辑按钮打开弹框
    houseEdit(index, rows) {
      this.editIndex = index;
      this.editData = rows[index];
      this.dialogVisible = true;
    },
    // 关闭弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          // 关闭时编辑表单内容是否修改
          if (this.$refs.edit.success) {
            // 修改了则同步更新
            this.tableData[this.editIndex] = this.$refs.edit.ruleForm;
          }
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
.edit {
  padding-top: 30px;
}
.house-info {
  width: 1000px;
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
