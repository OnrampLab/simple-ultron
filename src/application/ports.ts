export interface KeyValueStorageService<T> {
  set(key: string, value: T): void;
  get(key: string): T | null;
}

export interface StoreService<T> {
  get(): T | null;

  save(value: T): void;
}

export interface AsyncStoreService<T> {
  get(): Promise<T | null>;

  save(value: T): Promise<void>;
}

export type FormStoreService = StoreService<any>;
