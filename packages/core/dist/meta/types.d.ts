import type { BaseObject, BaseObjectKey } from '../utils';
export declare type MetaGetter = () => BaseObject;
export declare type MetaMap = Map<BaseObjectKey, MetaGetter>;
export interface MetaMapLike {
    [key: BaseObjectKey]: MetaGetter;
}
export declare type MetaValues = BaseObject;
export interface Meta {
    add: (key: string, getter: MetaGetter) => void;
    map: MetaMap;
    remove: (key: string) => void;
    values: MetaValues;
}
