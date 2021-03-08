import {Segment} from "./mod.ts";
import {SegmentHead, MessageRef} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric, Digit, Empty} from "../dataelements/mod.ts";
import {SecurityProfile} from "../dataelementsgroups/securityProfile.ts";
import {SecurityIdentification} from "../dataelementsgroups/securityIdentification.ts";
import {
    INITIAL_SECURITY_FUNCTION, SEC_REF_NO,
    SECBOUNDARY,
    SECREF,
    SECURITYPROFILE_ONE_STEP,
    SUPPLIER_ROLE
} from "../dataelements/constants.ts";
import {SecurityDate} from "../dataelementsgroups/securityDate.ts";

/**
 *
 * For more information see volume [HBCI] Section B.5.1 "Signaturkopf" of the FinTS 3.0 specification
 */
export class HNSHK extends Segment<HNSHK> {
    public head: SegmentHead;

    constructor(
        segNo: Numeric,
        public secProfile: SecurityProfile = SECURITYPROFILE_ONE_STEP,
        public secFunction: Numeric = INITIAL_SECURITY_FUNCTION,
        public blz: Alphanumeric,
        public accountName: Alphanumeric,
        public secRef: Alphanumeric = SECREF,
        public boundary: Numeric = SECBOUNDARY,
        public role: Numeric = SUPPLIER_ROLE,
        public securityIdentification: SecurityIdentification = new SecurityIdentification(),
        public secRefNo: Numeric = SEC_REF_NO,
        public secDate: SecurityDate = new SecurityDate(),
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HNSHK'), segNo, new Numeric(4))
    }

    deserialize(str: string): HNSHK {
        return this;
    }

    serialize(): string {
        // const dataElements = [this.head, this.messageLength, this.hbciVersion, this.dialogId, this.msgNo, this.msgRef ?? new Empty()];
        // return Segment.serializeDataElementsOrDataElementGroups(dataElements);
        return `HNSHK:${this.head.segNo.serialize()}:4+${this.secProfile.serialize()}+${this.secFunction.serialize()}+`+
            `${this.secRef.serialize()}+${this.boundary.serialize()}+${this.role.serialize()}+1::0+${this.secRefNo.serialize()}+`+
            `${this.secDate.serialize()}+1:999:1+6:10:16+280:${this.blz.serialize()}:${this.accountName.serialize()}:S:0:0`
    }
}
