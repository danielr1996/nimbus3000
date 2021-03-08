import {SegmentHead} from "../dataelementsgroups/segmenthead.ts";
import {Serializable} from "../serializable.ts";
import {Alphanumeric, DataElement, Digit, Numeric} from "../dataelements/mod.ts";
import {DataElementGroup, MessageRef} from "../dataelementsgroups/mod.ts";
import {zip, Constructable} from "https://raw.githubusercontent.com/danielr1996/match/main/match.ts";
/**
 * Combination of related DataElements or DataElementGroups
 * For more information see volume [Formals] Section B.2 "Nachrichtenelemente" of the FinTS 3.0 specification
 */
export abstract class Segment<T> implements Serializable<Segment<T>> {
    abstract head: SegmentHead;

    abstract deserialize(str: string): Segment<T>
    deserializeArray(str: string): any[] {
        return [];
    }
    abstract serialize(): string

    /**
     * Serializes an array of DataElements or DataElementGroups
     * For more information see volume [Formals] Section H 1.2 "Nachrichtenaufbau" of the FinTS 3.0 specification
     * @param dataElements
     */
    protected static serializeDataElementsOrDataElementGroups(dataElements: (DataElement<unknown> | DataElementGroup<unknown>)[]): string {
        return dataElements.map(de => de.serialize()).join('+').replace(/\+$/, '')
    }

    /**
     * Deserializes an array of DataElements or DataElementGroups
     * For more information see volume [Formals] Section H 1.2 "Nachrichtenaufbau" of the FinTS 3.0 specification
     * @param str
     * @param types
     * @param fill
     */
    protected static deserializeDataElementsOrDataElementGroups(str: string,types: Constructable<DataElementGroup<unknown>|DataElement<unknown>>[], fill: Constructable<DataElementGroup<unknown>|DataElement<unknown>>): (DataElement<unknown> | DataElementGroup<unknown>)[] {
        const rawArray = str.split('+');
        // Fill types to match inputs length
        if(fill){
            const originalLength = types.length;
            types.length = rawArray.length;
            // @ts-ignore
            types = types.fill(fill,originalLength,rawArray.length)
        }

        // @ts-ignore
        return zip(rawArray, types).map(([str,clazz])=>{
            return Object.create(clazz.prototype).deserialize(str);
        });
    }
}
