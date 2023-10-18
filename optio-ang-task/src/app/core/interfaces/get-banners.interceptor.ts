export interface Banner {
    id?: string,
    name?: string,
    channelId?: string,
    isCorporate?: boolean,
    fileId?: string,
    language: string,
    zoneId: string,
    startDate: string,
    endDate?: string,
    modifiedAt?: string,
    createdAt?: string,
    url: string,
    active: boolean,
    priority: number,
    labels: string[],
    createdBy?: string,
    modifiedBy?: string,
}

export interface GetBannersRes {
    data: {
        total: number,
        entities: Banner[]
    },
    success: boolean
}