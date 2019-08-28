<template>
  <v-col>
    <v-card width="600px" class="mx-auto">
      <div class="text-center" style="padding-top: 10px;font-size: 20px;">合同书</div>
      <v-card-text style="text-align: left">
        甲方姓名(出租方)：
        <u>__{{ partyA }}__</u> 身份证号码：
        <u>__3303033303003030__</u>
        <br />乙方姓名(承租方)：
        <u>__{{ partyB }}__</u> 身份证号码：
        <u>__3333333333333333__</u>
        <br />经双方协商甲方将位于
        <u>__{{ address }}__</u>的房屋
        <u>__{{ name }}__</u>出租给乙方居住使用。
        <br />一、租房从
        <u>__{{ indate }}__</u>起至
        <u>__{{ outdate }}__</u>止。
        <br />二、租金为
        <u>__{{ price }}__</u>元。
        <br />三、约定事项
        <br />1、乙方入住时，应及时更换门锁若发生意外与甲方无关。因不慎或使用不当引起火灾、电、气灾害等非自然灾害所造成损失由乙方负责。
        <br />2、乙方无权转租、转借、转卖该房屋，及屋内家具家电，不得擅自改动房屋结构，爱护屋内设施，如有人为原因造成破损丢失应维修完好，否则照价赔偿。并做好防火，防盗，防漏水，和阳台摆放、花盆的安全工作，若造成损失责任自负。
        <br />3、乙方必须按时缴纳房租，否则视为乙方违约。协议终止。
        <br />4、乙方应遵守居住区内各项规章制度，按时缴纳水、电、气、光纤、电话、物业管理等费用。乙方交保证金
        <u>__100__</u>
        元给甲方，乙方退房时交清水，电，气，光纤和物业管理等费用及屋内设施家具、家电无损坏，下水管道，厕所无堵漏。甲方如数退还保证金。
        <br />5、甲方保证该房屋无产权纠纷。如遇拆迁，乙方无条件搬出，已交租金甲方按未满天数退还。
        <br />6、备注：
        <u>__{{ message }}__</u>
        <br />四、本合同一式两份，甲乙双方各存一份，自双方签字之日起生效。
        <br />甲方签章(出租方)：
        <u>__{{ partyA }}__</u>
        <br />乙方签章(承租方)：
        <u>__{{ partyB }}__</u>
        <br />2019年8月28日
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      partyA: "HUYK",
      partyB: "BunNiu",
      name: "宝宝房",
      address: "北京",
      indate: "2019-08-30",
      outdate: "2019-09-30",
      price: 9999,
      message: "无"
    };
  }
};
</script>

<style>
</style>