import {Segment} from "./mod.ts";
import {SegmentHead, MessageRef} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric, Digit, Empty} from "../dataelements/mod.ts";
import {SecurityProfile} from "../dataelementsgroups/securityProfile.ts";
import {SecurityIdentification} from "../dataelementsgroups/securityIdentification.ts";
import {
    INITIAL_SECURITY_FUNCTION, SEC_REF_NO,
    SECBOUNDARY,
    SECREF, SECURITY_FUNCTION_CLEAR_TEXT,
    SECURITYPROFILE_ONE_STEP,
    SUPPLIER_ROLE
} from "../dataelements/constants.ts";
import {SecurityDate} from "../dataelementsgroups/securityDate.ts";

/**
 *
 * For more information see volume [HBCI] Section B.5.1 "Signaturkopf" of the FinTS 3.0 specification
 */
export class HNVSK extends Segment<HNVSK> {
    public head: SegmentHead;

    constructor(
        segNo: Numeric,
        public blz: Alphanumeric,
        public accountName: Alphanumeric,
        public secProfile: SecurityProfile = SECURITYPROFILE_ONE_STEP,
        public secFunction: Numeric = SECURITY_FUNCTION_CLEAR_TEXT,
        public role: Numeric = SUPPLIER_ROLE,
        public securityIdentification: SecurityIdentification = new SecurityIdentification(),
        public secDate: SecurityDate = new SecurityDate(),
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HNVSK'), segNo, new Numeric(4))
    }

    deserialize(str: string): HNVSK {
        return this;
    }

    binary = (str: string)=> { return `@${str.length}@${str}`; }
    serialize(): string {
        // const dataElements = [this.head, this.messageLength, this.hbciVersion, this.dialogId, this.msgNo, this.msgRef ?? new Empty()];
        // return Segment.serializeDataElementsOrDataElementGroups(dataElements);
        return `HNVSK:${this.head.segNo.serialize()}:3+${this.secProfile.serialize()}+${this.secFunction.serialize()}+`+
            `${this.role.serialize()}`+
            `+1::0+`+
            `${this.secDate.serialize()}+2:2:13:${this.binary(`00000000`)}:5:1+280:${this.blz.serialize()}:${this.accountName.serialize()}:S:0:0+0`
    }
}
