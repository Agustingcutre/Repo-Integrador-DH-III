export async function getData(){
    try{ 
   const resultado = await fetch("https://randomuser.me/api/?results=100")
   const json = await resultado.json()

      return json.results;
    } catch(e){
        console.log("error al cargar los datos");
    }
    }

  