import {Segment} from "./mod.ts";
import {SegmentHead, MessageRef, DataElementGroup, Response, KIK} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric, Digit, Empty, DataElement} from "../dataelements/mod.ts";
import {GENDEG} from "../dataelementsgroups/GENDEG.ts";

/**
 *
 * For more information see volume [Formals] Section D.2 "Bankparameter allgemein" of the FinTS 3.0 specification
 */
export class HIBPA extends Segment<HIBPA> {
    public head: SegmentHead;

    constructor(
        segNo: Numeric,
        public bpdVersion: Numeric,
        public kik: KIK,
        public instituteName: Alphanumeric,
        public noSegmentTypes: Numeric,
        public lang: Numeric,
        public hbciVersion: Numeric,
        segRef?: Numeric,
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HIBPA'), segNo, new Numeric(3),segRef)
    }

    deserialize(str: string): Segment<HIBPA> {
        // @ts-ignore
        const [{segNo, segRef}, bpdVersion,kik, instituteName, noSogmentTypes, lang, hbciVersion] = Segment.deserializeDataElementsOrDataElementGroups(str, [SegmentHead, Numeric,KIK,Alphanumeric, Numeric, Numeric, Numeric]);
        // @ts-ignore
        return new HIBPA(segNo,bpdVersion,kik, instituteName, noSogmentTypes, lang, hbciVersion,segRef);
    }

    serialize(): string {
        throw new Error(`HIBPA cannot be serialized!`)
    }
}
