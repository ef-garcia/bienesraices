
// Una forma para no depender de una dependencia externa
const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32);


export {
    generarId
}