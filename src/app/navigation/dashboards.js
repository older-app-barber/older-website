import {HomeIcon} from '@heroicons/react/24/outline';
import DashboardsIcon from 'assets/dualicons/dashboards.svg?react'
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from 'constants/app.constant'

const ROOT_DASHBOARDS = '/dashboards'

const path = (root, item) => `${root}${item}`;

export const dashboards = {
    id: 'portal',
    type: NAV_TYPE_ROOT,
    path: '/dashboards',
    title: 'portal',
    transKey: 'Portal',
    Icon: DashboardsIcon,
    childs: [
        {
            id: 'dashboards.home',
            path: path(ROOT_DASHBOARDS, '/home'),
            type: NAV_TYPE_ITEM,
            title: 'Início',
            transKey: 'nav.dashboards.home',
            Icon: HomeIcon,
        },

    ]
}
