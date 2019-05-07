<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <el-submenu :index="item.index" :key="item.index">
          <template slot="title">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
              <template slot="title">{{ subItem.title }}</template>
              <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                {{ threeItem.title }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from './bus'
export default {
  name: 'InterfaceLayout',
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-yb-connect',
          index: 'connection',
          title: '连接',
          subs: [
            {
              index: 'Qps',
              title: 'QPS'
            },
            {
              index: 'Tps',
              title: 'TPS'
            },
            {
              index: 'Max_connections',
              title: '最大连接数'
            },
            {
              index: 'Threads_connected',
              title: '当前打开连接数'
            }
          ]
        },
        {
          icon: 'el-icon-yb-visit',
          index: 'visit',
          title: '访问',
          subs: [
            {
              index: 'Select_scan',
              title: '全表扫描数'
            },
            {
              index: 'Slow_queries',
              title: '慢查询数'
            },
            {
              index: 'Com_select',
              title: '查询数'
            },
            {
              index: 'Com_update',
              title: '更新数'
            },
            {
              index: 'Com_delete',
              title: '删除数'
            },
            {
              index: 'Com_insert',
              title: '插入数'
            },
            {
              index: 'Handler_write',
              title: '覆盖数'
            }
          ]
        },
        {
          icon: 'el-icon-yb-table',
          index: 'table',
          title: '表格',
          subs: [
            {
              index: 'Created_tmp_tables',
              title: '临时表数量'
            },
            {
              index: 'Innodb_row_lock_waits',
              title: '等待锁表次数'
            }
          ]
        },
        {
          icon: 'el-icon-yb-InnoDB',
          index: 'InnoDB',
          title: 'InnoDB',
          subs: [
            {
              index: 'Utilize',
              title: '利用率'
            },
            {
              index: 'Hit',
              title: '读命中率'
            },
            {
              index: 'Innodb_data_reads',
              title: '读磁盘数量'
            },
            {
              index: 'Innodb_data_writes',
              title: '写磁盘数量'
            },
            {
              index: 'Innodb_data_fsyncs',
              title: 'Fsync'
            },
            {
              index: 'Open_tables',
              title: '打开表数量'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom:0;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar{
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse){
    width: 200px;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
