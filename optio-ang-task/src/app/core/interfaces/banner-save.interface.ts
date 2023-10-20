export interface SaveBanner {
    id?: string,
    name: string,
    channelId: string,
    zoneId: string,
    priority: number,
    fileId: string,
    url: string,
    startDate: string,
    endDate?: string,
    active: boolean,
    labels?: string[],
    language: string,
}

export interface editedData {
    fileId: string,
    startDate: string,
    endDate?: string,
    labels?: string,
}