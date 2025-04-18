import { FC, ReactElement, SyntheticEvent } from "react";
import styles from './overlay.module.css';

type OverlayProps = {
    closeHandler: () => void;
    children: ReactElement;
}

const Overlay: FC<OverlayProps> = ({closeHandler, children}) => {
    const onClickHandler = (e: SyntheticEvent<Element, Event>) => {
        e.stopPropagation();
        closeHandler();
    }

    return (
        <div className={styles.overlay} onClick={onClickHandler}>
            {children}
        </div>
    )
}

export default Overlay;