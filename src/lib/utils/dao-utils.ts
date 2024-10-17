export function getPageProps(page: number, pageSize: number, args?: object) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return { ...args, skip: skip, take: take };
}
