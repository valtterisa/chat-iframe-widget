export default function Page() {
  return (
    <div className="flex flex-col p-10 space-y-3">
      <h1>Choose chat type</h1>
      <a
        className="p-2 border rounded-md w-fit hover:bg-white hover:text-black transition-bg duration-500"
        href="/embed"
      >
        Iframe solution
      </a>
      <a
        className="p-2 border rounded-md w-fit hover:bg-white hover:text-black transition-bg duration-500"
        href="/widget-demo"
      >
        Widget solution
      </a>
    </div>
  );
}
