/*Ejemplo DOM*/
const listItems = document.getElementsByTagName("li")

console.log("Documento: " + document.nodeType)
console.log("HTMLCollection: " + listItems.nodeType)

for (const listItem of listItems){
    console.log("ListElement: " + listItem.nodeType)
}