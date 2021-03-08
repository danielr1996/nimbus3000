import {Segment} from "./mod.ts";
import {SegmentHead} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric} from "../dataelements/mod.ts";
/**
 * Generic.ts Segment
 */
export class GENSEG extends Segment<GENSEG> {
    public head = new SegmentHead(new Alphanumeric('GENSEG'), new Numeric(-1), new Numeric(-1));

    constructor(
        public message: string,
    ) {
        super();
    }

    deserialize(str: string): Segment<GENSEG> {
        return new GENSEG(str);
    }

    serialize(): string {
        throw new Error(`GENSEG cannot be serialized!`)
    }
}
