import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import login from '../components/login'
import Qps from '../components/pages/connection/Qps'
import MaxConnection from '../components/pages/connection/Maxconnection'
import Tps from '../components/pages/connection/Tps'
import CurrentConnection from '../components/pages/connection/CurrentConnection'
import AllScan from '../components/pages/visit/AllScan'
import SlowQuery from '../components/pages/visit/SlowQuery'
import Queries from '../components/pages/visit/Queries'
import Updates from '../components/pages/visit/Updates'
import Deletes from '../components/pages/visit/Deletes'
import Inserts from '../components/pages/visit/Inserts'
import Overwrites from '../components/pages/visit/Overwrites'
import TmpTable from '../components/pages/table/TmpTable'
import LockWaits from '../components/pages/table/LockWaits'
import Utilize from '../components/pages/InnoDB/Utilize'
import Hit from '../components/pages/InnoDB/Hit'
import ReadDisk from '../components/pages/InnoDB/ReadDisk'
import WriteDisk from '../components/pages/InnoDB/WriteDisk'
import Fsync from '../components/pages/InnoDB/Fsync'
import OpenTable from '../components/pages/InnoDB/OpenTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      // created automatically
      path: '/login',
      name: 'HelloWorld',
      component: login
    },
    {
      // home page
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Qps',
          component: Qps
        },
        {
          path: '/Tps',
          component: Tps
        },
        {
          path: '/Max_connections',
          component: MaxConnection
        },
        {
          path: '/Threads_connected',
          component: CurrentConnection
        },
        {
          path: '/Select_scan',
          component: AllScan
        },
        {
          path: '/Slow_queries',
          component: SlowQuery
        },
        {
          path: '/Com_select',
          component: Queries
        },
        {
          path: '/Com_update',
          component: Updates
        },
        {
          path: '/Com_delete',
          component: Deletes
        },
        {
          path: '/Com_insert',
          component: Inserts
        },
        {
          path: '/Handler_write',
          component: Overwrites
        },
        {
          path: '/Created_tmp_tables',
          component: TmpTable
        },
        {
          path: '/Innodb_row_lock_waits',
          component: LockWaits
        },
        {
          path: '/Utilize',
          component: Utilize
        },
        {
          path: '/Hit',
          component: Hit
        },
        {
          path: '/Innodb_data_reads',
          component: ReadDisk
        },
        {
          path: '/Innodb_data_writes',
          component: WriteDisk
        },
        {
          path: '/Innodb_data_fsyncs',
          component: Fsync
        },
        {
          path: '/Open_tables',
          component: OpenTable
        }
      ]
    }
  ]
})
