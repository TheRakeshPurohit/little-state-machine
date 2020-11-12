import { STORE_DEFAULT_NAME } from '../constants';
import getStoreData from './getBrowserStoreData';
import { MiddleWare } from '../types';

export default class StoreFactory {
  public name: string = STORE_DEFAULT_NAME;
  public storageType: Storage;
  public store: unknown = undefined;
  public middleWares: MiddleWare[] = [];

  constructor(name: string, isClient: boolean) {
    this.storageType =
      isClient && typeof sessionStorage !== 'undefined'
        ? window.sessionStorage
        : {
            getItem: (payload) => payload,
            setItem: (payload: string) => payload,
            clear: () => {},
            length: 0,
            key: (payload: number) => payload.toString(),
            removeItem: () => {},
          };
    this.name = name;
  }

  updateStore<T>(defaultValues: T) {
    return getStoreData(this.storageType, this.name) || defaultValues;
  }

  updateMiddleWares(middleWares: MiddleWare[]) {
    return (this.middleWares = middleWares);
  }
}
