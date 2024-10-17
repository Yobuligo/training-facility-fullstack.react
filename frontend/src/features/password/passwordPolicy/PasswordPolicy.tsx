import { useState } from 'react';
import { IPasswordPolicyProps } from './IPasswordPolicyProps';
import styles from './PasswordPolicy.module.scss';

interface IPasswordRequirement{
    text: string
    isFulfilled: boolean
}

const usePasswordPolicyBuilder = ()=>{
    const [minNumberCharacters, setNumberCharacters] = useState<number | undefined>(undefined)

    const setMinNumberCharacters = (minNumberCharacters: number)=>{}

    const setNeedsUppercaseLetter = () => {}

    const setNeedsLowercaseLetter = () => {}

    const setNeedsSpecialLetter = () => {}

    const build = ()=>{}

}

export const PasswordPolicy: React.FC<IPasswordPolicyProps>=(props)=>{
return <div className={styles.passwordPolicy}></div>}

