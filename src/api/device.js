import fetch from '@/utils/request'


/**
 *
 * @param deleted
 * @param pageNum
 * @param pageSize
 */
export function getUserDeviceList(query) {
    return fetch({
        url: '/productmanage/products',
        method: "post",
        data: query
    })
}
