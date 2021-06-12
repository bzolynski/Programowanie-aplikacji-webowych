export interface IRepository<T> {
	create(entity: T): Promise<void>;
	update(id: string, entity: T): Promise<void>;
	delete(id: string): Promise<void>;
	get(id: string): Promise<T>;
	getAll(): Promise<T[]>;
}
