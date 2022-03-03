import type { BaseObject, BaseObjectKey } from '../utils';
export declare type MetaGetter = () => BaseObject;
export declare type MetasMap = Map<BaseObjectKey, MetaGetter | BaseObject>;
export declare type Meta = BaseObject | (() => {
    [key: BaseObjectKey]: MetaGetter | BaseObject;
});
export declare type MetasValue = BaseObject;
export interface Metas {
    add: (key: string, getter: MetaGetter) => void;
    map: MetasMap;
    remove: (key: string) => void;
    value: MetasValue;
}
