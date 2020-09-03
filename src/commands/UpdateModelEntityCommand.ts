import Command from "./Command";

export default abstract class UpdateModelEntityCommand implements Command {
    action: string = "Update";

}