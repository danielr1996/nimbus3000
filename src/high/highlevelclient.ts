import {Client, ClientOptions} from "../low/client.ts";
import {Message} from "../low/message.ts";
import {HNHBK} from "../low/segments/HNHBK.ts";
import {Numeric} from "../low/dataelements/numeric.ts";
import {Digit} from "../low/dataelements/digit.ts";
import {
    COUNTRY_CODE,
    HBCI_VERSION,
    INITIAL_BPD_VERSION,
    INITIAL_DIALOG_ID,
    INITIAL_UPD_VERSION, LANG, SECURITYPROFILE_ONE_STEP, SECURITYPROFILE_TWO_STEP
} from "../low/dataelements/constants.ts";
import {HKIDN} from "../low/segments/HKIDN.ts";
import {KIK} from "../low/dataelementsgroups/KIK.ts";
import {Alphanumeric} from "../low/dataelements/alphanumeric.ts";
import {HKVVB} from "../low/segments/HKVVB.ts";
import {HNHBS} from "../low/segments/HNHBS.ts";
import {HNSHA} from "../low/segments/HNSHA.ts";
import {HNVSK} from "../low/segments/HNVSK.ts";
import {HNSHK} from "../low/segments/HNSHK.ts";
import {HKSYN} from "../low/segments/HKSYN.ts";
import {HNVSD} from "../low/segments/HNVSD.ts";
import {HKTAN} from "../low/segments/HKTAN.ts";
import {HKSPA} from "../low/segments/HKSPA.ts";
import {HKSAL} from "../low/segments/HKSAL.ts";
export class HighLevelClient{
   client: Client;
    constructor(public args: {accountName: string, blz: string, productId: string, pin: string, subAccountName: string, fintsUrl: string}) {
        const clientOptions: ClientOptions = {
            debug:{
                send:{
                    message: false,
                    serialized: true,
                    encoded: false,
                },
                recv:{
                    encoded: false,
                    serialized: false,
                    message: false,
                }
            }
        }

        this.client = new Client(this.args.fintsUrl, clientOptions)
    }

    async getBpd(){
        const res =  await this.client.send(new Message([
            new HNHBK(new Numeric(1), new Digit(-1), HBCI_VERSION, INITIAL_DIALOG_ID, new Numeric(1)),
            new HKIDN(new Numeric(3), new KIK(COUNTRY_CODE,new Alphanumeric(this.args.blz)),new Alphanumeric('9999999999')),
            new HKVVB(new Numeric(4),INITIAL_BPD_VERSION,INITIAL_UPD_VERSION,LANG,new Alphanumeric(this.args.productId), new Alphanumeric(`0.0.1`)),
            new HNHBS(new Numeric(7), new Numeric(1)),
        ]))

        const HIPINS = res.filter(([[type]])=>type === 'HIPINS')[0];
        // @ts-ignore
        const [,,,,[,,,,,...msg]] = HIPINS;
        const pinTanAllowedMessages = [];
        for(let i = 0; i < msg.length; i+=2){
            pinTanAllowedMessages.push([msg[i],msg[i+1]])
        }
        // console.log(res)
        return {HIPINS: pinTanAllowedMessages}
    }

    async sync(){
        const sync = new Message([
            new HNHBK(new Numeric(1), new Digit(-1), HBCI_VERSION, INITIAL_DIALOG_ID, new Numeric(1)),
            new HNVSK(new Numeric(998), new Alphanumeric(this.args.blz), new Alphanumeric(this.args.accountName)),
            new HNVSD(new Numeric(999), [
                new HNSHK(new Numeric(2), SECURITYPROFILE_ONE_STEP, new Numeric(999), new Alphanumeric(this.args.blz), new Alphanumeric(this.args.accountName)),
                new HKIDN(new Numeric(3), new KIK(COUNTRY_CODE,new Alphanumeric(this.args.blz)),new Alphanumeric(this.args.accountName)),
                new HKVVB(new Numeric(4),INITIAL_BPD_VERSION,INITIAL_UPD_VERSION,LANG,new Alphanumeric(this.args.productId), new Alphanumeric(`0.0.1`)),
                new HKSYN(new Numeric(5)),
                new HNSHA(new Numeric(6),this.args.pin),
            ]),
            new HNHBS(new Numeric(7), new Numeric(1)),
        ])
        // return sync.serialize()
        return await this.client.send(sync)
    }
    async init(){
        const init = new Message([
            new HNHBK(new Numeric(1), new Digit(-1), HBCI_VERSION, INITIAL_DIALOG_ID, new Numeric(1)),
            new HNVSK(new Numeric(998), new Alphanumeric(this.args.blz), new Alphanumeric(this.args.accountName)),
            new HNVSD(new Numeric(999), [
                new HNSHK(new Numeric(2), SECURITYPROFILE_TWO_STEP, new Numeric(921), new Alphanumeric(this.args.blz), new Alphanumeric(this.args.accountName)),
                new HKIDN(new Numeric(3), new KIK(COUNTRY_CODE,new Alphanumeric(this.args.blz)),new Alphanumeric(this.args.accountName)),
                new HKVVB(new Numeric(4),INITIAL_BPD_VERSION,INITIAL_UPD_VERSION,LANG,new Alphanumeric(this.args.productId), new Alphanumeric(`0.0.1`)),
                new HKTAN(new Numeric(5)),
                new HNSHA(new Numeric(6),this.args.pin),
            ]),
            new HNHBS(new Numeric(7), new Numeric(1)),
        ])
        // return init.serialize()

        // @ts-ignore
        const [[, , , [dialogId]]] = await this.client.send(init);
        return dialogId;
    }
    async accounts(dialogId: Alphanumeric, msgNo: Numeric){
        const accounts = new Message([
            new HNHBK(new Numeric(1), new Digit(-1), HBCI_VERSION, dialogId, msgNo),
            new HNVSK(new Numeric(998), new Alphanumeric(this.args.blz), new Alphanumeric(this.args.accountName)),
            new HNVSD(new Numeric(999), [
                new HNSHK(new Numeric(2), SECURITYPROFILE_TWO_STEP, new Numeric(921), new Alphanumeric(this.args.blz), new Alphanumeric(this.args.accountName)),
                new HKSPA(new Numeric(3)),
                new HNSHA(new Numeric(4),this.args.pin),
            ]),
            new HNHBS(new Numeric(5), new Numeric(1)),
        ])
        // return accounts.serialize()
        return await this.client.send(accounts)
    }
    async balance(dialogId: Alphanumeric, msgNo: Numeric){
        const accounts = new Message([
            new HNHBK(new Numeric(1), new Digit(-1), HBCI_VERSION, dialogId, msgNo),
            new HNVSK(new Numeric(998), new Alphanumeric(this.args.blz), new Alphanumeric(this.args.accountName)),
            new HNVSD(new Numeric(999), [
                new HNSHK(new Numeric(2), SECURITYPROFILE_TWO_STEP, new Numeric(921), new Alphanumeric(this.args.blz), new Alphanumeric(this.args.accountName)),
                new HKSAL(new Numeric(3), new Alphanumeric(this.args.blz), new Alphanumeric(this.args.subAccountName)),
                new HNSHA(new Numeric(4),this.args.pin),
            ]),
            new HNHBS(new Numeric(5), new Numeric(1)),
        ])
        // return accounts.serialize()
        return await this.client.send(accounts)
    }
}
