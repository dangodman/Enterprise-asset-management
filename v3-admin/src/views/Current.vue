<template>
  <div class="fixed-container">
    <div class="fixed-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Approved by">
          <el-input
            v-model="formInline.user"
            placeholder="Approved by"
            clearable
          />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select
            v-model="formInline.region"
            placeholder="Activity zone"
            clearable
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-date-picker
            v-model="formInline.date"
            type="date"
            placeholder="Pick a date"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="fixed-table">
      <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="资产id" prop="id" />
        <el-table-column label="资产名称" prop="name" />
        <el-table-column label="资产类型" prop="type" />
        <el-table-column label="图片">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <img style="width: 100px; height: 100px" :src="scope.row.image" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="资产数量" prop="number" />
        <el-table-column label="总计价格(万元)" prop="price" />
        <el-table-column label="状态" prop="state" />
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="default"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-button
              size="default"
              @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="default"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background="white"
        layout="prev, pager, next"
        :total="100"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { reactive } from "vue";
import { fixedList } from "../api/user.js";

const formInline = reactive({
  user: "",
  region: "",
  date: "",
});

const onSubmit = () => {
  console.log("submit!");
};
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (index, row) => {
  console.log(index, row);
};
let tableData = ref([]);
onMounted(async () => {
  const { data } = await fixedList();
  tableData.value = data;
});
</script>
<style lang="less" scoped>
.fixed-container {
  height: cal(100vh-60px);
  padding: 20px;
  border-radius: 5px;
  .fixed-form {
    height: 230px;
  }
  .fixed-table {
    position: relative;
    height: 500px;
    background: #fff;
    .pagination {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
}

.demo-form-inline .el-input {
  --el-input-width: 400px;
}

.demo-form-inline .el-select {
  --el-select-width: 400px;
}
</style>
