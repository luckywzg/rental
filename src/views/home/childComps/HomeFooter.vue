<template>
  <div class="footer">
    <div class="footer-content w">
      <el-row>
        <el-col :span="17" :offset="4">
          <div class="grid-content bg-purple clear-fix">
            <ul
              class="footer-ul"
              v-for="(item, index) in helpList"
              :key="index"
            >
              <li>
                <a href="#" @click="aClick">{{ item }}</a
                ><span v-show="index !== helpList.length - 1"> | </span>
              </li>
            </ul>
          </div>
          <p>如果大家在诀别之后走向更好的人生，那么在不在一起就不重要了。</p>
          <p>基于web的网络租房平台：该平台所有解释权归wzg所有</p>
          <p>
            董卿写过一句话：无论我们最后生疏成什么样子，曾经对你的好都是真的，就算终有一散，也别辜负相遇，希望你不后悔认识我，也是真的快乐过。如果能回到以前，我会选择不认识你，不是我后悔，是我不能面对现在的结局。
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeFooter",
  data() {
    return {
      helpList: [
        "关于我们",
        "网站合作",
        "联系我们",
        "意见反馈",
        "各地租房",
        "服务声明",
        "报案平台",
        "推广服务",
        "维权中心",
        "反欺诈联盟",
      ],
    };
  },
  methods: {
    aClick() {
      this.$message({
        type: "warning",
        message: "别点这里！！",
        offset: 600,
      });
    },
  },
};
</script>

<style scoped>
.footer-content {
  padding-bottom: 100px;
  text-align: center;
  /* background-color: aqua; */
}
.footer-ul li {
  float: left;
  font-size: 14px;
  padding: 20px 5px;
}
.footer-ul li span {
  padding-left: 8px;
}
.bg-purple {
  padding-left: 15px;
}
.el-col p {
  font-size: 14px;
  padding: 5px;
}
</style>
