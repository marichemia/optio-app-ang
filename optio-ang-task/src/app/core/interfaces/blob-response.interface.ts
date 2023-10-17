export interface BlobResponse {
    data: {
        id: string,
        fileName: string,
        mimeType: string,
        fileSize: number,
        createdAt: string
    },
    success: boolean
}