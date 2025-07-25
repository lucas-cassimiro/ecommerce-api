export interface UploadFileParams {
    buffer: Buffer
    fileName?: string
    mimetype?: string
}

export interface Storage {
    upload(params: UploadFileParams): Promise<string>
    deleteFile(filePath: string): Promise<void>
}
