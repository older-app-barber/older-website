// Import Dependencies
import { TbPalette } from "react-icons/tb";

// Local Imports
import SettingIcon from "assets/dualicons/setting.svg?react";
import { NAV_TYPE_ITEM } from "constants/app.constant";

// ----------------------------------------------------------------------

export const settings = {
    id: 'settings',
    type: NAV_TYPE_ITEM,
    path: '/settings',
    title: 'Configurações',
    transKey: 'nav.settings.settings',
    Icon: SettingIcon,
    childs: [
        // {
        //     id: 'general',
        //     type: NAV_TYPE_ITEM,
        //     path: '/settings/general',
        //     title: 'Geral',
        //     transKey: 'nav.settings.general',
        //     Icon: UserIcon,
        // },
        {
            id: 'appearance',
            type: NAV_TYPE_ITEM,
            path: '/settings/appearance',
            title: 'Aparência',
            transKey: 'nav.settings.appearance',
            Icon: TbPalette,
        },
    ]
}