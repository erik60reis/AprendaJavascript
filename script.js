// Inicializa o editor CodeMirror com tema e autocompletar
var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,
    mode: "javascript",
    theme: "material",
    extraKeys: {"Ctrl-Space": "autocomplete"}
});

function captureConsole(logFunction) {
    return function(message) {
        const output = document.getElementById('output');
        output.textContent += message + '\n';
        logFunction.apply(console, arguments);
    };
}

console.log = captureConsole(console.log);
console.error = captureConsole(console.error);

function executeCode() {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Limpa o output antes de executar o novo código

    try {
        const result = eval(editor.getValue());
        if (result !== undefined) {
            console.log(result);
        }
    } catch (error) {
        console.error('Erro: ' + error.message);
    }
}