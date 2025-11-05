export default function RecentSearch({recentHistory, setRecentHistory, setSelectedHistory}) {

    const clearHistory = () => {
        localStorage.removeItem("history");
        setRecentHistory([]);
      };
  return (
    <div className="col-span-1 dark:bg-zinc-800 bg-pink-200 dark:text-white text-black">
      <div className="flex gap-2 m-3 justify-center">
        <span className="font-bold">Recent History</span>
        <button onClick={clearHistory} className="dark:bg-[url(./assets/deleteSymbol.png)] bg-[url(./assets/lightdeleteSymbol.png)] size-[30px] cursor-pointer hover:brightness-50"></button>
      </div>
      <div>
        <ul>
          {recentHistory &&
            recentHistory.map((historyItem, idx) => (
              <li onClick={() => setSelectedHistory(historyItem)} key={idx + Math.random()} className="text-left truncate p-1 mx-1 cursor-pointer hover:bg-zinc-700 ">
                {historyItem}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
