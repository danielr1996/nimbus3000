import {Segment} from "./segment.ts";
import {SegmentHead} from "../dataelementsgroups/segmenthead.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";

const binary = (str: string)=> { return `@${str.length}@${str}`; }
/**
 *
 * For more information see volume [Formals] Section B.5.3 "Nachrichtenabschluss" of the FinTS 3.0 specification
 */
export class HNVSD extends Segment<HNVSD> {
    head: SegmentHead;

    constructor(
        segNo: Numeric,
        public segments: Segment<unknown>[],
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HNVSD'), segNo, new Numeric(1))
    }

    deserialize(str: string): HNVSD {
        return this;
    }

    serialize(): string {
        return `HNVSD:${this.head.segNo.serialize()}:1+${binary(this.segments.map(seg => seg.serialize()).join(`'`) + `'`)}`;
    }
}
