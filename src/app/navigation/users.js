import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from 'constants/app.constant'
import { UsersIcon } from '@heroicons/react/24/outline'

const ROOT_USERS = '/usersSession'

const path = (root, item) => `${root}${item}`

export const users = {
    id: 'users',
    type: NAV_TYPE_ROOT,
    path: ROOT_USERS,
    title: 'Usuários',
    transKey: 'Usuários',
    Icon: UsersIcon,
    childs: [
        {
            id: 'users.users',
            path: path(ROOT_USERS, '/users'),
            type: NAV_TYPE_ITEM,
            title: 'Usuários',
            transKey: 'Usuários',
            Icon: UsersIcon,
        },
    ],
}
