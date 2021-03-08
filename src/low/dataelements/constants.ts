import {Numeric} from "./numeric.ts";
import {Alphanumeric} from "./alphanumeric.ts";
import {SecurityProfile} from "../dataelementsgroups/securityProfile.ts";

export const HBCI_VERSION = new Numeric(300);
export const COUNTRY_CODE = new Numeric(280);
export const SYSTEM_ID = new Alphanumeric('0');
/**
 * 0 For PIN/TAN, different for some chip cards
 */
export const SYSTEM_STATE = new Numeric(0);
export const INITIAL_BPD_VERSION = new Numeric(0);
export const INITIAL_UPD_VERSION = new Numeric(0);
export const INITIAL_DIALOG_ID = new Alphanumeric(`0`);
export const LANG = new Numeric(0);

export const MESSAGE_SENDER = new Numeric(1);
export const MESSAGE_RECEIVER = new Numeric(2);
export const SECURITYPROFILE_ONE_STEP = new SecurityProfile(new Alphanumeric("PIN"), new Numeric(1));
export const SECURITYPROFILE_TWO_STEP = new SecurityProfile(new Alphanumeric("PIN"), new Numeric(2));
export const INITIAL_SECURITY_FUNCTION = new Numeric(999);
export const SECURITY_FUNCTION_CLEAR_TEXT = new Numeric(998)
export const SECREF = new Alphanumeric('SECREF!!SECREF');
export const SECBOUNDARY = new Numeric(1);
export const SUPPLIER_ROLE = new Numeric(1);
export const SEC_REF_NO = new Numeric(1);
