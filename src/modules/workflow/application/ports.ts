export interface KeyValueStorageService<T> {
  set(key: string, value: T): void;
  get(key: string): T | null;
  remove(key: string): void;
}

export interface StoreService<T> {
  get(): T | null;

  save(value: T): void;

  remove(key: string): void;
}

export interface AsyncStoreService<T> {
  get(): Promise<T | null>;

  save(value: T): Promise<void>;

  remove(key: string): void;
}

export type FormStoreService = StoreService<any>;
