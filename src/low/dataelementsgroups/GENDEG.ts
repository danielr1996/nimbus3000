/**
 * Generic.ts Segment
 */
import {DataElementGroup} from "./mod.ts";

export class GENDEG extends DataElementGroup<GENDEG> {
    constructor(
        public message: string,
    ) {
        super();
    }

    deserialize(str: string): GENDEG {
        return new GENDEG(str);
    }

    serialize(): string {
        throw new Error(`GENDEG cannot be serialized!`)
    }
}
