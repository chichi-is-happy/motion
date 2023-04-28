import { postList } from "../store/content";
import { DragPropsType } from "../types/contentsType";

export const handleDrag = ({ posts, dispatch }: DragPropsType) => {
  // onDragStart : 드래그 이벤트를 처리하는 함수
  // 이벤트 객체의 dataTransfer 프로퍼티에 id를 text/plain 형태로 저장
  // 이렇게 하면 드래그된 아이템을 드랍할 때 id를 전달할 수 있다
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    dragId: string
  ) => {
    event.dataTransfer.setData("text/plain", dragId);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // onDrop : 드롭 이벤트를 처리하는 함수
  // 드롭 대상 요소에서 호출됨. onDrop 이벤트 핸들러를 등록하면 해당 요소 위에 드래그된 아이템이 등록될 때 이 함수가 호출된다
  // 매개변수로 이벤트 객체와 index를 받는다
  // index : 드롭 대상 요소에서 해당 아이템이 드롭된 위치의 인덱스를 나타냄
  // index를 이용해 드롭된 아이템을 원하는 위치에 삽입 가능
  // event.dataTransfer.getData("text/plain"): 드래그 이벤트가 발생했을 때 설정한 데이터를 가져옴
  // state의 items에서 id와, 드래그 이벤트에서 설정한 데이터의 id가 같은 것을 찾아서
  // item배열에서 item의 id와 일치하지 않는 것을 찾아 newItems를 만든 뒤
  // index 위치에 0개 요소를 삭제하고 item 요소를 추가
  // setItems 함수를 호출, items 배열을 newItems로 업데이트
  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    dropIndex?: number
  ) => {
    event.preventDefault();
    if (dropIndex === undefined) {
      return;
    }
    const dropId = Number(event.dataTransfer.getData("text/plain"));
    const item = posts.find((it) => it.id === dropId);
    if (item) {
      const newItems = posts.filter((it) => it.id !== dropId);
      newItems.splice(dropIndex, 0, item);
      dispatch(postList(newItems));
    }
  };

  return {
    onDragStart,
    onDragOver,
    onDrop,
  };
};
