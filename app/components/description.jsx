export function description(description,regles)
{
    return(
        <div className="mt-5 mx-4 w-4/5 ">
            <h3 className="font-sans text-xl font-medium">Description</h3>
            <p className="m-2 bg-slate-400 bg-opacity-10 p-2 rounded-md" >
                {description}
            </p>

            <h3 className="font-sans text-xl font-medium">Règles</h3>
            <p className="m-2 bg-slate-400 bg-opacity-10 p-2 rounded-md" >
                {regles}
            </p>

        </div>
        
    );
}