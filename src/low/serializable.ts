/**
 * For more information see volume [Formals] Section H "Syntax" of the FinTS 3.0 specification
 */
export interface Serializable<T>{
    serialize():string
    deserialize(str: string): T
    deserializeArray(str: string): any[]
}
