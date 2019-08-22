<template>
  <div>
    <v-dialog
      v-model="checkPropertyDialog"
      persistent
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-toolbar class="pt-3" color="primary" dark>
        <v-btn icon @click="checkPropertyDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-bold">导入数据</v-toolbar-title>
      </v-toolbar>
      <v-card flat>
        <v-stepper v-model="checkDuplicationStep" vertical>
          <v-stepper-step :complete="checkDuplicationStep > 1" step="1"
            >导入数据</v-stepper-step
          >

          <v-stepper-content step="1">
            <v-layout wrap>
              <v-flex
                xs12
                sm6
                md6
                v-for="(item, index) in importHeaders"
                :key="index"
              >
                <v-select
                  v-model="importHeaderMatcher[index]"
                  :items="headerList"
                  :label="item.name"
                />
              </v-flex>
            </v-layout>
            <v-btn
              color="primary"
              @click="checkDuplicationStep = 2"
              :disabled="importHeaderMatcher.length < importHeaders.length"
              >下一步</v-btn
            >
          </v-stepper-content>

          <v-stepper-step :complete="checkDuplicationStep > 2" step="2"
            >查重</v-stepper-step
          >

          <v-stepper-content step="2">
            <v-select
              v-model="checkDuplicationProperty"
              :items="importHeaderMatcher"
              label="选择要查重的属性"
              outline
            />
            <v-btn color="primary" @click="matchProperty">下一步</v-btn>
            <v-btn @click="checkDuplicationStep = 1" flat>返回</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="checkDuplicationStep > 3" step="3"
            >处理重复数据</v-stepper-step
          >

          <v-stepper-content step="3">
            <div v-for="(item, index) in duplicationListNew" :key="index">
              <v-layout wrap>
                <v-flex>
                  <h3>新表信息</h3>
                  <v-card flat>
                    <h3>{{}}</h3>
                    <ul class="pt-2">
                      <li v-for="(item2, index2) in headerList" :key="index2">
                        {{
                          `${item2.text} : ${
                            duplicationListNew[index][item2.value]
                          }`
                        }}
                      </li>
                    </ul>
                    <v-checkbox
                      color="primary"
                      v-model="duplicationListCheckBox[index]"
                    />
                  </v-card>
                </v-flex>
                <v-flex>
                  <h3>旧表信息</h3>
                  <v-card
                    flat
                    v-for="(item2, index2) in duplicationList[index]"
                    :key="index2"
                  >
                    <ul class="pt-2">
                      <li v-for="(item3, index3) in headerList" :key="index3">
                        {{
                          `${item3.text} : ${
                            duplicationList[index][index2][item3.value]
                          }`
                        }}
                      </li>
                    </ul>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-divider v-if="index < duplicationListNew.length" />
            </div>
            <v-btn
              color="primary"
              @click="finishCheckProperty"
              :disabled="matchingProperty === false"
              >完成</v-btn
            >
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="editDialog"
      persistent
      max-width="500px"
      transition="fade-transition"
    >
      <v-card>
        <v-toolbar dense flat>
          <h3>{{ formTitle }}</h3>
        </v-toolbar>

        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex
              xs12
              sm6
              md6
              v-for="(item, index) in headerList"
              :key="index"
            >
              <v-text-field
                box
                v-model="editedItem[item.value]"
                :label="item.text"
              />
            </v-flex>
          </v-layout>
        </v-container>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" flat @click="close">取消</v-btn>
          <v-btn color="primary" flat @click="save">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="rankManageDialog"
      max-width="500px"
      transition="fade-transition"
    >
      <v-card>
        <v-toolbar flat>
          <h3>管理此表格中的列</h3>
          <v-spacer />
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon ripple @click="addPropertyItem" v-on="on">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>添加新的列</span>
          </v-tooltip>
        </v-toolbar>
        <v-container grid-list-md>
          <v-list>
            <v-layout wrap>
              <v-flex
                xs12
                sm6
                md6
                v-for="(item, index) in propertyList"
                :key="index"
              >
                <v-list-tile>
                  <v-list-tile-content @click="changeRankItem(item)">
                    <v-list-tile-title>{{ item.value }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{ item.key }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple @click="delPropertyItem(item)">
                      <v-icon color="grey lighten-1">cancel</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-flex>
            </v-layout>
          </v-list>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="rankChangeDialog"
      persistent
      max-width="500px"
      transition="fade-transition"
    >
      <v-card>
        <v-toolbar dense flat>
          <h3>{{ nowEditMode === 'create' ? '新建列' : '修改列' }}</h3>
          <v-spacer />
        </v-toolbar>
        <v-container grid-list-md>
          <v-text-field box v-model="nowEditItem.key" label="数据库属性名称" />
          <v-text-field box v-model="nowEditItem.value" label="中文名称" />
          <v-select
            box
            v-model="nowEditItem.type"
            :items="['TEXT', 'INTEGER']"
            label="数据类型"
          />
        </v-container>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" flat @click="rankChangeDialog = false"
            >取消</v-btn
          >
          <v-btn
            color="primary"
            flat
            @click="handleAddProperty"
            v-if="nowEditMode === 'create'"
            >确定</v-btn
          >
          <v-btn
            color="primary"
            flat
            @click="changePropertyItem"
            v-if="nowEditMode === 'change'"
            >保存</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="chooseSheetDialog"
      persistent
      max-width="300px"
      transition="fade-transition"
    >
      <v-card>
        <v-card-title>
          <span class="headline">选择要导入的表</span>
          <v-spacer />
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-radio-group v-model="nowChooseSheet">
            <v-radio
              v-for="n in sheetNamesArray.length"
              :key="n"
              :label="`${sheetNamesArray[n - 1]}`"
              :value="n"
            />
          </v-radio-group>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" flat @click="chooseSheetDialog = false"
            >取消</v-btn
          >
          <v-btn color="primary" flat @click="readSheet">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-text-field
      box
      class="ma-3"
      v-model="search"
      prepend-icon="search"
      label="搜索"
      single-line
      hide-details
    />
    <v-card class="ma-3">
      <v-toolbar flat color="primary" dense>
        <v-menu
          v-model="tableListMenu"
          :close-on-content-click="false"
          :nudge-width="100"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-btn flat dark v-on="on">表格{{ currentTable }}</v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-tile
                v-for="(item, index) in tableListItems"
                :key="index"
                @click="switchTable(item.id)"
              >
                <v-list-tile-title>表格{{ item.id }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
        <v-btn
          flat
          dark
          @click="manageRank"
          v-if="$store.state.hasWritePermission"
          >管理列</v-btn
        >
        <v-btn
          flat
          dark
          @click="insertData"
          v-if="$store.state.hasWritePermission"
          >新建行</v-btn
        >
        <v-btn flat dark @click="uploadFile">导入数据</v-btn>
        <v-btn
          flat
          dark
          @click="exportData"
          :loading="exporting"
          :disabled="exporting"
          >导出数据</v-btn
        >
        <input
          style="display: none"
          ref="fileinput"
          type="file"
          @change="readExcel"
        />
      </v-toolbar>
      <v-data-table
        :headers="subjectHeaders"
        :items="subject"
        :search="search"
        :loading="isTableLoading"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td v-for="(item, index) in headerList" :key="index">
            {{ props.item[item.value] }}
          </td>
          <td class="justify-center layout px-0" margin:0>
            <v-icon small class="mr-2" @click="handleEditItem(props.item)"
              >edit</v-icon
            >
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Picbody from '../components/Picbody'
export default {
  data () {
    return {
      dialog: false
    }
  },
  components: {
    Picbody,
  }
}
</script>