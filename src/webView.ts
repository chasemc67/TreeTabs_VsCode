import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Track current webview panel
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand("treetabs-vscode.start", () => {
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (currentPanel) {
        // If we already have a panel, show it in the target location
        currentPanel.reveal(columnToShowIn);
      } else {
        // Otherwise create a new panel
        currentPanel = vscode.window.createWebviewPanel(
          "treeTabs", // identifies the type of the webView. Used Internally
          "Tree Tabs", // Title of the panel displayed to the user
          // vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
          columnToShowIn || vscode.ViewColumn.One,
          {
            enableScripts: true,
            // localResourceRoots: [vscode.Uri.file(context.extensionPath)], // file system security
          }
        );
        currentPanel.webview.html = getWebviewContent();
        currentPanel.onDidDispose(
          () => {
            // clear anything that needs to be cleared if user closes webview
            currentPanel = undefined;
          },
          null,
          context.subscriptions
        );
      }
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
  </head>
  <body>
      <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
  </body>
  </html>`;
}
