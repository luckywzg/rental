<template>
  <div class="business w">
    <el-row>
      <el-col :span="24" :offset="0" class="info">
        <h5 @click="infoClick1" :class="{ active: isActive1 }">报名人员管理</h5>
        <h5 @click="infoClick2" :class="{ active: isActive2 }">推广情况统计</h5>
      </el-col>
    </el-row>
    <el-row class="info-bot">
      <el-col :span="24" :offset="0" class="info-show">
        <h5>推广招募情况：</h5>
        <div
          :class="{ state: index == 3 }"
          class="info-item"
          v-for="(item, index) in infoList"
          :key="index"
        >
          <p :class="{ itemP: index == 3 }" class="info-content">
            {{ item[0] }}
          </p>
          <p v-show="index !== 3" class="info-num">{{ item[1] | topercent(index)}}</p>
          <div v-show="index == 3" class="info-state-bot">
            <el-button class="left" plain type="primary" size="small"
              >发布/暂停</el-button
            >
            <el-button class="right" plain type="danger" size="small"
              >完成</el-button
            >
          </div>
        </div>
        <!-- <div class="info-state">
          <p class="state-content">招募状态：未发布/发布/已完成</p>
          <div class="info-state-bot">
            <el-button class="left" plain type="primary" size="small"
              >发布/暂停</el-button
            >
            <el-button class="right" plain type="danger" size="small"
              >完成</el-button
            >
          </div>
        </div> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col class="table-info" :span="24" :offset="0">
        <h5>报名成员列表：</h5>
        <div>
          状态：<el-input
            v-model="input1"
            placeholder="默认全部，请选择"
            size="normal"
            clearable
          ></el-input>
        </div>
        <el-table
          :header-cell-style="{ background: '#D7D7D7' }"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column align="center" prop="num" label="序号" width="80">
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column
            align="center"
            prop="area"
            label="推广区域"
            width="140"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="finsh"
            label="计划完成份数"
            width="140"
          >
          </el-table-column>
          <el-table-column align="center" prop="state" label="状态" width="120">
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateStart"
            label="报名时间"
            width="140"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateEnd"
            label="处理时间"
            width="140"
          >
          </el-table-column>
          <el-table-column align="center" prop="address" label="操作">
            <el-button size="default">详情</el-button>
            <el-button size="default">录取</el-button>
            <el-button size="default">不录取</el-button>
          </el-table-column>
        </el-table>
        <el-pagination
          class="right"
          background
          layout="prev, pager, next"
          :total="50"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :offset="0" class="task">
        <ul>
          <li
            @click="liClick(index)"
            :class="{ active: taskIndex === index }"
            v-for="(item, index) in taskList"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="task-content" :span="24" :offset="0">
        <span class="content-info">发布人姓名：</span>
        <el-input
          v-model="input2"
          placeholder="请输入姓名"
          size="normal"
          clearable
        ></el-input>
        <span class="content-info">任务类型：</span>
        <el-input
          v-model="input3"
          placeholder="请选择类型"
          size="normal"
          clearable
          suffix-icon="el-icon-arrow-down"
          ><i></i
        ></el-input>
        <span class="content-info">任务状态：</span>
        <el-input
          v-model="input4"
          placeholder="请选择状态"
          size="normal"
          clearable
          suffix-icon="el-icon-arrow-down"
          ><i></i
        ></el-input>
        <el-button size="default">查询</el-button>
        <el-table
          :cell-style="{ borderColor: '#000' }"
          :header-cell-style="{ borderColor: '#000' }"
          :data="tableData"
          border
          class="task-table"
          style="width: 85%"
        >
          <el-table-column align="center" prop="num" label="序号" width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="任务名称"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="area"
            label="任务类型"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="finsh"
            label="发布人"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="state"
            label="任务周期"
            width="120"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="dateEnd"
            label="状态"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateStart"
            label="创建时间"
            width="140"
          >
          </el-table-column>
          <el-table-column
            class="last"
            align="center"
            prop="address"
            label="操作"
          >
            <el-button size="default">查看</el-button>
            <el-button size="default">执行</el-button>
            <el-button size="default" class="double">
              <p>完成</p>
              <p>提交</p>
            </el-button>
          </el-table-column>
        </el-table>
        <div class="footer">
          <h5>*备注</h5>
          <p>项目负责人：预算、方案设计、问卷设计、调查执行（执行负责人</p>
          <p>执行负责人：预算</p>
          <h5>*执行</h5>
          <p>方案设计：上传方案设计的文档、或者跳转到报告</p>
          <p>问卷设计：跳转到问卷管理页面</p>
          <p>数据分析：跳转到</p>
          <p>报告撰写：跳转到报告</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="three-info clear-fix" :span="24" :offset="0">
        <h5>导入列表</h5>
        <el-button size="default" class="btn">导入</el-button>
        <el-button size="default" class="btn">导入模板下载</el-button>
        <el-table
          :cell-style="{ borderColor: '#000' }"
          :header-cell-style="{ borderColor: '#000' }"
          :data="tableData"
          border
          class="three-table"
          style="width: 95%"
        >
          <el-table-column align="center" prop="num" label="序号" width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="导入名称"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="area"
            label="原始文件名"
            width="220"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="finsh"
            label="有效数"
            width="80"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="state"
            label="无效数"
            width="80"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="dateEnd"
            label="操作人员"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateStart"
            label="创建时间"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateStart"
            label="导入状态"
            width="100"
          >
          </el-table-column>
          <el-table-column
            class="last"
            align="center"
            prop="address"
            label="操作"
          >
            <el-button size="default">查看</el-button>
            <el-button size="default">日志</el-button>
            <el-button size="default">删除</el-button>
            <el-button size="default">短信通知</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="three-bot" :span="24" :offset="0">
        <h5>名单明细</h5>
        <div class="three-inp">
          <span class="three-bot-info">发布人姓名：</span>
          <el-input
            v-model="input2"
            placeholder="请输入姓名"
            size="normal"
            clearable
          ></el-input>
          <span class="three-bot-info">任务类型：</span>
          <el-input
            v-model="input3"
            placeholder="请选择类型"
            size="normal"
            clearable
            suffix-icon="el-icon-arrow-down"
            ><i></i
          ></el-input>
          <span class="three-bot-info">任务状态：</span>
          <el-input
            v-model="input4"
            placeholder="请选择状态"
            size="normal"
            clearable
            suffix-icon="el-icon-arrow-down"
            ><i></i
          ></el-input>
          <el-button size="default">搜索</el-button>
          <el-button size="default">添加</el-button>
          <el-button class="show" size="default">显示列</el-button>
        </div>
        <el-table
          :cell-style="{ borderColor: '#000' }"
          :header-cell-style="{ borderColor: '#000', background: '#F2F2F2' }"
          :data="tableData"
          border
          class="three-bot-table"
          style="width: 100%"
        >
          <el-table-column align="center" prop="num" label="序号" width="50">
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="70">
          </el-table-column>
          <el-table-column
            align="center"
            prop="area"
            label="手机号码"
            width="100"
          >
          </el-table-column>
          <el-table-column align="center" prop="finsh" label="地址" width="100">
          </el-table-column>
          <el-table-column align="center" prop="state" label="职务" width="70">
          </el-table-column>

          <el-table-column
            align="center"
            prop="dateEnd"
            label="擅长领域"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateEnd"
            label="演讲主题"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateEnd"
            label="备注1"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateEnd"
            label="备注2"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateStart"
            label="导入时间"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="dateEnd"
            label="短信通知状态"
            width="120"
          >
          </el-table-column>
          <el-table-column
            class="last"
            align="center"
            prop="address"
            label="操作"
          >
            <el-button size="default">执行</el-button>
            <el-button size="default">查看</el-button>
            <el-button size="default"> 删除 </el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Business",
  data() {
    return {
      infoList: [
        ["目标用户", "12000"],
        ["报名人数", "12533"],
        ["录用人数", "10878"],
        ["招募状态：未发布/发布/已完成", "发布/暂停", "完成"],
      ],
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      select: "",
      isActive1: true,
      isActive2: false,
      taskIndex: 0,
      tableData: [
        {
          num: 1,
          name: "小明",
          area: "广州",
          finsh: 100,
          state: "录取",
          dateStart: "2016-05-02",
          dateEnd: "2016-05-02",
        },
        {
          num: 1,
          name: "小明",
          area: "广州",
          finsh: 100,
          state: "录取",
          dateStart: "2016-05-02",
          dateEnd: "",
        },
        {
          num: 1,
          name: "小明",
          area: "广州",
          finsh: 100,
          state: "录取",
          dateStart: "2016-05-02",
          dateEnd: "2016-05-02",
        },
      ],
      taskList: ["项目任务", "研究任务", "执行任务", "复核任务"],
    };
  },
  methods: {
    infoClick1() {
      this.isActive1 = true;
      this.isActive2 = false;
    },
    infoClick2() {
      this.isActive1 = false;
      this.isActive2 = true;
    },
    liClick(index) {
      this.taskIndex = index;
    },
  },
  filters: {
        topercent(val, index) {
            if (index== 2||index==4) {
                return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+ '';
                //return val + '%'
            } else {
                return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                //return val
            }
        }
    },
};
</script>
<style scoped>
.business {
  padding-top: 50px;
}
h5 {
  color: #000;
}
.active {
  border-bottom: 1px solid #2780e9;
  color: #2780e9;
}
.info {
  text-align: left;
  padding-left: 10px;
}
.info h5 {
  display: inline-block;
  padding: 15px;
  cursor: pointer;
}
.info-bot {
  border: 1px solid #ddd;
}
.info-show {
  position: relative;
  text-align: left;
  padding: 20px 0 0 25px;
  margin-bottom: 45px;
}
.info-item {
  display: inline-block;
  height: 90px;
  margin: 25px 80px 0 0;
  border: 1px solid #868686;
  border-radius: 5px;
  padding: 16px 25px;
}
.info-show h5 {
  height: 22px;
  line-height: 22px;
}
.info-show h5::before {
  content: "";
  position: absolute;
  display: inline-block;
  width: 6px;
  height: 20px;
  left: 18px;
  background-color: #2780e9;
}
.info-item p {
  width: 150px;
}
.info-item .itemP {
  width: 190px;
  margin-bottom: 13px;
}
.info-item .info-content {
  font-size: 14px;
  color: #a1a1a1;
}
.info-item .info-num {
  font-weight: 700;
  font-size: 18px;
  margin-top: 3px;
}
.state {
  position: absolute;
  display: inline-block;
  height: 90px;
  border: 1px solid #c4a7b5;
}
.state-content {
  font-size: 14px;
}
.table-info {
  border: 1px solid #ddd;
  text-align: left;
  padding: 35px 25px;
  margin-top: 20px;
}
.table-info h5 {
  height: 22px;
  line-height: 22px;
  margin-bottom: 20px;
}
.table-info h5::before {
  content: "";
  position: absolute;
  display: inline-block;
  width: 6px;
  height: 20px;
  left: 18px;
  background-color: #2780e9;
}
.el-input {
  display: inline-block;
  width: 200px;
}
.el-table {
  margin-top: 40px;
  margin-bottom: 20px;
}
/deep/ .el-table thead {
  background-color: #f8f8f8;
}
.el-button {
  border-color: transparent;
}
/deep/ .el-pagination.is-background .el-pager li {
  background-color: #fff;
  border-color: #ddd;
}
/deep/ .el-pagination.is-background .btn-next {
  background-color: #fff;
  border-color: #ddd;
}
/deep/ .el-pagination.is-background .btn-prev {
  background-color: #fff;
  border-color: #ddd;
}
</style>
<style scoped>
/* 任务二 */
.task {
  text-align: left;
  padding-left: 10px;
}
.task ul li {
  float: left;
  font-size: 14px;
  padding: 15px 25px;
  cursor: pointer;
}
.task-content {
  text-align: left;
  padding: 30px 0 50px 15px;
  border: 1px solid #ddd;
}
.content-info {
  font-size: 14px;
  padding: 0 5px 0 25px;
}
.task-content .el-input {
  width: 150px;
}
.task-content .el-button {
  border-color: #ddd;
  margin-left: 50px;
  padding: 12px 30px;
}
.task-table {
  margin-left: 25px;
  background-color: #2780e9;
  border: 1px solid #000;
}
.task-content .task-table .el-button {
  float: left;
  padding: 10px 15px;
  margin-left: 10px;
  border-color: transparent;
  color: #5772a9;
}
.task-content .task-table .double {
  position: absolute;
  right: 20px;
  padding: 0 15px;
}
.double p {
  margin-bottom: 5px;
}
.footer {
  margin-left: 75px;
}
.footer h5 {
  color: #8f0c23;
  padding: 2px 0;
}
.footer p {
  font-size: 14px;
}
</style>
<style scoped>
/* 任务三 */
.three-info {
  border: 1px solid #ddd;
  text-align: left;
  padding: 35px 25px;
  margin-top: 20px;
}
.three-info h5 {
  height: 22px;
  line-height: 22px;
}
.three-info h5::before {
  content: "";
  position: absolute;
  display: inline-block;
  width: 6px;
  height: 20px;
  left: 18px;
  background-color: #2780e9;
}
.btn {
  float: right;
  width: 150px;
  background-color: #169bd6;
  color: #fff;
  margin-left: 50px;
}
.three-table {
  margin-top: 80px;
  margin-left: 25px;
  background-color: #2780e9;
  border: 1px solid #000;
}
.three-table .el-button {
  margin: 0;
  padding: 0 5px;
}
.three-bot {
  height: 800px;
  padding-left: 25px;
  margin-top: 20px;
  border: 1px solid #ddd;
}
.three-bot h5 {
  text-align: left;
  height: 22px;
  margin-top: 20px;
  line-height: 22px;
}
.three-bot h5::before {
  content: "";
  position: absolute;
  width: 6px;
  height: 20px;
  left: 18px;
  background-color: #2780e9;
}
.three-bot-table {
  border: 1px solid #000;
}
.three-inp {
  font-size: 14px;
  text-align: left;
}
.three-inp .el-input {
  margin-right: 15px;
  width: 150px;
  height: 26px;
}
.three-inp .el-button {
  background-color: #2780e9;
  color: #fff;
  padding: 10px 35px;
}
.three-inp .show {
  background-color: #eef7fe;
  color: #169bd6;
  border-color: #169bd6;
}
.three-bot-table .el-button {
  margin: 0;
  padding: 0 5px;
}
</style>
