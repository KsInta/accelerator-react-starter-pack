import {ReactNode} from 'react';

type ModalWrapperComponentProps = {
  children: ReactNode,
  className: string,
}

function ModalWrapperComponent({children, className}: ModalWrapperComponentProps): JSX.Element {
  return (
    <div style={{position: 'absolute'}}>
      <div className={`modal is-active modal-for-ui-kit ${className}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalWrapperComponent;
