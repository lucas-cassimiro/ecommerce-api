import { Client } from 'minio'
import { randomUUID } from 'crypto'
import path from 'path'
import { Storage, UploadFileParams } from '../../domain/protocols/storage'

export class MinioStorage implements Storage {
  constructor(
    private readonly client: Client,
    private readonly bucket: string,
  ) {}

  private generateFileName(originalName?: string): string {
    const timestamp = Date.now()
    const uuid = randomUUID()

    if (originalName) {
      const extension = path.extname(originalName)
      return `${timestamp}-${uuid}${extension}`
    }

    return `${timestamp}-${uuid}`
  }

  async upload({ buffer, fileName, mimetype }: UploadFileParams): Promise<string> {
    const exists = await this.client.bucketExists(this.bucket)
    if (!exists) await this.client.makeBucket(this.bucket, '')

    const generatedFileName = this.generateFileName(fileName)

    const metaData: Record<string, any> = {
      'Content-Type': mimetype,
    }

    await this.client.putObject(this.bucket, generatedFileName, buffer, metaData as any)

    const baseUrl = process.env.MINIO_BASE_URL || 'http://localhost:9000'
    return `${baseUrl}/${this.bucket}/${generatedFileName}`
  }

  async deleteFile(fileName: string): Promise<void> {
    await this.client.removeObject(this.bucket, fileName)
  }
}
