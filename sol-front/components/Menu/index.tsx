import React, { CSSProperties, FC, useCallback } from "react";
import { CloseModalButton, CreateMenu } from "@components/Menu/style";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  closeButton? :boolean;
}
const Menu: FC<Props> = ({children, style, show, onCloseModal, closeButton}) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation()
  },[]);

  if (!show) return null

  return (
    <CreateMenu onClick={onCloseModal}>
      {/*  CreateMenu 부모에 닫는거 */}
      <div style={style} onClick={stopPropagation}>
        {/*  stopPropagationg하면 부모로부터  이벤트 버블링이 안됨*/}
        { closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton> }
        메뉴
      </div>
      {children}
    </CreateMenu>
  );
};
Menu.defaultProps = {
  closeButton: true,
};

export default Menu