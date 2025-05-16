export default interface IPaginatedResponse<T> {
    data: T[];
    totalCount: number;
    totalPage: number;
}

export enum UserRoles {
    ADMIN = "admin",
    USER = "user",
}
