export function checkLimitAndOffset(limit: any, offset: any): [number, number] {
    let l = Number(limit)
    let o = Number(offset)

    if (isNaN(l)) {
        l = 20
    }

    if (isNaN(o)) {
        o = 0
    }

    return [l, o]
}