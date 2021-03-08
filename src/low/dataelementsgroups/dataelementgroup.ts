import {Serializable} from "../serializable.ts";
import {DataElement} from "../dataelements/mod.ts";
// @ts-ignore
import {zipWith, Constructable} from "https://raw.githubusercontent.com/danielr1996/match/main/match.ts";

/**
 * Combination of related DataElements
 * For more information see volume [Formals] Section B.2 "Nachrichtenelemente" of the FinTS 3.0 specification
 */
export abstract class DataElementGroup<T> implements Serializable<T> {
    abstract deserialize(str: string): T
    deserializeArray(str: string): any[] {
        return [];
    }
    abstract serialize(): string

    /**
     * Serializes an array of DataElements in a DataElementGroup
     * For more information see volume [Formals] Section H 1.2 "Nachrichtenaufbau" of the FinTS 3.0 specification
     * @param dataElements
     */
    protected static serializeDataElements(dataElements: DataElement<unknown>[]): string {
        return dataElements.map(de => de.serialize()).join(':').replace(/:$/, '');
    }

    /**
     * Deserializes an array of DataElements in a DataElementGroup
     * For more information see volume [Formals] Section H 1.2 "Nachrichtenaufbau" of the FinTS 3.0 specification
     * @param str
     * @param types
     */
    protected static deserializeDataElements(str: string, types: Constructable<DataElement<unknown>>[]): DataElement<unknown>[] {
        const rawArray = str.split(':');
        // @ts-ignore
        return zipWith(rawArray, types, (str, type) => Object.create(type.prototype).deserialize(str));
    }
}
