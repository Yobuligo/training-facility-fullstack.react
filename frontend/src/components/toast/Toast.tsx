import { Button } from '../button/Button';
import { IToastProps } from './IToastProps';
import styles from './Toast.module.scss';

export const Toast: React.FC<IToastProps>=(props)=>{
return <div className={styles.toast}>
    <Button>Close ME</Button>
</div>}