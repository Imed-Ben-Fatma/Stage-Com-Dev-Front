export default function Status({status}) {
    return (
      <div>
        {(status === 'accepter'||  status === 'active' )? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span> {(status === 'accepter')?("Accepter"):("Active")}
          </span>
        ) : status === 'en cours de traitement' ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-600"></span> En cours de traitement
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span> {(status === 'blocked')?("Blocked"):("Refuser ")}
          </span>
        )}
      </div>
    );
  }