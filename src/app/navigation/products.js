import { ShoppingCartIcon} from '@heroicons/react/24/outline';
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from 'constants/app.constant'

const ROOT_PRODUCTS = '/productsSession'

const path = (root, item) => `${root}${item}`;

export const productsSession = {
    id: 'products',
    type: NAV_TYPE_ROOT,
    path: ROOT_PRODUCTS,
    title: 'Produtos',
    transKey: 'Produtos',
    Icon: ShoppingCartIcon,
    childs: [
        {
            id: 'products.products',
            path: path(ROOT_PRODUCTS, '/products'),
            type: NAV_TYPE_ITEM,
            title: 'Produtos',
            transKey: 'Produtos',
            Icon: ShoppingCartIcon,
        },
    ]
}
