import { Clipboard, closeMainWindow, LocalStorage, PopToRootType, showHUD, showToast, Toast } from "@raycast/api";
import { v4 as uuidv4 } from "uuid";

export default async function AddBookmark() {
  const { text } = await Clipboard.read();
  if (!text) {
    await showHUD("Text clipboard is empty");
  } else {
    try {
      await LocalStorage.setItem(uuidv4(), text);
      await showHUD("Added to bookmarks");
      await closeMainWindow({ popToRootType: PopToRootType.Suspended });
    } catch (e) {
      const error = e as Error;
      await showToast({
        style: Toast.Style.Failure,
        title: "Fail to save your bookmark",
        message: error.message,
      });
    }
  }
}
