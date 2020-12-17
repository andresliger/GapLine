'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('gapline.execute', () => {
        var editor = vscode.window.activeTextEditor; // Declaración de variable editor que carga el editor actual
        if (!editor) { //Si no es el editor sale 
            return;
        }
        var selection = editor.selection; ///Propiedad que selecciona
        var text = editor.document.getText(selection); //Carga el texto seleccionado
        vscode.window.showInputBox({ prompt: 'Lineas?' }).then(value => {
            let numberOfLines = +value; // Suma el número de lineas con el ingresado
            var textInChunks = []; // Declara un arreglo de string
            text.split('\n').forEach((currentLine, lineIndex) => {
                textInChunks.push(currentLine); // Registra líneas en cada posición del arreglo
                if ((lineIndex + 1) % numberOfLines === 0)
                    textInChunks.push(''); // Si es la línea indicada o múltiplo agrega una línea vacía al arreglo
            });
            text = textInChunks.join('\n'); // Concatena todo el texto con salto de línea en uno solo y reemplaza el contenido actual
            editor.edit((editBuilder) => {
                var range = new vscode.Range(// Declaración del rango
                selection.start.line, 0, // Línea inicial, caracter inicial, línea final, caracter final
                selection.end.line, editor.document.lineAt(selection.end.line).text.length);
                editBuilder.replace(range, text); //Reemplaza la selección con el texto nuevo con espacios
            });
        });
    });
    context.subscriptions.push(disposable); // Se suscribe el método realizado previamente al contexto para que este escuchando
}
exports.activate = activate;
function deactivate() { } //Optimiza las tareas de limpieza cuando se cierra VSCode 
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map