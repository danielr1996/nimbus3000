import {Segment} from "./segment.ts";
import {SegmentHead} from "../dataelementsgroups/segmenthead.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";

/**
 *
 * For more information see volume [Formals] Section B.5.3 "Nachrichtenabschluss" of the FinTS 3.0 specification
 */
export class HKSYN extends Segment<HKSYN> {
    head: SegmentHead;

    constructor(
        segNo: Numeric
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HNHBS'), segNo, new Numeric(1))
    }

    deserialize(str: string): HKSYN {
        return this;
    }

    serialize(): string {
        return `HKSYN:${this.head.segNo.serialize()}:3+0`;
    }
}
