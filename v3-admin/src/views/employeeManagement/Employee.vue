<template>
  <div class="container">
    <div>
      <vxe-toolbar>
        <template #buttons>
          <vxe-button
            status="primary"
            icon="vxe-icon-square-plus"
            @click="insertEvent()"
            >新增</vxe-button
          >
        </template>
      </vxe-toolbar>

      <vxe-table
        border
        show-overflow
        ref="xTable"
        :column-config="{ resizable: true }"
        :row-config="{ isHover: true }"
        :data="tableData"
        @cell-dblclick="cellDBLClickEvent"
      >
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="姓名"></vxe-column>
        <vxe-column field="sex" title="性别"></vxe-column>
        <vxe-column field="age" title="年龄"></vxe-column>
        <vxe-column field="phone" title="联系电话"></vxe-column>
        <vxe-column field="department" title="所属部门"></vxe-column>
        <vxe-column field="position" title="职位"></vxe-column>
        <vxe-column field="salary" title="薪资(万元)"></vxe-column>
        <vxe-column title="操作" width="100" show-overflow>
          <template #default="{ row }">
            <vxe-button
              type="text"
              icon="vxe-icon-edit"
              @click="editEvent(row)"
            ></vxe-button>
            <vxe-button
              type="text"
              icon="vxe-icon-delete"
              @click="removeEvent(row)"
            ></vxe-button>
          </template>
        </vxe-column>
      </vxe-table>

      <vxe-modal
        v-model="showEdit"
        :title="selectRow ? '编辑&保存' : '新增&保存'"
        width="800"
        min-width="600"
        min-height="300"
        :loading="submitLoading"
        resize
        destroy-on-close
      >
        <template #default>
          <vxe-form
            :data="formData"
            :rules="formRules"
            title-align="right"
            title-width="100"
            @submit="submitEvent"
          >
            <vxe-form-item
              field="name"
              title="姓名"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.name"
                  placeholder="请输入姓名"
                ></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="sex"
              title="性别"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-select v-model="data.sex" transfer>
                  <vxe-option
                    v-for="item in stateList"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>

            <vxe-form-item
              field="age"
              title="年龄"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.age"
                  placeholder="请输入年龄"
                ></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="phone"
              title="联系方式"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.phone"
                  placeholder="请输入联系电话"
                ></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="department"
              title="所属部门"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.department"
                  placeholder="请输入所属部门"
                ></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="position"
              title="职位"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.position"
                  placeholder="请输入职位"
                ></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="salary"
              title="薪资"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.salary"
                  placeholder="请输入薪资"
                ></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item align="center" title-align="left" :span="24">
              <template #default>
                <vxe-button type="submit">提交</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>

      <vxe-pager
        background
        v-model:current-page="pageVO2.currentPage"
        v-model:page-size="pageVO2.pageSize"
        :total="pageVO2.total"
        :layouts="[
          'Home',
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'End',
          'Sizes',
          'FullJump',
          'Total',
        ]"
        @page-change="pageChangeEvent2"
      >
      </vxe-pager>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, inject } from "vue";
import { VXETable } from "vxe-table";
import {
  employeesList,
  employeesAdd,
  employeesEdit,
  employeesDelete,
} from "../../api/employee.js";
let key = inject("key");
const xTable = ref();
const list = ref();
const formData = reactive({
  name: "",
  sex: "",
  age: "",
  phone: "",
  department: "",
  position: "",
  salary: "",
});
const submitLoading = ref(false);
const showEdit = ref(false);
const selectRow = ref();
const tableData = ref([]);
const stateList = ref([
  { label: "男", value: "男" },
  { label: "女", value: "女" },
]);
const formRules = reactive({
  name: [
    {
      required: true,
      message: "请输入姓名",
    },
  ],
  sex: [
    {
      required: true,
      message: "请选择性别",
    },
  ],
  age: [
    {
      required: true,
      message: "请输入年龄",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入联系电话",
    },
  ],
  department: [
    {
      required: true,
      message: "请输入所属部门",
    },
  ],
  position: [
    {
      required: true,
      message: "请输入职位",
    },
  ],
  salary: [
    {
      required: true,
      message: "请输入薪资",
    },
  ],
});
const insertEvent = () => {
  selectRow.value = null;
  showEdit.value = true;
};
const editEvent = (row) => {
  Object.assign(formData, row);
  selectRow.value = row;
  showEdit.value = true;
};
const cellDBLClickEvent = ({ row }) => {
  editEvent(row);
};
const removeEvent = async (row) => {
  const type = await VXETable.modal.confirm("您确定要删除该数据?");
  if (type === "confirm") {
    const data = await employeesDelete(row);
    if (data.code === "200") {
      VXETable.modal.message({ content: "删除成功", status: "success" });
      key.value++;
    }
  }
};
const submitEvent = async () => {
  submitLoading.value = true;
  if (selectRow.value) {
    const data = await employeesEdit(formData);
    if (data.code === "200") {
      submitLoading.value = false;
      showEdit.value = false;
      VXETable.modal.message({ content: "修改成功", status: "success" });
      key.value++;
    }
  } else {
    const data = await employeesAdd(formData);
    if (data.code === "200") {
      submitLoading.value = false;
      showEdit.value = false;
      VXETable.modal.message({ content: "添加成功", status: "success" });
      key.value++;
    }
  }
};
onMounted(async () => {
  const { data } = await employeesList();
  tableData.value = data.slice(0, pageVO2.pageSize - 1);
  pageVO2.total = data.length;
  console.log("数据", data);
});
const pageVO2 = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});
const pageChangeEvent2 = () => {
  tableData.value = list.value.slice(
    (pageVO2.currentPage - 1) * pageVO2.pageSize,
    pageVO2.currentPage * pageVO2.pageSize
  );
};
</script>

<style lang="less" scoped>
.container {
  height: cal(100vh-60px);
  padding: 20px;
  border-radius: 5px;
}
:deep(.vxe-cell) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
