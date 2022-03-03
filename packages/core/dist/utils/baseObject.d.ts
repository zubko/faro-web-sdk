export declare type BaseObjectKey = string | number;
export declare type BaseObjectValue = string | number | boolean | null | undefined | BaseObject | BaseObjectValue[];
export interface BaseObject {
    [key: BaseObjectKey]: BaseObjectValue;
}
