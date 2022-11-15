export function commaFire (input : number){
    if(!input) return input
    return (parseInt(JSON.stringify(input).replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
}