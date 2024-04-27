<template>
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
      <vxe-column field="state" title="办理状态"></vxe-column>
      <vxe-column field="orderNumber" title="维修单号"></vxe-column>
      <vxe-column field="date" title="业务日期">
        <template #default="{ row }">
          {{ row.date.slice(0, 10) }}
        </template>
      </vxe-column>
      <vxe-column field="processor" title="处理人"></vxe-column>
      <vxe-column field="repair" title="报修人"></vxe-column>
      <vxe-column field="spend" title="维修花费"></vxe-column>
      <vxe-column field="remark" title="备注"></vxe-column>
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
            field="state"
            title="办理状态"
            :span="12"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-select v-model="data.state" transfer>
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
            field="orderNumber"
            title="维修单号"
            :span="12"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.orderNumber"
                placeholder="请输入维修单号"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="date"
            title="维修日期"
            :span="12"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.date"
                type="date"
                placeholder="请选择日期"
                transfer
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="processor"
            title="处理人"
            :span="12"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.processor"
                placeholder="请输入处理人"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="repair"
            title="报修人"
            :span="12"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.repair"
                placeholder="请输入报修人"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="spend"
            title="维修花费"
            :span="12"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.spend"
                placeholder="请输入维修花费"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="remark"
            title="备注"
            :span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.remark"
                placeholder="请输入备注"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
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
</template>

<script setup>
import { reactive, ref, onMounted, inject } from "vue";
import { VXETable } from "vxe-table";
import {
  informationList,
  informationAdd,
  informationEdit,
  informationDelete,
} from "../api/info.js";
let key = inject("key");
const xTable = ref();
const list = ref();
const formData = reactive({
  state: "",
  orderNumber: "",
  date: "",
  processor: "",
  repair: "",
  spend: "",
  remark: "",
});
const submitLoading = ref(false);
const showEdit = ref(false);
const selectRow = ref();
const tableData = ref([]);
const stateList = ref([
  { label: "已审批", value: "已审批" },
  { label: "未审批", value: "未审批" },
]);
const formRules = reactive({
  state: [
    {
      required: true,
      message: "请选择办理状态",
    },
  ],
  orderNumber: [
    {
      required: true,
      message: "请输入维修单号",
    },
  ],
  date: [
    {
      required: true,
      message: "请选择维修日期",
    },
  ],
  processor: [
    {
      required: true,
      message: "请输入处理人",
    },
  ],
  repair: [
    {
      required: true,
      message: "请输入报修人",
    },
  ],
  spend: [
    {
      required: true,
      message: "请输入维修花费",
    },
  ],
  remark: [
    {
      required: true,
      message: "请输入备注",
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
    const data = await informationDelete(row);
    if (data.code === "200") {
      VXETable.modal.message({ content: "删除成功", status: "success" });
      key.value++;
    }
  }
};
const submitEvent = async () => {
  submitLoading.value = true;
  if (selectRow.value) {
    const data = await informationEdit(formData);
    if (data.code === "200") {
      submitLoading.value = false;
      showEdit.value = false;
      VXETable.modal.message({ content: "修改成功", status: "success" });
      key.value++;
    }
  } else {
    const data = await informationAdd(formData);
    if (data.code === "200") {
      submitLoading.value = false;
      showEdit.value = false;
      VXETable.modal.message({ content: "添加成功", status: "success" });
      key.value++;
    }
  }
};
onMounted(async () => {
  const { data } = await informationList();
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
:deep(.vxe-cell) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
