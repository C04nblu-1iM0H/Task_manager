import AbstractComponent from "./AbstractComponent";

const CreateBoardTemplate = () => {
  return (
    `<section class="board container">
     <div class="board__tasks"></div>
    </section>`
  );
};
export default class Board extends AbstractComponent{
    getTemplate(){
        return CreateBoardTemplate();
    }
}