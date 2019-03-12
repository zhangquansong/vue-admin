<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="产品名称" v-model="listQuery.productName" style="width: 180px;" class="filter-item"
                      @keyup.enter.native="handleFilter"/>
            <el-input placeholder="productSn" v-model="listQuery.productSn" style="width: 180px;" class="filter-item"
                      @keyup.enter.native="handleFilter"/>
            <el-input placeholder="procode" v-model="listQuery.procode" style="width: 180px;" class="filter-item"
                      @keyup.enter.native="handleFilter"/>
            <el-select v-model="listQuery.productType" placeholder="类型" class="filter-item" clearable
                       style="width: 120px" value="0">
                <el-option v-for=" item in deviceTypeOption" :key="item.key" :label="item.display_name"
                           :value="item.key"></el-option>
            </el-select>
            <el-select v-model="listQuery.productChannel" placeholder="通道" class="filter-item" clearable
                       style="width: 120px" value="0">
                <el-option v-for=" item in productChannelOption" :key="item.key" :label="item.display_name"
                           :value="item.key"></el-option>
            </el-select>

            <el-radio class="filter-item" v-model="listQuery.deleted" label="1" border>删除</el-radio>
            <el-radio class="filter-item" v-model="listQuery.deleted" label="0" border>正常</el-radio>

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索
            </el-button>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="showAddProductDiaLog">添加
            </el-button>
            <el-button v-waves class="filter-item" type="primary" @click="reset">重置</el-button>
        </div>
        <el-table :data="dataList"
                  :key="tableKey"
                  height="720"
                  v-loading.body="listLoading"
                  border fit highlight-current-row
                  style="width: 100%;">
            <el-table-column align="center" label="id" width="220">
                <template slot-scope="scope">
                    <span>{{scope.row.productSn}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品名称" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.productName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="procode" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.procode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="设备类型">
                <template slot-scope="scope">
                    <span>{{scope.row.productType}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="分类">
                <template slot-scope="scope">
                    <span>{{scope.row.categoryFirstName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="子分类">
                <template scope="scope">
                    <span>{{scope.row.categorySecondName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="通道">
                <template slot-scope="scope">
                    <span>{{scope.row.productChannel}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="品牌">
                <template slot-scope="scope">
                    <span>{{scope.row.productBrand}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="联网方式">
                <template scope="scope">
                    <span>{{scope.row.linkType}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="绑定方式">
                <template slot-scope="scope">
                    <span>{{scope.row.bindType}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createTime | formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间">
                <template slot-scope="scope">
                    <span>{{scope.row.modifyTime | formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="160">
                <template>
                    <el-button type="primary" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize"
                    @pagination="getList"/>


        <el-dialog title="产品添加" :visible.sync="dialogFormVisible" width="620px" center="true">
            <el-form ref="dataForm" lable-position="left" label-width="80px">
                <el-form-item label="产品名称:" prop="productName">
                    <el-input/>
                </el-form-item>
                <el-form-item label="产品类型:" prop="productType">
                    <el-select v-model="listQuery.productType" placeholder="产品类型" class="filter-item" clearable
                               value="0" style="width: 100%">
                        <el-option v-for=" item in deviceTypeOption" :key="item.key" :label="item.display_name"
                                   :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="通道:" prop="productType">
                    <el-select v-model="listQuery.productChannel" placeholder="通道" class="filter-item" clearable value="0" style="width: 100%">
                        <el-option v-for=" item in productChannelOption" :key="item.key" :label="item.display_name"
                                   :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import {getUserDeviceList} from '@/api/device'
    import waves from '@/directive/waves' // 自定义指令 用于按钮波纹效果
    import Pagination from '@/components/Pagination'//分页条
    import {formatUnixTimestamp} from '@/utils/index'

    //设备类型
    const deviceTypeOptionArray = [
        {key: '', display_name: '全部'},
        {key: 'GATEWAY', display_name: '网关设备'},
        {key: 'INDEPENDENT', display_name: '独立设备'},
        {key: 'SUB', display_name: '网关子设备'}
    ];

    //产品通道
    const productChannelOptionArray = [
        {key: '', display_name: '全部'},
        {key: 'ZJE', display_name: '筑家易'},
        {key: 'SHUNCOM', display_name: '顺舟'},
        {key: 'UIOT', display_name: '紫光'},
        {key: '"HOMELINK"', display_name: 'HOMELINK'}
    ];

    export default {
        directives: {waves},
        components: {Pagination},
        filters: {
            formatDate: function (v) {
                if (v) {
                    return formatUnixTimestamp(v);
                }
            }
        },
        data() {
            return {
                dataList: null,
                total: 0,
                tableKey: 0,
                listLoading: true,
                dialogFormVisible: false,
                deviceTypeOption: deviceTypeOptionArray,
                productChannelOption: productChannelOptionArray,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    productName: null,
                    productType: null,
                    deleted: "0",
                    productSn: null,
                    procode: null,
                    productChannel: null
                },
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                getUserDeviceList(this.listQuery).then(response => {
                    this.dataList = response.data.data.list;
                    this.total = response.data.data.totalSize;
                    setTimeout(() => {
                        this.listLoading = false;
                    }, 0.5 * 1000);
                })
            },
            handleFilter() {
                this.listQuery.pageNum = 1;
                this.getList()
            },
            reset() {
                this.listQuery.productName = '';
                this.listQuery.productType = '';
                this.listQuery.procode = '';
                this.listQuery.productSn = '';
                this.listQuery.deleted = '0';
                this.listQuery.productChannel = '';
            },
            showAddProductDiaLog() {
                this.dialogFormVisible = true
            }
        }
    }
</script>
