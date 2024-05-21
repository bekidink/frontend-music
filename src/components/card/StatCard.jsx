 const StatCard = ({  name, count }) => {
    return (
      <div className=" flex flex-col items-center p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400">
        
        <p className="text-xl text-white font-semibold">{name}</p>
        <p className="text-xl text-white">{count}</p>
      </div>
    );
  };
  export default StatCard