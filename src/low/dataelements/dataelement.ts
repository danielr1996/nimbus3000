import {Serializable} from "../serializable.ts";
import {Constructable} from "../constructable.ts";

/**
 * Smallest syntactical unit of information
 * For more information see volume [Formals] Section B.2 "Nachrichtenelemente" of the FinTS 3.0 specification
 */
export abstract class DataElement<T> implements Serializable<T>{
    abstract deserialize(str: string): T
    abstract serialize(): string
    deserializeArray(str: string): any[] {
        return [];
    }
    /**
     * Escapes a string
     * For more information see volume [Formals] Section H 1.3 "Entwertung" of the FinTS 3.0 specification
     * @param str
     */
    protected static escape(str: string): string{
        return str
            .replace(/\?/g, "??")
            .replace(/\+/g, "?+")
            .replace(/:/g, "?:")
            .replace(/'/g, "?'")
            .replace(/@/g, "?@");
    }/**
     * Unescapes a string
     * For more information see volume [Formals] Section H 1.3 "Entwertung" of the FinTS 3.0 specification
     * @param str
     */
    protected static unescape(str: string): string{
        return str
            .replace(/\?\?/g, "?")
            .replace(/\++?/g, "+")
            .replace(/::/g, ":")
            .replace(/''/g, "'")
            .replace(/@@/g, "@");
    }
}
