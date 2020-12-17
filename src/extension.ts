'use strict';
import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {  //Función que activa el plugin y retorna el API esta se declara una sola vez
    let disposable = vscode.commands.registerCommand('gapline.execute', () => { // Se crea variable para que sea manejador de eventos en este caso el identificador es extension
        var editor = vscode.window.activeTextEditor; // Declaración de variable editor que carga el editor actual
        if (!editor) {  //Si no es el editor sale 
			return; 
		}
        var selection = editor.selection;  ///Propiedad que selecciona
		var text = editor.document.getText(selection); //Carga el texto seleccionado
        vscode.window.showInputBox({ prompt: 'Lineas?' }).then(value => { //Muestra mensaje de confirmacion de número de lineas
            let numberOfLines = +value; // Suma el número de lineas con el ingresado
            var textInChunks: Array<string> = [];  // Declara un arreglo de string
            text.split('\n').forEach((currentLine: string, lineIndex) => { // Recorre cada salto de línea 
                textInChunks.push(currentLine); // Registra líneas en cada posición del arreglo
                if ((lineIndex+1) % numberOfLines === 0) textInChunks.push('');  // Si es la línea indicada o múltiplo agrega una línea vacía al arreglo
            });
            text = textInChunks.join('\n'); // Concatena todo el texto con salto de línea en uno solo y reemplaza el contenido actual
            editor.edit((editBuilder) => { // Declaración del editor para comenzar la edición
                var range = new vscode.Range( // Declaración del rango
                    selection.start.line, 0,  // Línea inicial, caracter inicial, línea final, caracter final
                    selection.end.line,
                    editor.document.lineAt(selection.end.line).text.length
                );
                editBuilder.replace(range, text); //Reemplaza la selección con el texto nuevo con espacios
            });
        })
    });
    context.subscriptions.push(disposable); // Se suscribe el método realizado previamente al contexto para que este escuchando
}
export function deactivate() { } //Optimiza las tareas de limpieza cuando se cierra VSCode 
