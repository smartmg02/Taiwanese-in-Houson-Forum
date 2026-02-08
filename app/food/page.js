import { listPlaces } from "../../lib/data";

export default function FoodPage() {
  const places = listPlaces("food");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">美食推薦</h1>
        <p className="text-sm text-slate-600">示範清單，歡迎之後擴充。</p>
      </div>
      {places.length === 0 ? (
        <div className="card text-sm text-slate-500">目前沒有美食資料。</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {places.map((place) => (
            <div key={place.id} className="card space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">{place.name}</h2>
              <p className="text-sm text-slate-600">{place.subcategory}</p>
              <p className="text-sm text-slate-500">{place.address}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {(JSON.parse(place.tags_json || "[]") || []).map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
              {place.notes && <p className="text-sm text-slate-600">{place.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
