import fs from "fs/promises";

type SortRecords<T> = (records: T[]) => T[];
type MutateRecords<T> = (records: T[]) => T[];

export class JsonRepository<T extends { id: string }> {
  private cache: T[] | null = null;
  private pendingWrite: Promise<void> = Promise.resolve();

  constructor(
    private readonly filePath: string,
    private readonly sortRecords: SortRecords<T> = (records) => records
  ) {}

  async list(): Promise<T[]> {
    const records = await this.read();
    return this.sortRecords([...records]);
  }

  async findById(id: string): Promise<T | undefined> {
    const records = await this.read();
    return records.find((record) => record.id === id);
  }

  async create(record: T): Promise<T> {
    await this.mutate((records) => [...records, record]);
    return record;
  }

  async update(id: string, updateRecord: (record: T) => T): Promise<T | undefined> {
    let updatedRecord: T | undefined;

    await this.mutate((records) =>
      records.map((record) => {
        if (record.id !== id) {
          return record;
        }

        const nextRecord = updateRecord(record);
        updatedRecord = nextRecord;
        return nextRecord;
      })
    );

    return updatedRecord;
  }

  async delete(id: string): Promise<boolean> {
    let deleted = false;

    await this.mutate((records) => {
      const nextRecords = records.filter((record) => record.id !== id);
      deleted = nextRecords.length !== records.length;
      return nextRecords;
    });

    return deleted;
  }

  private async read(): Promise<T[]> {
    if (this.cache) {
      return this.cache;
    }

    const fileContents = await fs.readFile(this.filePath, "utf8");
    this.cache = JSON.parse(fileContents) as T[];
    return this.cache;
  }

  private async mutate(mutator: MutateRecords<T>): Promise<void> {
    const operation = this.pendingWrite.then(async () => {
      const currentRecords = await this.read();
      const nextRecords = mutator([...currentRecords]);

      this.cache = nextRecords;
      await fs.writeFile(this.filePath, `${JSON.stringify(nextRecords, null, 2)}\n`);
    });

    this.pendingWrite = operation.catch(() => undefined);
    await operation;
  }
}
