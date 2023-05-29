import { KeyValueStorageService } from '../../application/ports';

export class LocalStorageAdapter<T> implements KeyValueStorageService<T> {
  set(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): T | null {
    const json = localStorage.getItem(key) as string;

    try {
      const object = JSON.parse(json);

      return json ? (object as T) : null;
    } catch (error) {
      return json as T;
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
