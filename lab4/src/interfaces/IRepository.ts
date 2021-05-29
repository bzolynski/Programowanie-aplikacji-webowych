export interface IRepository<T> {
	create(entity: T): void;
	update(id: string, entity: T): void;
	delete(id: string): void;
	get(id: string): T;
	getAll(): T[];
}
